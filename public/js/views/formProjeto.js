import { BASE_URL } from "../baseUrl.js";
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
		const { sub } = await usuarioController.autenticaUsuario(token);
		idUsuario = sub;
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
		if (projeto.userId !== idUsuario)
			throw new Error(
				`Você não tem permissão para acessar esta página! Apenas o usuário que cadastrou o projeto pode editar suas informações.`
			);

		document.title = `Editar projeto ${projeto.name} | Ajuda RS`;

		btnVoltar.title = `Voltar à página do projeto ${projeto.name}`;

		tituloForm.innerHTML = "Editar projeto";
		btnForm.textContent = "Atualizar projeto";

		inputNome.value = projeto.name;
		inputCausa.value = projeto.cause;
		inputObjetivo.value = projeto.goal;
		inputPublico.value = projeto.target;
		inputCidade.value = projeto.city;
		inputParceiros.value = projeto.partners;
		inputResumo.value = projeto.summary;

		// marcando as ODS do projeto:
		projeto.sdg.forEach(
			(ods) => (document.getElementById(`ods_${ods.id}`).checked = true)
		);

		for (let i = 0; i < projeto.medias.length; i++) {
			const midia = projeto.medias[i];

			// pegando o input
			const input = fileTypes.video.includes(midia.type)
				? document.getElementById("cadastro_projeto__video--1")
				: document.getElementById(`cadastro_projeto__imagem--${i + 1}`);

			// atualizando midia info
			const info = input.parentElement.querySelector(
				".cadastro_projeto__midia-info"
			);
			info.innerHTML = midia.url.split("/").pop();

			// atualizando botão de remover mídia
			const btnRemoverMidia =
				input.parentElement.querySelector(".btnRemoverMidia");
			btnRemoverMidia.classList.remove("btnRemoverMidia--hidden");
			btnRemoverMidia.dataset.idMidia = midia.id;
		}
	} catch (error) {
		alert(`Houve um erro ao acessar a página:\n${error.message}`);
		window.location.href = "projetos.html";
	}
}

const btnRemoverMidia = document.querySelectorAll(".btnRemoverMidia");
btnRemoverMidia.forEach((btn) =>
	btn.addEventListener("click", async () => {
		const input = btn.parentElement.querySelector(".cadastro_projeto__midia");

		if (btn.dataset.idMidia) {
			const remove = confirm(
				"Tem certeza que deseja excluir esta mídia do seu projeto?\nNão é possível desfazer esta ação!"
			);

			if (!remove) return;

			await projetoController.removeMidia(
				idProjeto,
				btn.dataset.idMidia,
				token
			);
			btn.dataset.idMidia = "";
		} else {
			input.value = "";
		}

		// atualizando input
		input.dispatchEvent(new Event("change"));
	})
);

const listaInputMidia = document.querySelectorAll(".cadastro_projeto__midia");

const form = document.querySelector(".cadastro_projeto__form");

form.onsubmit = async (event) => {
	event.preventDefault();

	const projeto = {
		name: escapeHtmlTags(inputNome.value),
		cause: escapeHtmlTags(inputCausa.value),
		goal: escapeHtmlTags(inputObjetivo.value),
		target: escapeHtmlTags(inputPublico.value),
		city: escapeHtmlTags(inputCidade.value),
		partners: escapeHtmlTags(inputParceiros.value),
		summary: escapeHtmlTags(inputResumo.value),
		userId: idUsuario,
	};
	const inputOds = document.querySelectorAll("input[name=ods]:checked");
	const ods = Array.from(inputOds).map((input) => input.value);

	if (idProjeto) {
		projeto.id = idProjeto;
	}

	try {
		if (ods.length <= 0) {
			throw new Error("Você precisa selecionar pelo menos um ODS!");
		}

		let id;
		if (idProjeto) {
			await projetoController.atualiza({ project: projeto, sdg: ods }, token);
			id = idProjeto;
		} else {
			const res = await projetoController.cadastra(
				{ project: projeto, sdg: ods },
				token
			);
			id = res.id;
		}

		let formData;
		let i = 1;

		for (const input of listaInputMidia) {
			if (input.files.length === 0) continue;

			if (!formData) formData = new FormData();

			// renomeia e retorna o arquivo:
			const file = renameFile(input.files[0]);

			formData.append(file.name, file);
			i++;
		}

		try {
			if (formData) await projetoController.cadastraMidias(id, formData, token);
		} catch (error) {
			alert(error.message);
		}

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

	if (confirm(msg + "\nAs alterações podem ser perdidas!"))
		window.location.replace(url);
}
