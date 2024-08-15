function defineCookie(chave, valor) {
	document.cookie = `${chave}=${valor};path="/public/"`;
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

export { buscaCookie, defineCookie, removeCookie };
