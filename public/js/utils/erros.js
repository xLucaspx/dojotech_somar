// ordem importa: no caso de ocorrência de mais de um erro ao mesmo tempo,
// o que ocorre por útlimo na lista será mostrado primeiro para o usuário:
const tiposErro = [
  "valueMissing",
  "customError",
  "tooShort",
  "patternMismatch",
];

// mensagens de erro para cada input por ordem alfabética:
const mensagensErro = {
  bairro: {
    valueMissing: 'O campo "Bairro" deve ser preenchido.',
    tooShort: "O bairro deve ter entre 3 e 50 caracteres.",
  },
  causa: {
    valueMissing: 'O campo "Causa" deve ser preenchido.',
    tooShort: "A causa de atuação deve ter entre 3 e 75 caracteres.",
  },
  cep: {
    valueMissing: 'O campo "CEP" deve ser preenchido.',
    customError: "Não foi possível buscar o CEP",
    tooShort: "O CEP deve ter 8 ou 9 dígitos.",
    patternMismatch: "O CEP digitado é inválido.",
  },
  cidade: {
    valueMissing: 'O campo "Cidade" deve ser preenchido.',
    tooShort: "A cidade deve ter entre 3 e 50 caracteres.",
  },
  email: {
    valueMissing: 'O campo "Email" deve ser preenchido.',
    patternMismatch: "O email digitado é inválido.",
  },
  logradouro: {
    valueMissing: 'O campo "Endereço" deve ser preenchido.',
    tooShort: "O endereço deve ter entre 5 e 100 caracteres.",
  },
  mensagem: {
    valueMissing: 'O campo "Mensagem" deve ser preenchido.',
    tooShort: "A mensagem deve ter entre 10 e 255 caracteres.",
  },
  nome: {
    valueMissing: 'O campo "Nome" deve ser preenchido.',
    tooShort: "O nome deve ter entre 3 e 75 caracteres.",
  },
  objetivo: {
    valueMissing: 'O campo "Objetivo" deve ser preenchido.',
    tooShort: "O objetivo deve ter entre 10 e 125 caracteres.",
  },
  publico: {
    valueMissing: 'O campo "Público-alvo" deve ser preenchido.',
    tooShort: "O público-alvo deve ter entre 3 e 75 caracteres.",
  },
  resumo: {
    valueMissing: 'O campo "Resumo" deve ser preenchido.',
    tooShort: "O resumo do projeto deve ter entre 10 e 475 caracteres.",
  },
  senha: {
    valueMissing: 'O campo "Senha" deve ser preenchido.',
    tooShort: "A senha deve ter entre 8 e 50 caracteres.",
    patternMismatch:
      "Mín: 8 caracteres, letras maiúsculas, minúsculas, 1 número e 1 caractere especial.",
  },
  telefone: {
    valueMissing: 'O campo "Telefone" deve ser preenchido.',
    tooShort: "O telefone deve ter entre 10 e 25 caracteres.",
    patternMismatch: "O número de telefone digitado é inválido.",
  },
  uf: {
    valueMissing: 'O campo "UF" deve ser preenchido.',
    tooShort: "A UF possui deve possuir 2 caracteres.",
  },
  usuario: {
    valueMissing: 'O campo "Nome de usuário" deve ser preenchido.',
    tooShort: "O nome de usuário deve ter entre 3 e 20 caracteres.",
    patternMismatch: "Apenas letras, números, hífen e underline.",
  },
};

export { tiposErro, mensagensErro };
