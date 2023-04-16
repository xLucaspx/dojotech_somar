import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";

const tokenJwt = buscaCookie("tokenJwt");
const usuarioServices = new UsuarioServices();

if (tokenJwt) {
  try {
    await usuarioServices.autenticaUsuario({ tokenJwt });
    alert("Você já possui um cadastro!");
    window.location.href = "index.html";
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    window.location.href = "login.html";
  }
}

const inputNome = document.getElementById("cadastro_usuario__nome");
const inputEmail = document.getElementById("cadastro_usuario__email");
const inputUsuario = document.getElementById("cadastro_usuario__usuario");
const inputTelefone = document.getElementById("cadastro_usuario__telefone");
const inputSenha = document.getElementById("cadastro_usuario__senha");
const inputCep = document.getElementById("cadastro_usuario__cep");
const inputLogradouro = document.getElementById("cadastro_usuario__logradouro");
const inputBairro = document.getElementById("cadastro_usuario__bairro");
const inputNumero = document.getElementById("cadastro_usuario__numero");
const inputComplemento = document.getElementById( "cadastro_usuario__complemento");
const inputCidade = document.getElementById("cadastro_usuario__cidade");
const inputUf = document.getElementById("cadastro_usuario__uf");

const form = document.querySelector(".cadastro_usuario__form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    usuario: inputUsuario.value,
    telefone: inputTelefone.value,
    senha: inputSenha.value,
    cep: inputCep.value,
    logradouro: inputLogradouro.value,
    bairro: inputBairro.value,
    numero: inputNumero.value,
    complemento: inputComplemento.value,
    cidade: inputCidade.value,
    uf: inputUf.value,
  };

  try {
    await usuarioServices.cadastra(usuario);

    alert("Usuário cadastrado com sucesso!");
    limpaInputs([
      inputNome,
      inputEmail,
      inputUsuario,
      inputTelefone,
      inputSenha,
      inputCep,
      inputLogradouro,
      inputBairro,
      inputNumero,
      inputComplemento,
      inputCidade,
      inputUf,
    ]);
    window.location.href = "login.html";
  } catch (error) {
    alert("Erro ao cadastrar usuário\n" + error.message);
  }
};
