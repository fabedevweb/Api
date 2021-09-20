const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
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
    .catch((error) => res.status(400).json({ error }));
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
//Si l'utilisateur aime la sauce ==> Like = 1 l'utilisateur aime la sauce
/*
  condition switch avec des cases 1, 0, -1 vu sur le mdn
  avec $inc pour incrémenter ou decrementer
  $push pour ajouter l'userId
  $pull pour le retirer
  */
exports.like = (req, res, next) => {
  //Si l'utilisateur aime la sauce ==> like = 1
  Sauce.findOne({ _id: req.params.id }).then((Sauce) => {
    switch (req.body.like) {
      case 1:
        Sauce.updateOne(
          { _id: req.params.id },
          { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
        )
          .then(() =>
            res.status(200).json({ message: "L'utilisateur aime la sauce !" })
          )
          .catch((error) => res.status(400).json({ error }));
    }
  });

  /*
  //Si l'utilisateur n'aime pas la sauce ==> Dislikes = -1
  if (req.body.like == -1) {
    sauce
      .then(() =>
        res.status(200).json({ message: "L'utilisateur n'aime pas la sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
  //Si l'utilisateur annule son like ou son dislike ==> Like = 0
  if (req.body.like == -1) {
    sauce
      .then(() =>
        res.status(200).json({ message: "L'utilisateur n'aime pas la sauce !" })
      )
      .catch((error) => res.status(400).json({ error }));
  }
  */
};
