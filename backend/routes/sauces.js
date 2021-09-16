const express = require("express");

const router = express.Router();

//J'importe mon model de sauces
const saucesCtrl = require("../controllers/sauces");
//Importer le middleware qui protègera mes routes
const auth = require("../middleware/auth");
//Importer le middleware multer
const multer = require("../middleware/multer-config");

/*Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre
dans la base de données en définissant correctement son imageUrl. Initialise les likes et dislikes de la sauce à
0 et les usersLiked et usersDisliked avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; lorsque
multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des données soumises avec le fichier. */
router.post("/", auth, multer, saucesCtrl.createSauces);

//Renvoie la sauce avec l’_id fourni
router.get("/:id", auth, saucesCtrl.getOneSauce);

//Renvoie un tableau de toutes les sauces de la base de données
router.get("/", auth, saucesCtrl.getAllSauces);

module.exports = router;
