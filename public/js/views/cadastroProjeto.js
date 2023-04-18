import { ProjetoServices } from "../services/ProjetoServices.js";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";

const tokenJwt = buscaCookie("tokenJwt");
const projetoServices = new ProjetoServices();
const usuarioServices = new UsuarioServices();
let idUsuario;

if (tokenJwt) {
  try {
    const usuario = await usuarioServices.autenticaUsuario({ tokenJwt });
    idUsuario = usuario.id;
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    window.location.href = "login.html";
  }
} else {
  alert("Você precisa estar logado para cadastrar um projeto!");
  window.location.href = "login.html";
}

const inputNome = document.getElementById("cadastro_projeto__nome");
const inputCausa = document.getElementById("cadastro_projeto__causa");
const inputObjetivo = document.getElementById("cadastro_projeto__objetivo");
const inputPublico = document.getElementById("cadastro_projeto__publico");
const inputCidade = document.getElementById("cadastro_projeto__cidade");
const inputParceiros = document.getElementById("cadastro_projeto__parceiros");
const inputResumo = document.getElementById("cadastro_projeto__resumo");

const form = document.querySelector(".cadastro_projeto__form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const inputOds = Array.from(
    document.querySelectorAll("input[name=ods]:checked")
  );
  const ods = inputOds.map((input) => input.value);

  try {
    if (ods.length <= 0) {
      throw new Error("Você precisa selecionar pelo menos um ODS!");
    }

    const projeto = {
      projeto: {
        nome: inputNome.value,
        causa: inputCausa.value,
        objetivo: inputObjetivo.value,
        publico_alvo: inputPublico.value,
        cidade: inputCidade.value,
        parceiros: inputParceiros.value,
        resumo: inputResumo.value,
        id_usuario: idUsuario,
      },
      ods: ods,
    };

    await projetoServices.cadastra(projeto);

    alert("Projeto cadastrado com sucesso!");
    limpaInputs([
      inputNome,
      inputCausa,
      inputObjetivo,
      inputPublico,
      inputCidade,
      inputParceiros,
      inputResumo,
    ]);
    inputOds.forEach((input) => (input.checked = false));
    window.location.href = "projetos.html"
  } catch (error) {
    alert(`Erro ao cadastrar projeto:\n${error.message}`);
  }
};
