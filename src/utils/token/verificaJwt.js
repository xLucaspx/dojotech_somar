const jwt = require("jsonwebtoken");

function verificaJwt(token) {
  if (!token) return false;

  try {
    token = token.replace(/bearer\s/gi, "");
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw error;
  }
}

module.exports = verificaJwt;
