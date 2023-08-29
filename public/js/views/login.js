import { UsuarioController } from "../controller/index.js";
import { buscaCookie, defineCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";

const token = buscaCookie("tokenJwt");
const usuarioController = new UsuarioController();

if (token) {
  try {
    await usuarioController.autenticaUsuario(token);
    alert("Você já está logado!");
    window.location.href = "perfil.html";
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

  const usuario = inputUsuario.value;
  const senha = inputSenha.value;

  try {
    const tokenJwt = await usuarioController.logaUsuario({
      usuario,
      senha,
    });
    defineCookie("tokenJwt", tokenJwt);
    window.location.href = "index.html";
  } catch (error) {
    alert(`Erro ao fazer login:\n${error.message}`);
  } finally {
    limpaInputs(inputSenha);
  }
};
