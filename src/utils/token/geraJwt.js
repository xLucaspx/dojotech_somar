const jwt = require("jsonwebtoken");

function geraJwt(payload) {
  // Informações sensíveis como o segredo do token são armazenadas em variáveis de ambiente
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "6h" });
}

module.exports = geraJwt;
