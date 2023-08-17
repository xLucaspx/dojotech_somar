import { OdsController, ProjetoController } from "../controller/index.js";
import {
  criaBtnOds,
  criaCardProjeto,
  renderizaDados,
} from "../utils/renderizaDados.js";

const odsController = new OdsController();
const projetoController = new ProjetoController();

const listaOds = document.querySelector(".projetos__lista_ods");
const listaProjetos = document.querySelector(".busca__lista");
const buscaMsg = document.querySelector(".busca__msg");

try {
  const ods = await odsController.buscaDados();
  const projetos = await projetoController.buscaDados();

  renderizaDados(listaOds, ods, criaBtnOds);
  renderizaDados(listaProjetos, projetos, criaCardProjeto);
  buscaMsg.innerHTML = handleMsgBusca(projetos.length);
} catch (error) {
  alert(`Erro ao carregar página:\n${error.message}`);
}

const btnOds = document.querySelectorAll(".lista_ods__btn");
btnOds.forEach((btn) =>
  btn.addEventListener("click", async () => {
    window.location.href = "#busca";
    selectFiltro.value = "ods";
    inputBusca.value = btn.dataset.info;
    inputBusca.dispatchEvent(new Event("search"));
  })
);

const inputBusca = document.getElementById("busca__input");
const selectFiltro = document.getElementById("busca__filtro");
const filtros = {
  ods: "ODS",
  nome: "Nome",
  cidade: "Cidade",
  causa: "Causa de atuação",
  publico_alvo: "Público-alvo",
};

inputBusca.addEventListener("search", async (event) => {
  event.preventDefault();

  try {
    const projetos = await projetoController.buscaPorFiltro(
      selectFiltro.value,
      inputBusca.value
    );

    if (projetos.length > 0)
      renderizaDados(listaProjetos, projetos, criaCardProjeto);
    else listaProjetos.innerHTML = "";

    buscaMsg.innerHTML = handleMsgBusca(projetos.length, {
      input: inputBusca.value,
      filtro: filtros[selectFiltro.value],
    });
  } catch (error) {
    alert(`Erro ao buscar projetos:\n${error.message}`);
  }
});

inputBusca.onchange = (event) => {
  event.preventDefault();
  inputBusca.dispatchEvent(new Event("search"));
};

inputBusca.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    inputBusca.dispatchEvent(new Event("search"));
  }
});

selectFiltro.onchange = (event) => {
  event.preventDefault();
  inputBusca.dispatchEvent(new Event("search"));
};

function handleMsgBusca(qtdProjetos, query = {}) {
  const hasProjects = qtdProjetos > 0;
  const hasQuery = query.input !== undefined && query.input.trim() !== "";

  const msg = {
    "false, false": `Ainda não há projetos cadastrados!`,
    "true, false": `Exibindo todos os ${qtdProjetos} projetos!`,
    "false, true": `Nenhum projeto encontrado para a busca "${query.input}" com o filtro ${query.filtro}.`,
    "true, true": `${qtdProjetos} projetos encontrados para a busca "${query.input}" com o filtro ${query.filtro}.`,
  };

  return msg[`${hasProjects}, ${hasQuery}`];
}
