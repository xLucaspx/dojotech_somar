function defineCookie(chave, valor) {
	console.log(`${chave}=${valor};path=/public/views`);
  document.cookie = `${chave}=${valor}`;
}

function buscaCookie(chave) {
  return document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith(`${chave}=`))
    ?.split("=")[1];
}

function removeCookie(chave) {
  document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
}

export { defineCookie, buscaCookie, removeCookie };
