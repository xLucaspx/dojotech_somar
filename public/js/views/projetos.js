import { OdsServices } from "../services/OdsServices.js";
import { ProjetoServices } from "../services/ProjetoServices.js";
import {
  criaBtnOds,
  criaCardProjeto,
  renderizaDados,
} from "../utils/renderizaDados.js";

const odsServices = new OdsServices();
const projetoServices = new ProjetoServices();

const listaOds = document.querySelector(".projetos__lista_ods");
const listaProjetos = document.querySelector(".busca__lista");
const buscaMsg = document.querySelector(".busca__msg");

try {
  const ods = await odsServices.buscaDados();
  const projetos = await projetoServices.buscaDados();

  renderizaDados(listaOds, ods, criaBtnOds);
  renderizaDados(listaProjetos, projetos, criaCardProjeto);
  buscaMsg.innerHTML = `Exibindo todos os ${projetos.length} projetos`;
} catch (error) {
  alert(`Erro ao carregar página:\n${error.message}`);
}

const btnOds = document.querySelectorAll(".lista_ods__btn");
const inputBusca = document.getElementById("busca__input");
const selectFiltro = document.getElementById("busca__filtro");
const filtros = {
  ods: "ODS",
  nome: "Nome",
  cidade: "Cidade",
  causa: "Causa de atuação",
  publico_alvo: "Público-alvo",
};

btnOds.forEach((btn) =>
  btn.addEventListener("click", async () => {
    window.location.href = "#busca";
    selectFiltro.value = "ods";
    inputBusca.value = btn.dataset.info;
    inputBusca.dispatchEvent(new Event("search"));
  })
);

inputBusca.addEventListener("search", async (event) => {
  event.preventDefault();
  const queryMsg = `para a busca "${inputBusca.value}" com o filtro ${
    filtros[selectFiltro.value]
  }.`;

  try {
    const projetos = await projetoServices.filtraProjetos({
      [selectFiltro.value]: inputBusca.value,
    });

    if (projetos.length > 0) {
      renderizaDados(listaProjetos, projetos, criaCardProjeto);

      if (!inputBusca.value) {
        buscaMsg.innerHTML = `Exibindo todos os ${projetos.length} projetos`;
      } else {
        buscaMsg.innerHTML = `${projetos.length} projetos encontrados ${queryMsg}`;
      }
    } else {
      listaProjetos.innerHTML = "";
      buscaMsg.innerHTML = `Nenhum projeto encontrado ${queryMsg}`;
    }
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
