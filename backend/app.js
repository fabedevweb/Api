//Fichier qui contient l'application
//Importer Express pour l'utiliser ici. J'initialise Express aux lignes 3 et 5
const express = require("express");
const bodyParser = require("body-parser");
//J'importe mogoose, package qui facilite les interactions avec ma base de données MongoDB grâce à des fonctions extrêmement utiles.
const mongoose = require("mongoose");
const path = require("path");
const saucesRoutes = require("./routes/sauces");
//J'importe le router connection utilisateur
const userRoutes = require("./routes/user");

/*
app.post("/api/auth", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé !",
  });
});
*/
//Je me connecte ensuite à MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://fabe-972:3KPEYFdC5Gucm2x@cluster0.rdzat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !!!!!!"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

/*Capture et enregistre l'image, analyse la sauce transformée en chaîne de caractères et l'enregistre
dans la base de données en définissant correctement son imageUrl. Initialise les likes et dislikes de la sauce à
0 et les usersLiked et usersDisliked avec des tableaux vides. Remarquez que le corps de la demande initiale est vide ; lorsque
multer est ajouté, il renvoie une chaîne pour le corps de la demande en fonction des données soumises avec le fichier. 
app.post("/api/sauces", (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauces({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Renvoie la sauce avec l’_id fourni
app.get("/api/sauces/:id", (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
});

//Renvoie un tableau de toutes les sauces de la base de données
app.get("/api/sauces", (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
});
*/

//Enregistrement de la route attendu par le frontend au moment de l'authentification
//Middleware //
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

//J'exporte ensuite l'application pour y avoir accès depuis les autres fichier
module.exports = app;
