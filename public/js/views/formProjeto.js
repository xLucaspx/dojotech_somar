import {
	OdsController,
	ProjetoController,
	UsuarioController,
} from "../controller/index.js";
import { buscaCookie } from "../utils/cookie.js";
import { fileTypes } from "../utils/fileTypes.js";
import { limpaInputs } from "../utils/input.js";
import { escapeHtmlTags } from "../utils/regex.js";
import { renameFile } from "../utils/renameFile.js";
import { criaCheckboxOds, renderizaDados } from "../utils/renderizaDados.js";

const token = buscaCookie("tokenJwt");
const odsController = new OdsController();
const projetoController = new ProjetoController();
const usuarioController = new UsuarioController();
let projeto;
let idUsuario;

if (token) {
	try {
		const usuario = await usuarioController.autenticaUsuario(token);
		idUsuario = usuario.id;
	} catch (error) {
		alert(`Erro ao autenticar usuário:\n${error.message}`);
		removeCookie("tokenJwt");
		window.location.href = "login.html";
	}
} else {
	alert("Você precisa estar logado para acessar esta página!");
	window.location.href = "login.html";
}

const listaOds = document.querySelector(".form__lista_ods");
renderizaDados(listaOds, await odsController.buscaDados(), criaCheckboxOds);

const btnVoltar = document.querySelector(".btnVoltar");
btnVoltar.onclick = cancelarAlterações;

const tituloForm = document.querySelector(".titulo");
const btnForm = document.getElementById("cadastro_projeto__btnCadastro");

const inputNome = document.getElementById("cadastro_projeto__nome");
const inputCausa = document.getElementById("cadastro_projeto__causa");
const inputObjetivo = document.getElementById("cadastro_projeto__objetivo");
const inputPublico = document.getElementById("cadastro_projeto__publico");
const inputCidade = document.getElementById("cadastro_projeto__cidade");
const inputParceiros = document.getElementById("cadastro_projeto__parceiros");
const inputResumo = document.getElementById("cadastro_projeto__resumo");

const idProjeto = new URL(window.location).searchParams.get("idProjeto");
if (idProjeto) {
	try {
		projeto = await projetoController.buscaPorId(idProjeto);

		if (!projeto) throw new Error("Projeto não encontrado!");
		if (projeto.id_usuario !== idUsuario)
			throw new Error(
				`Você não tem permissão para acessar esta página! Apenas o usuário que cadastrou o projeto pode editar suas informações.`
			);

		document.title = `Editar projeto ${projeto.nome} | Programa Somar`;

		btnVoltar.title = `Voltar à página do projeto ${projeto.nome}`;

		tituloForm.innerHTML = "Editar projeto";
		btnForm.textContent = "Atualizar projeto";

		inputNome.value = projeto.nome;
		inputCausa.value = projeto.causa;
		inputObjetivo.value = projeto.objetivo;
		inputPublico.value = projeto.publico_alvo;
		inputCidade.value = projeto.cidade;
		inputParceiros.value = projeto.parceiros;
		inputResumo.value = projeto.resumo;

		// marcando as ODS do projeto:
		projeto.Ods.forEach(
			(ods) => (document.getElementById(`ods_${ods.id}`).checked = true)
		);

		for (let i = 0; i < projeto.Midia.length; i++) {
			const midia = projeto.Midia[i];
			const input = fileTypes.video.includes(midia.tipo)
				? document.getElementById("cadastro_projeto__video--1")
				: document.getElementById(`cadastro_projeto__imagem--${i + 1}`);

			const itemMidia = await fetch(midia.url);
			const blobMidia = await itemMidia.blob();
			const dt = new DataTransfer();
			dt.items.add(
				new File([blobMidia], midia.nome, {
					type: blobMidia.type,
					lastModified: new Date(),
				})
			);
			input.files = dt.files;
			input.dispatchEvent(new Event("change"));
		}
	} catch (error) {
		alert(`Houve um erro ao acessar a página:\n${error.message}`);
		window.location.href = "projetos.html";
	}
}

const btnRemoverMidia = document.querySelectorAll(".btnRemoverMidia");

btnRemoverMidia.forEach((btn) =>
	btn.addEventListener("click", () => {
		const input = btn.parentElement.querySelector(".cadastro_projeto__midia");
		input.value = "";
		input.dispatchEvent(new Event("change"));
	})
);

const listaInputMidia = document.querySelectorAll(".cadastro_projeto__midia");

const form = document.querySelector(".cadastro_projeto__form");

form.onsubmit = async (event) => {
	event.preventDefault();

	const projeto = {
		nome: escapeHtmlTags(inputNome.value),
		causa: escapeHtmlTags(inputCausa.value),
		objetivo: escapeHtmlTags(inputObjetivo.value),
		publico_alvo: escapeHtmlTags(inputPublico.value),
		cidade: escapeHtmlTags(inputCidade.value),
		parceiros: escapeHtmlTags(inputParceiros.value),
		resumo: escapeHtmlTags(inputResumo.value),
		id_usuario: idUsuario,
	};
	const inputOds = document.querySelectorAll("input[name=ods]:checked");
	const ods = Array.from(inputOds).map((input) => input.value);

	try {
		if (ods.length <= 0) {
			throw new Error("Você precisa selecionar pelo menos um ODS!");
		}

		const { id } = !idProjeto
			? await projetoController.cadastra({ projeto, ods }, token)
			: await projetoController.atualiza({ projeto, ods }, idProjeto, token);

		let formData;
		let i = 1;

		for (const input of listaInputMidia) {
			if (input.files.length === 0) continue;

			if (!formData) formData = new FormData();

			let file = input.files[0];
			// pega a extensão do arquivo:
			const ext = file.name.split(".").pop();
			// renomeia o arquivo:
			file = fileTypes.video.includes(file.type)
				? renameFile(file, `video.${ext}`)
				: renameFile(file, `midia_${i}.${ext}`);

			formData.append(file.name, file);
			i++;
		}

		if (formData) await projetoController.cadastraMidias(id, formData, token);

		alert(
			!idProjeto
				? "Projeto cadastrado com sucesso!"
				: "Projeto alterado com sucesso!"
		);

		limpaInputs(
			inputNome,
			inputCausa,
			inputObjetivo,
			inputPublico,
			inputCidade,
			inputParceiros,
			inputResumo,
			listaInputMidia
		);
		inputOds.forEach((input) => (input.checked = false));

		setTimeout(() => {
			window.location.replace(
				!idProjeto ? "projetos.html" : `projeto.html?id=${idProjeto}`
			);
		}, 0);
	} catch (error) {
		let operacao = !idProjeto ? "cadastrar" : "atualizar";
		alert(`Erro ao ${operacao} projeto:\n${error.message}`);
	}
};

const btnCancelar = document.getElementById("cadastro_projeto__btnCancelar");
btnCancelar.onclick = cancelarAlterações;

function cancelarAlterações() {
	let url = "projetos.html";
	let msg = "Tem certeza que deseja retornar à página de projetos?";

	if (idProjeto) {
		url = `projeto.html?id=${idProjeto}`;
		msg = `Tem certeza que deseja retornar à página do projeto ${projeto.nome}?`;
	}

	if (confirm(msg + "\nTodas as alterações serão perdidas!"))
		window.location.replace(url);
}
