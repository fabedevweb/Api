const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
// Créer un objet de configuration pour multer
//J'utilise la fonction diskStorage pour dire que j'enregistre sur le disk
const storage = multer.diskStorage({
  //destination dit à multer ou enregistrer le fichier, ici dans le fichier "images"
  destination: (req, file, callback) => {
    //"images" correspond au dossier "images" que j'ai crée dans le dossier backend
    callback(null, "images");
  },
  //filename explique à multer quel nom de fichier utiliser pour éviter d'avoir un bug si deux fichiers ont le même nom
  filename: (req, file, callback) => {
    //Je génère ici le nouveau nom pour le fichier
    //Avec name, je crée son nom, ce qui correspond à la partie avant l'extension
    const name = file.originalname.split(" ").join("_");
    //J'accède à son extension , sa MIME_TYPES envoyée par le frontend
    const extension = MIME_TYPES[file.mimetype];
    //Je crée le filename entier avec un timestamp pour que le fichier soit unique
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
