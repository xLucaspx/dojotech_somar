const { randomBytes, scryptSync } = require("crypto");

function criaHashComSal(senha) {
  const sal = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, sal, 64).toString("hex");
  return `${sal}:${hash}`;
}

module.exports = criaHashComSal;
