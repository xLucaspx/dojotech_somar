import { UsuarioController } from "../controller/index.js";
import { buscaCookie, removeCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";
import { escapeHtmlTags } from "../utils/regex.js";

const token = buscaCookie("tokenJwt");
const usuarioController = new UsuarioController();
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

if (token) {
  try {
    const { sub } = await usuarioController.autenticaUsuario(token);
    idUsuario = sub;
    const usuario = await usuarioController.buscaPorId(sub, token);

    document.title = "Editar informações de usuário | Programa Somar";
    tituloForm.innerHTML = "Editar suas informações";
    btnForm.textContent = "Atualizar informações";

    inputNome.value = usuario.name;
    inputEmail.value = usuario.email;
    inputUsuario.value = usuario.username;
    inputTelefone.value = usuario.phone.replace(/^(\d{2})(9?)(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    inputCep.value = usuario.address.postalCode.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    inputLogradouro.value = usuario.address.address;
    inputBairro.value = usuario.address.district;
    inputNumero.value = usuario.address.number;
    inputComplemento.value = usuario.address.complement;
    inputCidade.value = usuario.address.city;
    inputUf.value = usuario.address.state;

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
    name: escapeHtmlTags(inputNome.value),
    email: escapeHtmlTags(inputEmail.value),
    username: escapeHtmlTags(inputUsuario.value),
    phone: escapeHtmlTags(inputTelefone.value),
    postalCode: escapeHtmlTags(inputCep.value),
    address: escapeHtmlTags(inputLogradouro.value),
    district: escapeHtmlTags(inputBairro.value),
    number: escapeHtmlTags(inputNumero.value),
    complement: escapeHtmlTags(inputComplemento.value),
    city: escapeHtmlTags(inputCidade.value),
    state: escapeHtmlTags(inputUf.value),
  };

	if (idUsuario) {
		usuario.id = idUsuario;
	}

	if (inputSenha.value) {
		usuario.password = escapeHtmlTags(inputSenha.value);
	}

  try {
    !idUsuario
      ? await usuarioController.cadastra(usuario)
      : await usuarioController.atualiza(usuario, token);

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
