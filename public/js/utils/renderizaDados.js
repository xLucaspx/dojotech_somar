import { BASE_URL } from "../baseUrl.js";
import { FILE_TYPES } from "./fileTypes.js";

function renderizaDados(elemento, dados, funcao) {
	elemento.innerHTML = "";
	dados.forEach((dado) => elemento.appendChild(funcao(dado)));
}

function criaBtnOds(dados) {
	const li = document.createElement("li");
	const info = `${dados.id} - ${dados.name}`;
	const imageUrl = BASE_URL + dados.imageUrl;

	const conteudo = `
		<button type="button" class="lista_ods__btn" data-info="${info}">
		<img src="${imageUrl}" alt="${info}" class="lista_ods__img midia">
		</button>
	`;

	li.innerHTML = conteudo;
	return li;
}

function criaCardProjeto(dados) {
	const li = document.createElement("li");
	const coverImageUrl = BASE_URL + dados.coverImageUrl;

	const conteudo = `
		<a href="./projeto.html?id=${dados.id}" title="Abrir página do projeto ${dados.name}" class="projeto__link">
			<img src="${coverImageUrl}" alt class="projeto__miniatura">

			<h2 class="projeto__nome subtitulo">${dados.name}</h2>
			<p class="projeto__atributo projeto__cidade">${dados.city}</p>

			<div class="projeto__div">
				<h3 class="projeto__atributo">Causa</h3>
				<p class="projeto__texto">${dados.cause}</p>
			</div>

			<div class="projeto__div">
				<h3 class="projeto__atributo">Público-alvo</h3>
				<p class="projeto__texto">${dados.target}</p>
			</div>
			
			<p class="projeto__atributo">ODS ${dados.sdg.join(", ")}</p>
		</a>
	`;

	li.classList.add("busca__projeto");
	li.innerHTML = conteudo;
	return li;
}

function criaCheckboxOds(dados) {
	const li = document.createElement("li");
	const id = dados.id;

	const conteudo = `
		<input type="checkbox" name="ods" id="ods_${id}" value="${id}" class="form__input--checkbox">
		<label for="ods_${id}" class="form__label--checkbox">${id} - ${dados.name}</label>
	`;

	li.innerHTML = conteudo;
	return li;
}

function criaMiniaturaMidia(dados) {
	const li = document.createElement("li");
	let conteudo;
	const url = BASE_URL + dados.url;

	if (FILE_TYPES.video.includes(dados.type)) {
		conteudo = `
			<video class="galeria__view galeria__view--video" src="${url}" alt=""></video>
			<img src="../img/icons/play.webp" alt class="galeria__view__icon--video">
		`;
		li.title = "Expandir vídeo";
	} else {
		conteudo = `
			<img class="galeria__view" src="${url}" alt="">
			<img src="../img/icons/expand.webp" alt class="galeria__view__icon">
		`;
		li.title = "Expandir imagem";
	}

	li.classList.add("galeria__item");
	li.innerHTML = conteudo;
	return li;
}

function criaItemParceiro(parceiro) {
	const li = document.createElement("li");
	li.innerHTML = parceiro;
	li.classList.add("projeto__parceiros__item");
	return li;
}

function criaItemOds(ods) {
	const li = document.createElement("li");
	li.innerHTML = `<img src="${BASE_URL + ods.imageUrl}" alt="${ods.id} - ${
		ods.name
	}" class="projeto__ods__img midia">`;
	li.classList.add("projeto__ods__item");
	return li;
}

export {
	criaBtnOds,
	criaCardProjeto,
	criaCheckboxOds,
	criaItemOds,
	criaItemParceiro,
	criaMiniaturaMidia,
	renderizaDados,
};
