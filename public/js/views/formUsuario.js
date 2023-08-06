import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie, removeCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";

const tokenJwt = buscaCookie("tokenJwt");
const usuarioServices = new UsuarioServices();
let idUsuario;

const btnVoltar = document.querySelector(".btnVoltar");
btnVoltar.onclick = cancelarAlteracoes;

const tituloForm = document.querySelector(".titulo");
const btnForm = document.getElementById("cadastro_usuario__btnCadastro");

const inputNome = document.getElementById("cadastro_usuario__nome");
const inputEmail = document.getElementById("cadastro_usuario__email");
const inputUsuario = document.getElementById("cadastro_usuario__usuario");
const inputTelefone = document.getElementById("cadastro_usuario__telefone");
const inputSenha = document.getElementById("cadastro_usuario__senha");
const inputCep = document.getElementById("cadastro_usuario__cep");
const inputLogradouro = document.getElementById("cadastro_usuario__logradouro");
const inputBairro = document.getElementById("cadastro_usuario__bairro");
const inputNumero = document.getElementById("cadastro_usuario__numero");
const inputComplemento = document.getElementById(
  "cadastro_usuario__complemento"
);
const inputCidade = document.getElementById("cadastro_usuario__cidade");
const inputUf = document.getElementById("cadastro_usuario__uf");

const form = document.querySelector(".cadastro_usuario__form");

if (tokenJwt) {
  try {
    const { id } = await usuarioServices.autenticaUsuario({ tokenJwt });
    idUsuario = id;
    const usuario = await usuarioServices.buscaPorId(id);

    document.title = "Editar informações de usuário | Programa Somar";
    tituloForm.innerHTML = "Editar suas informações";
    btnForm.textContent = "Atualizar informações";

    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputUsuario.value = usuario.usuario;
    inputTelefone.value = usuario.telefone;
    inputCep.value = usuario.cep;
    inputLogradouro.value = usuario.logradouro;
    inputBairro.value = usuario.bairro;
    inputNumero.value = usuario.numero;
    inputComplemento.value = usuario.complemento;
    inputCidade.value = usuario.cidade;
    inputUf.value = usuario.uf;

    inputSenha.required = false;
    const labelSenha = document.getElementById("label-senha");
    labelSenha.classList.remove("form__label--required");
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    window.location.href = "login.html";
  }
}

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
    !idUsuario
      ? await usuarioServices.cadastra(usuario)
      : await usuarioServices.atualiza(usuario, idUsuario);

    alert(
      !idUsuario
        ? "Usuário cadastrado com sucesso!"
        : "Informações atualizadas com sucesso!"
    );

    limpaInputs(
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
      inputUf
    );
    window.location.replace(!idUsuario ? "login.html" : "perfil.html");
  } catch (error) {
    let msg = !idUsuario
      ? "Erro ao cadastrar usuário"
      : "Erro ao atualizar informações";
    alert(`${msg}:\n` + error.message);
  }
};

const btnCancelar = document.getElementById("cadastro_usuario__btnCancelar");
btnCancelar.onclick = cancelarAlteracoes;

function cancelarAlteracoes() {
  let url = "login.html";
  let msg = "Tem certeza que deseja retornar à página de login?";

  if (idUsuario) {
    url = "perfil.html";
    msg = "Tem certeza que deseja retornar ao perfil?";
  }

  if (confirm(msg + "\nTodas as alterações serão perdidas!"))
    window.location.replace(url);
}
