import { OdsServices } from "../services/OdsServices.js";
import { ProjetoServices } from "../services/ProjetoServices.js";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie } from "../utils/cookie.js";
import { fileTypes } from "../utils/fileTypes.js";
import { limpaInputs } from "../utils/input.js";
import { renameFile } from "../utils/renameFile.js";
import { criaCheckboxOds, renderizaDados } from "../utils/renderizaDados.js";

const tokenJwt = buscaCookie("tokenJwt");
const projetoServices = new ProjetoServices();
const usuarioServices = new UsuarioServices();
const odsServices = new OdsServices();
let projeto;
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
  alert("Você precisa estar logado para acessar esta página!");
  window.location.href = "login.html";
}

const listaOds = document.querySelector(".form__lista_ods");
renderizaDados(listaOds, await odsServices.buscaDados(), criaCheckboxOds);

const btnVoltar = document.querySelector(".btnVoltar");
btnVoltar.onclick = cancelarAlterações;

const tituloForm = document.querySelector(".titulo");
const btnForm = document.getElementById("cadastro_projeto__btnCadastro");

const inputNome = document.getElementById("cadastro_projeto__nome");
const inputCausa = document.getElementById("cadastro_projeto__causa");
const inputObjetivo = document.getElementById("cadastro_projeto__objetivo");
const inputPublico = document.getElementById("cadastro_projeto__publico");
const inputCidade = document.getElementById("cadastro_projeto__cidade");
const inputParceiros = document.getElementById("cadastro_projeto__parceiros");
const inputResumo = document.getElementById("cadastro_projeto__resumo");

const idProjeto = new URL(window.location).searchParams.get("idProjeto");
if (idProjeto) {
  try {
    projeto = await projetoServices.buscaPorId(idProjeto);

    if (!projeto) throw new Error("Projeto não encontrado!");
    if (projeto.id_usuario !== idUsuario)
      throw new Error(
        `Você não tem permissão para acessar esta página! Apenas o usuário que cadastrou o projeto pode editar suas informações.`
      );

    document.title = `Editar projeto ${projeto.nome} | Programa Somar`;

    btnVoltar.title = `Voltar à página do projeto ${projeto.nome}`;

    tituloForm.innerHTML = "Editar projeto";
    btnForm.textContent = "Atualizar projeto";

    inputNome.value = projeto.nome;
    inputCausa.value = projeto.causa;
    inputObjetivo.value = projeto.objetivo;
    inputPublico.value = projeto.publico_alvo;
    inputCidade.value = projeto.cidade;
    inputParceiros.value = projeto.parceiros;
    inputResumo.value = projeto.resumo;

    // marcando as ODS do projeto:
    projeto.Ods.forEach(
      (ods) => (document.getElementById(`ods_${ods.id}`).checked = true)
    );

    for (let i = 0; i < projeto.Midia.length; i++) {
      const midia = projeto.Midia[i];
      const input = fileTypes.video.includes(midia.tipo)
        ? document.getElementById("cadastro_projeto__video--1")
        : document.getElementById(`cadastro_projeto__imagem--${i + 1}`);

      const itemMidia = await fetch(midia.url);
      const blobMidia = await itemMidia.blob();
      const dt = new DataTransfer();
      dt.items.add(
        new File([blobMidia], midia.nome, {
          type: blobMidia.type,
          lastModified: new Date(),
        })
      );
      input.files = dt.files;
      input.dispatchEvent(new Event("change"));
    }
  } catch (error) {
    alert(`Houve um erro ao acessar a página:\n${error.message}`);
    window.location.href = "projetos.html";
  }
}

const btnRemoverMidia = document.querySelectorAll(".btnRemoverMidia");

btnRemoverMidia.forEach((btn) =>
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector(".cadastro_projeto__midia");
    input.value = "";
    input.dispatchEvent(new Event("change"));
  })
);

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

    const { id } = !idProjeto
      ? await projetoServices.cadastra({ projeto, ods })
      : await projetoServices.atualiza({ projeto, ods }, idProjeto);

    let formData;

    for (let i = 0; i < listaInputMidia.length; i++) {
      const input = listaInputMidia[i];

      if (input.files.length === 0) continue;

      if (!formData) {
        formData = new FormData();
        formData.append("idProjeto", id);
      }

      let file = input.files[0];
      // pega a extensão do arquivo:
      const ext = file.name.split(".").pop();
      // renomeia o arquivo:
      file = renameFile(file, `midia_${i + 1}.${ext}`);

      formData.append(file.name, file);
    }

    if (formData) await projetoServices.cadastraMidias(id, formData);

    alert(
      !idProjeto
        ? "Projeto cadastrado com sucesso!"
        : "Projeto alterado com sucesso!"
    );

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

    setTimeout(() => {
      window.location.replace(
        !idProjeto ? "projetos.html" : `projeto.html?id=${idProjeto}`
      );
    }, 0);
  } catch (error) {
    let operacao = !idProjeto ? "cadastrar" : "atualizar";
    alert(`Erro ao ${operacao} projeto:\n${error.message}`);
  }
};

const btnCancelar = document.getElementById("cadastro_projeto__btnCancelar");
btnCancelar.onclick = cancelarAlterações;

function cancelarAlterações() {
  let url = "projetos.html";
  let msg = "Tem certeza que deseja retornar à página de projetos?";

  if (idProjeto) {
    url = `projeto.html?id=${idProjeto}`;
    msg = `Tem certeza que deseja retornar à página do projeto ${projeto.nome}?`;
  }

  if (confirm(msg + "\nTodas as alterações serão perdidas!"))
    window.location.replace(url);
}
