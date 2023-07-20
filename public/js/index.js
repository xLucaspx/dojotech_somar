import { insertHeaderAndFooter } from "./utils/insertHeaderAndFooter.js";
import { buscaCookie, removeCookie } from "./utils/cookie.js";
import { UsuarioServices } from "./services/UsuarioServices.js";

(async () => {
  insertHeaderAndFooter();
  const tokenJwt = buscaCookie("tokenJwt");
  const btnLog = document.getElementById("btnLog");

  if (tokenJwt) {
    try {
      const usuarioServices = new UsuarioServices();
      await usuarioServices.autenticaUsuario({ tokenJwt });

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
