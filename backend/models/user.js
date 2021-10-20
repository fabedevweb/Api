//****************Je veux stocker les données utilisateurs*********************
//J'importe mongoose qui simplifie les tâches de lecture et d'écriture avec ma base de données Mongodb
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Je crée un schéma pour définir les données que je souhaite stocker
const userSchema = mongoose.Schema({
  //unique est utilisé pour empêcher que deux utilisateurs ne partagent la même adresse mail
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});

module.exports = mongoose.model("User", userSchema);
