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

  const conteudo = `
    <a href="projeto.html?id=${dados.id}" class="projeto__link">
    <img src="${
      dados.Midia.length > 0
        ? dados.Midia[0].url
        : "../../outros/un_headquarters.jpg"
    }" alt="" class="projeto__img">
    <h3 class="projeto__titulo subtitulo">${dados.nome}</h3>
    <p class="projeto__cidade">${dados.cidade}</p>
    <p class="projeto__causa">${dados.causa}</p>
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

export { renderizaDados, criaBtnOds, criaCardProjeto, criaCheckboxOds };
