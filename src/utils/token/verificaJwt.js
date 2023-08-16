const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../errors");

function verificaJwt(token) {
  if (!token) return false;

  try {
    token = token.replace(/bearer\s?/gi, "");

    if (token.length === 0) return false;

    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new UnauthorizedError(`Token inválido:\n${error.message}`);
  }
}

module.exports = verificaJwt;
