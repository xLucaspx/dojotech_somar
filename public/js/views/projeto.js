import { BASE_URL } from "../baseUrl.js";
import { ProjetoController, UsuarioController } from "../controller/index.js";
import { buscaCookie } from "../utils/cookie.js";
import { fileTypes } from "../utils/fileTypes.js";
import {
	criaItemOds,
	criaItemParceiro,
	criaMiniaturaMidia,
	renderizaDados,
} from "../utils/renderizaDados.js";

const token = buscaCookie("tokenJwt");
const usuarioController = new UsuarioController();
const projetoController = new ProjetoController();

let projeto;
let idUsuario;

if (token) {
	try {
		const { sub } = await usuarioController.autenticaUsuario(token);
		idUsuario = sub;
	} catch (error) {
		alert(`Erro ao autenticar usuário:\n${error.message}`);
		removeCookie("tokenJwt");
	}
}

try {
	const idProjeto = new URL(window.location).searchParams.get("id");
	projeto = await projetoController.buscaPorId(idProjeto);

	if (!projeto) throw new Error("Projeto não encontrado!");
	document.title = `${projeto.name} | Programa Somar`;
} catch (error) {
	alert(`Houve um erro ao abrir a página do projeto:\n${error.message}`);
	window.location.href = "projetos.html";
}

if (idUsuario && idUsuario === projeto.userId) {
	const botoesProjeto = document.querySelector(".projeto__botoes_controle");

	botoesProjeto.innerHTML = `
    <a href="form_projeto.html?idProjeto=${projeto.id}" class="btnEditar btn btnPadrao btnNav" title="Editar projeto ${projeto.name}">Editar</a>
    <button type="button" class="btnExcluir btn btnNav" title="Excluir projeto ${projeto.name}">Excluir</button>
  `;

	const btnExcluir = document.querySelector(".btnExcluir");
	btnExcluir.addEventListener("click", async () => {
		try {
			const excluir = confirm(
				`Tem certeza que deseja excluir o projeto "${projeto.name}"?`
			);
			if (excluir) {
				await projetoController.deleta(projeto.id, token);
				window.location.replace("projetos.html");
			}
		} catch (error) {
			alert(`Não foi possível excluir o projeto:\n${error.message}`);
		}
	});
}

const midiaLink = document.querySelector(".display__midia__link");
const galeria = document.querySelector(".projeto__display__galeria");

if (projeto.medias.length > 0) {
	const midiaDestaque = projeto.medias[0];
	handleMidiaDestaque(
		fileTypes.image.includes(midiaDestaque.type) ? "IMG" : "VIDEO",
		BASE_URL + midiaDestaque.url
	);
	renderizaDados(galeria, projeto.medias, criaMiniaturaMidia);
}

const miniaturas = document.querySelectorAll(".galeria__item");
miniaturas.forEach((miniatura) => {
	miniatura.onclick = () => {
		const midia = miniatura.querySelector(".galeria__view");
		handleMidiaDestaque(midia.nodeName, midia.src);
	};
});

const titulo = document.getElementById("projeto__titulo");
const cidade = document.getElementById("projeto__cidade");
const causa = document.getElementById("projeto__causa");
const objetivo = document.getElementById("projeto__objetivo");
const resumo = document.getElementById("projeto__resumo");
const listaOds = document.getElementById("projeto__ods");
const listaParceiros = document.getElementById("projeto__parceiros");

titulo.innerHTML = projeto.name;
cidade.innerHTML = projeto.city;
causa.innerHTML = projeto.cause;
objetivo.innerHTML = projeto.goal;
resumo.innerHTML = projeto.summary;
renderizaDados(listaOds, projeto.sdg, criaItemOds);

if (projeto.partners) {
	const parceiros = projeto.partners.split(",");
	renderizaDados(listaParceiros, parceiros, criaItemParceiro);
} else {
	listaParceiros.innerHTML = `
  <li class="projeto__parceiros__item">Ainda não há parceiros para este projeto</li>
  `;
}

function handleMidiaDestaque(type, url) {
	let tag = `<img src="${url}" alt class="projeto__midia midia">`;

	if (type === "VIDEO")
		tag = `<video src="${url}" alt class="projeto__midia midia" controls></video>`;

	midiaLink.href = url;
	midiaLink.innerHTML = `${tag}<img src="../img/icons/lupa.webp" alt class="display__img__icon">`;
}
