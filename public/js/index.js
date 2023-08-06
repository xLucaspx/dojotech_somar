import { insertHeaderAndFooter } from "./utils/insertHeaderAndFooter.js";
import { buscaCookie, removeCookie } from "./utils/cookie.js";
import { UsuarioServices } from "./services/UsuarioServices.js";

(async () => {
  insertHeaderAndFooter();
  const tokenJwt = buscaCookie("tokenJwt");
  const btnLog = document.getElementById("btnLog");
  const navList = document.querySelector(".nav__list");

  if (tokenJwt) {
    try {
      const usuarioServices = new UsuarioServices();
      const { nome } = await usuarioServices.autenticaUsuario({ tokenJwt });

      const profileLink = document.createElement("li");
      profileLink.classList.add("nav__list__item");
      profileLink.innerHTML = `<a href="perfil.html" title="Suas informações" class="nav__link nav__link--profile">${nome.split(" ")[0]}</a>`;

      navList.appendChild(profileLink);

      btnLog.innerHTML = "Logout";
      btnLog.onclick = () => {
        removeCookie("tokenJwt");
        window.location.href = "index.html";
      };
    } catch (error) {
      alert(`Erro ao autenticar usuário:\n${error.message}`);
      removeCookie("tokenJwt");
      location.reload();
    }
  } else {
    btnLog.innerHTML = "Login";
    btnLog.onclick = () => (window.location.href = "login.html");
  }
})();
