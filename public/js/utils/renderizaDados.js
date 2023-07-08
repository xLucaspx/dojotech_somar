import { fileTypes } from "./fileTypes.js";

function renderizaDados(elemento, dados, funcao) {
  elemento.innerHTML = "";
  dados.forEach((dado) => elemento.appendChild(funcao(dado)));
}

function criaBtnOds(dados) {
  const li = document.createElement("li");
  const info = `${dados.id} - ${dados.nome}`;

  const conteudo = `
    <button type="button" class="lista_ods__btn" data-info="${info}">
    <img src="${dados.url_imagem}" alt="${info}" class="lista_ods__img img">
    </button>
  `;

  li.innerHTML = conteudo;
  return li;
}

function criaCardProjeto(dados) {
  const li = document.createElement("li");

  let arrOds = dados.Ods.map((ods) => ods.id);

  const conteudo = `
    <a href="projeto.html?id=${dados.id}" class="projeto__link">
      <img src="${
        dados.Midia.length > 0
          ? dados.Midia[0].url
          : "../img/projetos/no-media.webp"
      }" alt="" class="projeto__img">

      <h2 class="projeto__nome subtitulo">${dados.nome}</h2>
      <p class="projeto__atributo projeto__cidade">${dados.cidade}</p>

      <div class="projeto__div">
        <h3 class="projeto__atributo">Causa</h3>
        <p class="projeto__texto">${dados.causa}</p>
      </div>

      <div class="projeto__div">
        <h3 class="projeto__atributo">Público-alvo</h3>
        <p class="projeto__texto">${dados.publico_alvo}</p>
      </div>
      
      <p class="projeto__atributo">ODS ${arrOds.join(", ")}</p>
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
    <label for="ods_${id}" class="form__label--checkbox">${id} - ${dados.nome}</label>
  `;

  li.innerHTML = conteudo;
  return li;
}

function criaMiniaturaMidia(dados) {
  const li = document.createElement("li");
  let conteudo;

  if (fileTypes.video.includes(dados.tipo)) {
    conteudo = `
      <video class="galeria__view" src="${dados.url}" alt=""></video>
      <img src="../img/icons/expand.webp" alt="Expandir vídeo" class="galeria__view__icon">
    `;
  } else {
    conteudo = `
      <img class="galeria__view" src="${dados.url}" alt="">
      <img src="../img/icons/expand.webp" alt="Expandir imagem" class="galeria__view__icon">
    `;
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
  li.innerHTML = `<img src="${ods.url_imagem}" alt="${ods.id} - ${ods.nome}" class="projeto__ods__img img">`;
  li.classList.add("projeto__ods__item");
  return li;
}

export {
  renderizaDados,
  criaBtnOds,
  criaCardProjeto,
  criaCheckboxOds,
  criaMiniaturaMidia,
  criaItemParceiro,
  criaItemOds,
};
