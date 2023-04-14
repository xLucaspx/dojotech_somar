import { UsuarioServices } from "../services/UsuarioServices.js";
import { limpaInputs } from "../utils/input.js";

const usuarioServices = new UsuarioServices();

const inputUsuario = document.getElementById("login__usuario");
const inputSenha = document.getElementById("login__senha");

const btnLogin = document.getElementById("login__btnLogin");

btnLogin.onclick = async (event) => {
  event.preventDefault();

  const usuario = inputUsuario.value;
  const senhaDigitada = inputSenha.value;

  if (usuario.isEmpty())

  try {
    // descobrir se usuário digitou email ou username
    let res = usuario.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g)
      ? await usuarioServices.buscaPorEmail(usuario)
      : await usuarioServices.buscaPorUsuario(usuario);

    // necessário guardar token de sessão e desenvolver logout
    if (res.senha === senhaDigitada) {
      window.location.href = "index.html";
    } else {
      alert("Erro ao fazer login\nusuário ou senha incorretos!");
    }
  } catch (error) {
    alert("Erro ao fazer login\n" + error.message);
  } finally {
    limpaInputs([inputSenha]);
  }
};
