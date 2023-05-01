import { OdsServices } from "../services/OdsServices.js";
import { ProjetoServices } from "../services/ProjetoServices.js";
import {
  criaBtnOds,
  criaCardProjeto,
  renderizaDados,
} from "../utils/projetos.js";

const listaOds = document.querySelector(".projetos__lista_ods");
const listaProjetos = document.querySelector(".busca__lista");
const odsServices = new OdsServices();
const projetoServices = new ProjetoServices();

try {
  const ods = await odsServices.buscaDados();
  const projetos = await projetoServices.buscaDados();

  renderizaDados(listaOds, ods, criaBtnOds);
  renderizaDados(listaProjetos, projetos, criaCardProjeto);
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

inputBusca.addEventListener("search", async (event) => {
  event.preventDefault();
  try {
    const projetos = await projetoServices.filtraProjetos({
      [selectFiltro.value]: inputBusca.value,
    });
    renderizaDados(listaProjetos, projetos, criaCardProjeto);
  } catch (error) {
    alert(`Erro ao buscar projetos:\n${error.message}`);
  }
});
