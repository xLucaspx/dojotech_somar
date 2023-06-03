import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie, defineCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";

const tokenJwt = buscaCookie("tokenJwt");
const usuarioServices = new UsuarioServices();

if (tokenJwt) {
  try {
    await usuarioServices.autenticaUsuario({ tokenJwt });
    alert("Você já está logado!");
    window.location.href = "index.html";
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    location.reload();
  }
}

const inputUsuario = document.getElementById("login__usuario");
const inputSenha = document.getElementById("login__senha");

const form = document.querySelector(".login__form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const usuarioDigitado = inputUsuario.value;
  const senhaDigitada = inputSenha.value;

  try {
    const tokenJwt = await usuarioServices.logaUsuario({
      usuarioDigitado,
      senhaDigitada,
    });
    defineCookie("tokenJwt", tokenJwt);
    window.location.href = "index.html";
  } catch (error) {
    alert(`Erro ao fazer login:\n${error.message}`);
  } finally {
    limpaInputs(inputSenha);
  }
};
