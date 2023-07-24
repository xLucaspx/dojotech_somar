import { ProjetoServices } from "../services/ProjetoServices.js";
import { UsuarioServices } from "../services/UsuarioServices.js";
import { buscaCookie, removeCookie } from "../utils/cookie.js";
import { criaCardProjeto, renderizaDados } from "../utils/renderizaDados.js";

const tokenJwt = buscaCookie("tokenJwt");
const usuarioServices = new UsuarioServices();
const projetoServices = new ProjetoServices();
let idUsuario;

if (tokenJwt) {
  try {
    const usuario = await usuarioServices.autenticaUsuario({ tokenJwt });
    idUsuario = usuario.id;
  } catch (error) {
    alert(`Erro ao autenticar usuário:\n${error.message}`);
    removeCookie("tokenJwt");
    window.location.href = "login.html";
  }
} else {
  alert("Faça login para acessar as informações do usuário!");
  window.location.href = "login.html";
}

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
  const usuario = await usuarioServices.buscaPorId(idUsuario);
  const projetos = await projetoServices.buscaPorUsuario(idUsuario);

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
        for await (const projeto of projetos) {
          await projetoServices.deleta(projeto.id);
        }
        await usuarioServices.deleta(idUsuario);
        removeCookie("tokenJwt");
        window.location.replace("index.html");
      }
    } catch (error) {
      alert(`Ocorreu um erro ao tentar excluir a conta:\n${error.message}`);
    }
  });

  nome.innerHTML = usuario.nome;
  username.innerHTML = usuario.usuario;
  email.innerHTML = usuario.email;
  telefone.innerHTML = usuario.telefone;
  cep.innerHTML = usuario.cep;
  endereco.innerHTML = criaStringEndereco(
    usuario.logradouro,
    usuario.numero,
    usuario.complemento
  );
  bairro.innerHTML = usuario.bairro;
  cidade.innerHTML = `${usuario.cidade} - ${usuario.uf}`;

  if (projetos.length === 0)
    msgProjetos.innerHTML = "Você ainda não cadastrou nenhum projeto!";
  else {
    msgProjetos.innerHTML =
      projetos.length === 1
        ? "Você possui 1 projeto cadastrado!"
        : `Você possui ${projetos.length} projetos cadastrados!`;
    renderizaDados(listaProjetos, projetos, criaCardProjeto);
  }
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
