const jwt = require("jsonwebtoken");
function geraJwt(payload) {
  // Informações sensíveis, como o segredo do token,
  // devem ser guardadas em variáveis de ambiente
  const segredo = "SEGREDOTOKENPARATESTE";
  const tokenJwt = jwt.sign(payload, segredo, { expiresIn: "1h" });

  return tokenJwt;
}

module.exports = geraJwt;
