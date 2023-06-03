const jwt = require("jsonwebtoken");

function verificaJwt(token) {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw error;
  }
}

module.exports = verificaJwt;
