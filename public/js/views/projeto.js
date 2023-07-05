import { ProjetoServices } from "../services/ProjetoServices.js";
import {
  criaItemOds,
  criaItemParceiro,
  criaMiniaturaImagem,
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

const imgLink = document.querySelector(".display__img__link");
const img = document.querySelector(".projeto__img");
const galeria = document.querySelector(".projeto__display__galeria");

const temMidia = projeto.Midia.length > 0;
if (temMidia) {
  const url = projeto.Midia[0].url;
  imgLink.href = url;
  img.src = url;
  renderizaDados(galeria, projeto.Midia, criaMiniaturaImagem);
}

const miniaturas = document.querySelectorAll(".galeria__item");
miniaturas.forEach((miniatura) => {
  miniatura.onclick = () => {
    const urlImagemMiniatura = miniatura.querySelector(".galeria__img").src;
    img.src = urlImagemMiniatura;
    imgLink.href = urlImagemMiniatura;
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
