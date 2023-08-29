const { randomBytes, scryptSync } = require("crypto");
const { BadRequestError } = require("../../errors");

function criaHashComSalt(senha) {
  try {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(senha, salt, 64).toString("hex");
    return `${salt}:${hash}`;
  } catch (error) {
    throw new BadRequestError("A senha não foi preenchida corretamente!");
  }
}

module.exports = criaHashComSalt;
