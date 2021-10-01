const express = require("express");
//Appel la méthode Router de Express
const router = express.Router();

//J'importe mon model de sauces
const sauceCtrl = require("../controllers/sauce");
//Importer le middleware qui protègera mes routes
const auth = require("../middleware/auth");
//Importer le middleware multer
const multer = require("../middleware/multer-config");

//Renvoie la sauce créée
router.post("/", auth, multer, sauceCtrl.createSauce);

//Renvoie la sauce avec l’_id de la personne qui l'a créé
router.get("/:id", auth, sauceCtrl.getOneSauce);

//Renvoie un tableau de toutes les sauces de la base de données
router.get("/", auth, sauceCtrl.getAllSauces);

//Renvoie un tableau avec la sauce modifiée
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

//Renvoie un tableau sans la sauce qui vient d'être supprimée
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//Renvoie like, dislike ou annule
router.post("/:id/like", auth, sauceCtrl.like);

module.exports = router;
