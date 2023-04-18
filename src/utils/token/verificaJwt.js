const jwt = require("jsonwebtoken");

function verificaJwt(token) {
  const segredo = "SEGREDOTOKENPARATESTE";
  try {
    return jwt.verify(token, segredo);
  } catch (error) {
    throw error;
  }
}

module.exports = verificaJwt;
