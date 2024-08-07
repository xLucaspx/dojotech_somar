export function insertHeaderAndFooter() {
  const nav = `<nav class="nav__menu">
        <ul class="nav__list">
          <li class="nav__list__item">
            <a href="index.html#sobre" class="nav__link">Sobre</a>
          </li>
          <li class="nav__list__item">
            <a href="index.html#ods" class="nav__link">ODS</a>
          </li>
          <li class="nav__list__item">
            <a href="projetos.html" class="nav__link">Projetos</a>
          </li>
        </ul>
      </nav>`;

  const header = document.getElementById("dynamic_header");
  const footer = document.getElementById("dynamic_footer");

  header.innerHTML = `
    <a href="index.html" class="logo__link" title="Home | Programa Somar">
      <img src="../img/logos/logo_programa_somar.webp" alt width="260" height="60">
    </a>

    <div class="header__div">
      ${nav}

      <button type="button" id="btnLog" class="btnLog btn btnSecundario"></button>
    </div>
  `;

  footer.innerHTML = `
    <div class="footer__div">
      <img src="../img/logos/logo_fecomercio_branco.webp" alt class="footer__img"></a>
    
      <ul class="footer__social">
        <li><a href="https://www.linkedin.com/in/xlucaspx/" class="social__link social__link--linkedin"
            target="_blank" title="Lucas da Paz | LinkedIn"></a>
        </li>
        <li><a href="https://www.instagram.com/_xlucaspx/" class="social__link social__link--instagram" target="_blank"
            title="Lucas da Paz | Instagram"></a>
        </li>
        <li><a href="https://twitter.com/xLucaspx" class="social__link social__link--twitter" target="_blank"
            title="Lucas da Paz | Twitter"></a>
        </li>
      </ul>

      ${nav}
    </div>

    <p class="creditos">Devs da 222 &copy; 2023</p>
  `;
}
