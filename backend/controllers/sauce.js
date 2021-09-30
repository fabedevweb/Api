const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    dislikes: 0,
    likes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) =>
      res.status(403).json({ message: "unauthorized request" })
    );
  console.log(req.body);
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.like = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((Sauce) => {
    if (req.body.like === 1 && !Sauce.usersLiked.includes(req.body.userId)) {
      Sauce.updateOne({
        $push: { usersLiked: req.body.userId },
        $inc: { likes: 1 },
      })
        .then(() =>
          res.status(200).json({ message: "L'utilisateur aime la sauce !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
    if (req.body.like === 0 && Sauce.usersLiked.includes(req.body.userId)) {
      Sauce.updateOne({
        $pull: { usersLiked: req.body.userId },
        $inc: { likes: -1 },
      })
        .then(() =>
          res.status(200).json({ message: "L'utilisateur annule son like !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
    if (
      req.body.like === -1 &&
      !Sauce.usersDisliked.includes(req.body.userId)
    ) {
      Sauce.updateOne({
        $push: { usersDisliked: req.body.userId },
        $inc: { dislikes: 1 },
      })
        .then(() =>
          res
            .status(200)
            .json({ message: "L'utilisateur n'aime pas la sauce !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
    if (req.body.like === 0 && Sauce.usersDisliked.includes(req.body.userId)) {
      Sauce.updateOne({
        $pull: { usersDisliked: req.body.userId },
        $inc: { dislikes: -1 },
      })
        .then(() =>
          res
            .status(200)
            .json({ message: "L'utilisateur annule son dislike !" })
        )
        .catch((error) => res.status(400).json({ error }));
    }
  });
};
/*
//Si l'utilisateur aime la sauce ==> Like = 1 l'utilisateur aime la sauce

  condition switch avec des cases 1, 0, -1 vu sur le mdn
  avec $inc pour incrémenter ou decrementer
  $push pour ajouter l'userId
  $pull pour le retirer
 
exports.like = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((Sauce) => {
      switch (req.body.like) {
        //Si l'utilisateur aime la sauce ==> like = 1
        case 1:
          if (!Sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({
              _id: req.params.id,
              $push: { usersLiked: req.body.userId },
              $inc: { likes: 1 },
            })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "L'utilisateur aime la sauce !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        //Si l'utilisateur annule son avis ==> like = 0
        case 0:
          if (Sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({
              _id: req.params.id,
              $pull: { usersLiked: req.body.userId },
              $inc: { likes: -1 },
            })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "L'utilisateur aime la sauce !" })
              )
              .catch((error) => res.status(400).json({ error }));
          } else if (Sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({
              _id: req.params.id,
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "L'utilisateur aime la sauce !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        //Si l'utilisateur n'aime pas la sauce ==> like = 1
        case -1:
          if (!Sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({
              _id: req.params.id,
              $push: { usersDisliked: req.body.userId },
              $inc: { dislikes: 1 },
            })
              .then(() =>
                res
                  .status(200)
                  .json({ message: "L'utilisateur n'aime pas la sauce !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        default:
          console.log("Unknown account type");
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
*/
