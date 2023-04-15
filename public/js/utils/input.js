import { buscaCep, preencheCamposCep } from "./cep.js";
import { mensagensErro, tiposErro } from "./erros.js";

function limpaInputs(inputs) {
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

  if (input.validity.valid) {
    input.classList.remove("form__texto--invalido");
    input.classList.add("form__texto--valido");
    mensagemErro.innerHTML = "";
  } else {
    input.classList.remove("form__texto--valido");
    input.classList.add("form__texto--invalido");
    mensagemErro.innerHTML = mostraErro(input, tipoInput);
    return false;
  }
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

export { validaInput, limpaInputs };
