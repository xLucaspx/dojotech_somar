import { FILE_TYPES } from "./utils/fileTypes.js";
import { validaInput, validaInputMidias } from "./utils/input.js";

(() => {
	const listaInputs = document.querySelectorAll(".form__texto");

	listaInputs.forEach(
		(input) =>
			(input.onchange = async (evento) => await validaInput(evento.target))
	);

	const listaInputImagem = document.querySelectorAll(".input--imagem");
	const listaInputVideo = document.querySelectorAll(".input--video");

	if (listaInputImagem.length > 0)
		validaInputMidias(listaInputImagem, FILE_TYPES.image);

	if (listaInputVideo.length > 0)
		validaInputMidias(listaInputVideo, FILE_TYPES.video);
})();
