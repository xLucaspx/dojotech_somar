import { buscaCep, preencheCamposCep } from "./cep.js";
import { mensagensErro, tiposErro } from "./errosInput.js";

function limpaInputs(...inputs) {
  inputs.forEach((input) => (input.value = ""));
}

async function validaInput(input) {
  const tipoInput = input.dataset.tipo;
  const mensagemErro = input.parentElement.querySelector(
    ".form__fieldset__msg"
  );

  if (tipoInput == "cep" && !input.validity.patternMismatch) {
    await validaInputCep(input);
  }

  if (!input.validity.valid) {
    input.classList.remove("form__texto--valido");
    input.classList.add("form__texto--invalido");
    mensagemErro.innerHTML = mostraErro(input, tipoInput);
    return false;
  }

  input.classList.remove("form__texto--invalido");
  input.classList.add("form__texto--valido");
  mensagemErro.innerHTML = "";
}

function validaInputMidias(listaInputs, fileTypes) {
  listaInputs.forEach((input) => {
    input.onchange = () => {
      const file = input.files[0];
      const span = input.parentElement.querySelector(
        ".cadastro_projeto__midia-info"
      );
      const btnRemoverMidia =
        input.parentElement.querySelector(".btnRemoverMidia");

      if (file && fileTypes.includes(file.type)) {
        span.classList.remove("cadastro_projeto__midia-info--invalido");
        span.classList.add("cadastro_projeto__midia-info--valido");
        btnRemoverMidia.classList.remove("btnRemoverMidia--hidden");
        span.innerHTML = `${file.name}`;
      } else {
        span.classList.remove("cadastro_projeto__midia-info--valido");
        span.classList.add("cadastro_projeto__midia-info--invalido");
        btnRemoverMidia.classList.add("btnRemoverMidia--hidden");
        input.value = "";

        if (!file) span.innerHTML = "Nenhuma mídia selecionada!";
        else span.innerHTML = "O formato do arquivo selecionado não é válido!";
      }
    };
  });
}

async function validaInputCep(input) {
  try {
    const dados = await buscaCep(input.value);
    preencheCamposCep(dados);
    input.setCustomValidity("");
  } catch (error) {
    preencheCamposCep({ logradouro: "", localidade: "", bairro: "", uf: "" });
    input.setCustomValidity(error.message);
  }
}

function mostraErro(input, tipoInput) {
  let mensagem = "";

  tiposErro.forEach((erro) => {
    if (input.validity[erro]) {
      mensagem = mensagensErro[tipoInput][erro];
    }
  });
  return mensagem;
}

const fileTypes = {
  image: [
    "image/avif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/webp",
  ],
  video: [
    "video/x-msvideo",
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/mp2t",
    "video/webm",
    "video/3gpp",
    "video/3gpp2",
  ],
};

export { validaInput, limpaInputs, validaInputMidias, fileTypes };
