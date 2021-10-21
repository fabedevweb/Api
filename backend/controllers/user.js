//*************************************Mes deux fonctions pour créer et connecter un utilisateur**************************************/
//J'importe le package de chiffrement bcrypt pour notre fonction signup
const bcrypt = require("bcrypt");
//J'importe mon package token
const jwt = require("jsonwebtoken");
//J'ai besoin de mon modèle utilisateur car je vais enregistrer et lire des utilisateurs ou users dans les deux middleware
const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/*
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user.save(function(err) {
        console.log(err);
      });
    })
    .catch((error) => res.status(500).json({ error }));
  //return res.status(401).json({ error: "Email déjà utilisé !" });
};
*/
exports.login = (req, res, next) => {
  //Méthode findOne pour trouver un seul utilisateur de la base de donnée
  User.findOne({ email: req.body.email }) //L'addresse mail doit correspondre à celle envoyée dans la requête
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        //Mongoose va chercher l'utilisateur, cependant il pourrait y avoir un problème de connection avec 500 pour erreur server
        .catch((error) => res.status(500).json({ error }));
    })
    //Mongoose va chercher l'utilisateur, cependant il pourrait y avoir un problème de connection avec 500 pour erreur server
    .catch((error) => res.status(500).json({ error }));
};
