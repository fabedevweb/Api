//Fichier qui contient l'application
//Importer Express pour l'utiliser ici. J'initialise Express aux lignes 3 et 5
const express = require("express");
const bodyParser = require("body-parser");
//J'importe mogoose, package qui facilite les interactions avec ma base de données MongoDB grâce à des fonctions extrêmement utiles.
const mongoose = require("mongoose");
const path = require("path");
const saucesRoutes = require("./routes/sauce");
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

//Enregistrement de la route attendu par le frontend au moment de l'authentification
//Middleware //

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

//J'exporte ensuite l'application pour y avoir accès depuis les autres fichier
module.exports = app;
