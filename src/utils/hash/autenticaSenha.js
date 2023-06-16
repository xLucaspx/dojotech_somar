const { scryptSync, timingSafeEqual } = require("crypto");

function autenticaSenha(senhaDigitada, salt, hashSenha) {
  const hashTeste = scryptSync(senhaDigitada, salt, 64);
  const hashReal = Buffer.from(hashSenha, "hex");

  return timingSafeEqual(hashTeste, hashReal);
}

module.exports = autenticaSenha;
