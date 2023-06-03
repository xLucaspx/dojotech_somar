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

const fileTypes = [
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];
const inputImagem = document.querySelectorAll(".cadastro_projeto__imagem");

inputImagem.forEach((input) => {
  input.onchange = () => {
    const file = input.files[0];
    const span = input.parentElement.querySelector(
      ".cadastro_projeto__midia-info"
    );
    const btnRemoverImagem =
      input.parentElement.querySelector(".btnRemoverImagem");

    if (file && fileTypes.includes(file.type)) {
      span.classList.remove("cadastro_projeto__midia-info--invalido");
      span.classList.add("cadastro_projeto__midia-info--valido");
      btnRemoverImagem.classList.remove("btnRemoverImagem--hidden");
      span.innerHTML = `${file.name}`;
    } else {
      span.classList.remove("cadastro_projeto__midia-info--valido");
      span.classList.add("cadastro_projeto__midia-info--invalido");
      btnRemoverImagem.classList.add("btnRemoverImagem--hidden");
      input.value = "";

      if (!file) span.innerHTML = "Nenhuma imagem selecionada!";
      else span.innerHTML = "O formato do arquivo selecionado não é válido!";
    }
  };
});

const btnRemoverImagem = document.querySelectorAll(".btnRemoverImagem");

btnRemoverImagem.forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector(".cadastro_projeto__imagem");
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

    let temMidia = false;
    for (const input of inputImagem) {
      if (temMidia) continue;
      if (input.value) temMidia = true;
    }

    if (temMidia) {
      const formData = new FormData();
      formData.append("idProjeto", id);

      inputImagem.forEach((input) => {
        for (const img of input.files) {
          formData.append(img.name, img);
        }
      });
      await projetoServices.cadastraMidias(id, formData);
    }

    limpaInputs(
      inputNome,
      inputCausa,
      inputObjetivo,
      inputPublico,
      inputCidade,
      inputParceiros,
      inputResumo,
      inputImagem
    );

    inputOds.forEach((input) => (input.checked = false));
    window.location.replace("projetos.html");
  } catch (error) {
    alert(`Erro ao cadastrar projeto:\n${error.message}`);
  }
};
