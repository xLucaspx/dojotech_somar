const { scryptSync, timingSafeEqual } = require("crypto");

function autenticaSenha(senhaDigitada, sal, hashSenha) {
  const hashTeste = scryptSync(senhaDigitada, sal, 64);
  const hashReal = Buffer.from(hashSenha, "hex");

  return timingSafeEqual(hashTeste, hashReal);
}

module.exports = autenticaSenha;
