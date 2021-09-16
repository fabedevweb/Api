//Pour créer un router j'ai besoin d'express
const express = require("express");
const router = express.Router();

//Controller pour associer les fonctions aux différentes routes
const userCtrl = require("../controllers/user");
//const auth = require("../middleware/auth");
//Construction des deux routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
//J'exporte le router pour l'importer dans app.js
module.exports = router;
