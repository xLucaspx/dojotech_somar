import { UsuarioController } from "./controller/index.js";
import { buscaCookie, removeCookie } from "./utils/cookie.js";
import { insertHeaderAndFooter } from "./utils/insertHeaderAndFooter.js";

(async () => {
	insertHeaderAndFooter();
	const token = buscaCookie("tokenJwt");
	const btnLog = document.getElementById("btnLog");
	const navList = document.querySelector(".nav__list");

	if (token) {
		try {
			const usuarioController = new UsuarioController();
			const { name } = await usuarioController.autenticaUsuario(token);

			const profileLink = document.createElement("li");
			profileLink.classList.add("nav__list__item");
			profileLink.innerHTML = `<a href="./perfil.html" title="Suas informações" class="nav__link nav__link--profile">${
				name.split(" ")[0]
			}</a>`;

			navList.appendChild(profileLink);

			btnLog.innerHTML = "Logout";
			btnLog.onclick = () => {
				removeCookie("tokenJwt");
				window.location.href = "/";	
			};
		} catch (error) {
			alert(`Erro ao autenticar usuário:\n${error.message}`);
			removeCookie("tokenJwt");
			location.reload();
		}
	} else {
		btnLog.innerHTML = "Login";
		btnLog.onclick = () => (window.location.href = "/login.html");
	}
})();
