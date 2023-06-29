const { randomBytes, scryptSync } = require("crypto");

function criaHashComSalt(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

module.exports = criaHashComSalt;
