import { OdsServices } from "../services/OdsServices.js";
import { ProjetoServices } from "../services/ProjetoServices.js";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie } from "../utils/cookie.js";
import { limpaInputs } from "../utils/input.js";
import { criaCheckboxOds, renderizaDados } from "../utils/renderizaDados.js";

const tokenJwt = buscaCookie("tokenJwt");
const projetoServices = new ProjetoServices();
const usuarioServices = new UsuarioServices();
const odsServices = new OdsServices();
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

const listaOds = document.querySelector(".form__lista_ods");
renderizaDados(listaOds, await odsServices.buscaDados(), criaCheckboxOds);

const btnRemoverMidia = document.querySelectorAll(".btnRemoverMidia");

btnRemoverMidia.forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector(".cadastro_projeto__midia");
    input.value = "";
    input.dispatchEvent(new Event("change"));
  })
);

const inputNome = document.getElementById("cadastro_projeto__nome");
const inputCausa = document.getElementById("cadastro_projeto__causa");
const inputObjetivo = document.getElementById("cadastro_projeto__objetivo");
const inputPublico = document.getElementById("cadastro_projeto__publico");
const inputCidade = document.getElementById("cadastro_projeto__cidade");
const inputParceiros = document.getElementById("cadastro_projeto__parceiros");
const inputResumo = document.getElementById("cadastro_projeto__resumo");
const listaInputMidia = document.querySelectorAll(".cadastro_projeto__midia");

const form = document.querySelector(".cadastro_projeto__form");

form.onsubmit = async (event) => {
  event.preventDefault();

  const projeto = {
    nome: inputNome.value,
    causa: inputCausa.value,
    objetivo: inputObjetivo.value,
    publico_alvo: inputPublico.value,
    cidade: inputCidade.value,
    parceiros: inputParceiros.value,
    resumo: inputResumo.value,
    id_usuario: idUsuario,
  };
  const inputOds = document.querySelectorAll("input[name=ods]:checked");
  const ods = Array.from(inputOds).map((input) => input.value);

  try {
    if (ods.length <= 0) {
      throw new Error("Você precisa selecionar pelo menos um ODS!");
    }

    const { id } = await projetoServices.cadastra({
      projeto,
      ods,
    });

    let formData;

    for (const input of listaInputMidia) {
      if (input.files.length === 0) continue;

      if (!formData) {
        formData = new FormData();
        formData.append("idProjeto", id);
      }

      formData.append(input.files[0].name, input.files[0]);
    }

    if (formData) await projetoServices.cadastraMidias(id, formData);

    limpaInputs(
      inputNome,
      inputCausa,
      inputObjetivo,
      inputPublico,
      inputCidade,
      inputParceiros,
      inputResumo,
      listaInputMidia
    );
    inputOds.forEach((input) => (input.checked = false));

    alert("Projeto cadastrado com sucesso!");

    setTimeout(() => {
      window.location.replace("projetos.html");
    }, 0);
  } catch (error) {
    alert(`Erro ao cadastrar projeto:\n${error.message}`);
  }
};
