//**************Créer un programme qui va attendre des requêtes http et qui va y répondre***************/
//Importer le package http de Node, j'y ai maintenant accès
const http = require("http");
//J'importe mon application ici
const app = require("./app");
//Je dis à mon application Express sur quel port elle va tourner
app.set("port", process.env.PORT || 3000);
//Je peux maintenant créer un serveur qui prend 2 paramètre, une requête et une réponse
const server = http.createServer(app);
//Ce serveur doit attendre les requêtes sur le port 3000 en développement, ou variable environnement s'il n'est pas disponible
server.listen(process.env.PORT || 3000);
