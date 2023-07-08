import { ProjetoServices } from "../services/ProjetoServices.js";
import {
  criaItemOds,
  criaItemParceiro,
  criaMiniaturaMidia,
  renderizaDados,
} from "../utils/renderizaDados.js";

let projeto;

try {
  const idProjeto = new URL(window.location).searchParams.get("id");
  const projetoServices = new ProjetoServices();
  projeto = await projetoServices.buscaPorId(idProjeto);

  document.title = `${projeto.nome} | Programa Somar`

  if (!projeto) throw new Error("Projeto não encntrado!");
} catch (error) {
  alert(`Houve um erro ao tenta abrir a página do projeto:\n${error.message}`);
  window.location.href = "projetos.html";
}

const midiaLink = document.querySelector(".display__midia__link");
const galeria = document.querySelector(".projeto__display__galeria");

const temMidia = projeto.Midia.length > 0;
if (temMidia) {
  const url = projeto.Midia[0].url;
  midiaLink.href = url;
  midiaLink.innerHTML = `
    <img src="${url}" alt class="projeto__img img">
    <img src="../img/icons/lupa.webp" alt class="display__img__icon">
  `;
  renderizaDados(galeria, projeto.Midia, criaMiniaturaMidia);
}

const miniaturas = document.querySelectorAll(".galeria__item");
miniaturas.forEach((miniatura) => {
  miniatura.onclick = () => {
    const midia = miniatura.querySelector(".galeria__view");
    const url = midia.src;
    midiaLink.href = url;

    let conteudo;

    if (midia.nodeName === "VIDEO") {
      conteudo = `
        <video src="${url}" alt class="projeto__img" controls></video>
        <img src="../img/icons/lupa.webp" alt class="display__img__icon">
      `;
    } else {
      conteudo = `
        <img src="${url}" alt class="projeto__img img">
        <img src="../img/icons/lupa.webp" alt class="display__img__icon">
      `;
    }

    midiaLink.innerHTML = conteudo;
  };
});

const titulo = document.getElementById("projeto__titulo");
const cidade = document.getElementById("projeto__cidade");
const causa = document.getElementById("projeto__causa");
const objetivo = document.getElementById("projeto__objetivo");
const resumo = document.getElementById("projeto__resumo");
const listaOds = document.getElementById("projeto__ods");
const listaParceiros = document.getElementById("projeto__parceiros");

titulo.innerHTML = projeto.nome;
cidade.innerHTML = projeto.cidade;
causa.innerHTML = projeto.causa;
objetivo.innerHTML = projeto.objetivo;
resumo.innerHTML = projeto.resumo;
renderizaDados(listaOds, projeto.Ods, criaItemOds);

if (projeto.parceiros) {
  const parceiros = projeto.parceiros.split(",");
  renderizaDados(listaParceiros, parceiros, criaItemParceiro);
} else {
  listaParceiros.innerHTML = `
  <li class="projeto__parceiros__item">Ainda não há parceiros para este projeto</li>
  `;
}
