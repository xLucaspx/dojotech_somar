import { ProjetoController, UsuarioController } from "../controller/index.js";
import { buscaCookie, removeCookie } from "../utils/cookie.js";
import { criaCardProjeto, renderizaDados } from "../utils/renderizaDados.js";

const token = buscaCookie("tokenJwt");
const usuarioController = new UsuarioController();
const projetoController = new ProjetoController();
let idUsuario;

if (token) {
  try {
		const { sub } = await usuarioController.autenticaUsuario(token);
		idUsuario = sub;
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    window.location.href = "login.html";
  }
} else {
  alert("Faça login para acessar as informações do usuário!");
  window.location.href = "login.html";
}

const btnRelatorio = document.getElementById("btn-relatorio");
btnRelatorio.onclick = async (event) => {
  event.preventDefault();
  try {
    await projetoController.geraRelatorio(token);
    const link = document.createElement("a");
    link.setAttribute("href", "../report/relatorio-projetos.txt");
    link.setAttribute("download", "relatorio-projetos.txt");
    link.click();
    link.remove();
  } catch (error) {
    alert(`Ocorreu um errro ao gerar o relatório:\n${error.message}`);
  }
};

const botoesUsuario = document.querySelector(".usuario__botoes_controle");

const nome = document.getElementById("usuario__nome");
const username = document.getElementById("usuario__username");
const email = document.getElementById("usuario__email");
const telefone = document.getElementById("usuario__telefone");
const cep = document.getElementById("usuario__cep");
const endereco = document.getElementById("usuario__endereco");
const bairro = document.getElementById("usuario__bairro");
const cidade = document.getElementById("usuario__cidade");

const listaProjetos = document.querySelector(".busca__lista");
const msgProjetos = document.querySelector(".busca__msg");

try {
  const usuario = await usuarioController.buscaPorId(idUsuario, token);
  const projetos = await usuarioController.buscaProjetos(idUsuario, token);

  botoesUsuario.innerHTML = `
    <a href="form_usuario.html" class="btnEditar btn btnPadrao btnNav" title="Editar suas informações">Editar</a>
    <button type="button" class="btnExcluir btn btnNav" title="Excluir sua conta">Excluir</button>
  `;

  const btnExcluir = document.querySelector(".btnExcluir");
  btnExcluir.addEventListener("click", async () => {
    try {
      const excluir = confirm(
        "Tem certeza que deseja excluir sua conta?\nTodos os seus projetos também serão excluídos!"
      );

      if (excluir) {
        await usuarioController.deleta(idUsuario, token);
        removeCookie("tokenJwt");
        window.location.replace("index.html");
      }
    } catch (error) {
      alert(`Ocorreu um erro ao tentar excluir a conta:\n${error.message}`);
    }
  });

  nome.innerHTML = usuario.name;
  username.innerHTML = usuario.username;
  email.innerHTML = usuario.email;
  telefone.innerHTML = usuario.phone.replace(/^(\d{2})(9?)(\d{4})(\d{4})$/, '($1) $2 $3-$4');
  cep.innerHTML = usuario.address.postalCode.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  endereco.innerHTML = criaStringEndereco(
    usuario.address.address,
    usuario.address.number,
    usuario.address.complement
  );
  bairro.innerHTML = usuario.address.district;
  cidade.innerHTML = `${usuario.address.city} - ${usuario.address.state}`;

  if (projetos.length === 0)
    msgProjetos.innerHTML = "Você ainda não possui projetos.";
  else {
    msgProjetos.innerHTML =
      projetos.length === 1
        ? "Você possui 1 projeto cadastrado."
        : `Você possui ${projetos.length} projetos cadastrados.`;
    renderizaDados(listaProjetos, projetos, criaCardProjeto);
  }

  msgProjetos.innerHTML += `
    <a href="form_projeto.html" class="link" title="Cadastre um projeto | Ajuda RS">
      <strong class="texto--destaque">Cadastre um projeto!</strong>
    </a>
  `;
} catch (error) {
  alert(`Erro ao buscar informações do usuário:\n${error.message}`);
  window.location.replace("index.html");
}

function criaStringEndereco(logradouro, numero, complemento) {
  let endereco = logradouro;

  if (numero && numero !== "") endereco += `, ${numero}`;
  if (complemento && complemento !== "") endereco += ` - ${complemento}`;

  return endereco;
}
