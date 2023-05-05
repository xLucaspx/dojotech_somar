import { ProjetoServices } from "../services/ProjetoServices.js";

const projetoServices = new ProjetoServices();

const idProjeto = new URL(window.location).searchParams.get("id");
const projeto = await projetoServices.buscaPorId(idProjeto);

const titulo = document.getElementById("projeto__titulo");
const cidade = document.getElementById("projeto__cidade");
const causa = document.getElementById("projeto__causa");
const objetivo = document.getElementById("projeto__objetivo");
const resumo = document.getElementById("projeto__resumo");
const listaParceiros = document.getElementById("projeto__parceiros");
const listaOds = document.getElementById("projeto__ods");

titulo.innerHTML = projeto.nome;
cidade.innerHTML = projeto.cidade;
causa.innerHTML = projeto.causa;
objetivo.innerHTML = projeto.objetivo;
resumo.innerHTML = projeto.resumo;

listaParceiros.innerHTML = "";
listaOds.innerHTML = "";

if (projeto.parceiros) {
  const parceiros = projeto.parceiros.split(",");

  parceiros.forEach((parceiro) => {
    const li = document.createElement("li");
    li.innerHTML = parceiro;
    li.classList.add("projeto__parceiros__item");
    listaParceiros.appendChild(li);
  });
} else {
  listaParceiros.innerHTML = `
  <li class="projeto__parceiros__item">Ainda não há parceiros para este projeto</li>
  `;
}

projeto.Ods.forEach((ods) => {
  const li = document.createElement("li");
  li.innerHTML = `<img src="${ods.url_imagem}" alt="${ods.id} - ${ods.nome}" class="projeto__ods__img img">`;
  li.classList.add("projeto__ods__item");
  listaOds.appendChild(li);
});
