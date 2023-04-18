export function insertHeaderAndFooter() {
  const logo = `<div class="logo">
      <a href="index.html" class="logo__link" title="Home | Programa Somar">
        <img src="../img/logos/logo_cores_ods.svg" alt width="50" height="50">
        <h1 class="logo__texto">Programa Somar</h1>
      </a>
    </div>`;
  const nav = `<nav class="nav__menu">
        <ul class="nav__list">
          <li class="nav__list__item">
            <a href="index.html#sobre" class="nav__link">Sobre</a>
          </li>
          <li class="nav__list__item">
            <a href="index.html#ods" class="nav__link">ODS</a>
          </li>
          <li class="nav__list__item">
            <a href="index.html#contato" class="nav__link">Contato</a>
          </li>
          <li class="nav__list__item">
            <a href="projetos.html" class="nav__link">Projetos</a>
          </li>
        </ul>
      </nav>`;

  const header = document.getElementById("dynamic_header");
  const footer = document.getElementById("dynamic_footer");

  header.innerHTML = `${logo}

    <div class="header__div">
      ${nav}

      <button type="button" id="btnLog" class="btnLog btn btnSecundario"></button>
    </div>`;

  footer.innerHTML = `${logo}
  
      ${nav}
  
      <ul class="footer__social">
        <li><a href="https://www.linkedin.com/school/senac-rs/" class="social__link social__link--linkedin"
            target="_blank" title="Senac RS | LinkedIn"></a></li>
        <li><a href="https://www.instagram.com/senactech/" class="social__link social__link--instagram" target="_blank"
            title="Senac Tech | Instagram"></a></li>
        <li><a href="https://twitter.com/senacrs" class="social__link social__link--twitter" target="_blank"
            title="Senac RS | Twitter"></a></li>
      </ul>

      <p class="creditos">Devs da 222 &copy; 2023</p>`;
}
