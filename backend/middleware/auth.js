const jwt = require("jsonwebtoken");
//Création du middleware qui protégera les routes
module.exports = (req, res, next) => {
  try {
    //Je récupère mon token dans le header renvoyé par le backend
    const token = req.headers.authorization.split(" ")[1];
    //Je décode mon token pour ensuite y extraire le userId
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    //J'extraie le userId
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
