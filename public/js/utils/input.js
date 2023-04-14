import { buscaCep, preencheCamposCep } from "./cep.js";

export async function validaInput(input) {
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
      mensagem = mensagemErro[tipoInput][erro];
    }
  });
  return mensagem;
}

const tiposErro = [
  "valueMissing",
  "customError",
  "tooShort",
  "patternMismatch",
];

const mensagemErro = {
  nome: {
    valueMissing: 'O campo "Nome" deve ser preenchido.',
    tooShort: "O nome deve ter entre 3 e 75 caracteres.",
  },
  email: {
    valueMissing: 'O campo "Email" deve ser preenchido.',
    patternMismatch: "O email digitado não é válido.",
  },
  usuario: {
    valueMissing: 'O campo "Nome de usuário" deve ser preenchido.',
    tooShort: "O nome de usuário deve ter entre 3 e 20 caracteres.",
    patternMismatch: "Apenas letras, números, hífen e underline.",
  },
  senha: {
    valueMissing: 'O campo "Senha" deve ser preenchido.',
    tooShort: "A senha deve ter entre 8 e 50 caracteres.",
    patternMismatch: "Mín: 8 caracteres, letras maiúsculas, minúsculas, 1 número e 1 caractere especial.",
  },
  telefone: {
    valueMissing: 'O campo "Telefone" deve ser preenchido.',
    tooShort: "O telefone deve ter entre 10 e 25 caracteres.",
    patternMismatch: "Insira DDD e número de telefone válidos.",
  },
  cep: {
    valueMissing: 'O campo "CEP" deve ser preenchido.',
    customError: "Não foi possível buscar o CEP",
    tooShort: "O CEP deve ter 8 ou 9 dígitos.",
    patternMismatch: "CEP inválido.",
  },
  mensagem: {
    valueMissing: 'O campo "Mensagem" deve ser preenchido.',
    tooShort: "A mensagem deve ter entre 10 e 255 caracteres.",
  },
};
