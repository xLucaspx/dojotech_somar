(() => {
  const inputs = document.querySelectorAll(".form__texto");

  inputs.forEach((input) => {
    input.addEventListener("focusout", (evento) => valida(evento.target));
  });

  function valida(input) {
    const tipoInput = input.dataset.tipo;
    const mensagemErro = input.parentElement.querySelector(
      ".form__fieldset__msg"
    );

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

  function mostraErro(input, tipoInput) {
    let mensagem = "";

    tiposErro.forEach((erro) => {
      if (input.validity[erro]) {
        mensagem = mensagemErro[tipoInput][erro];
      }
    });
    return mensagem;
  }

  const tiposErro = ["patternMismatch", "valueMissing"];

  const mensagemErro = {
    nome: { valueMissing: 'O campo "Nome" deve ser preenchido.' },
    email: {
      patternMismatch: "O email digitado não é válido.",
      valueMissing: 'O campo "Email" deve ser preenchido.',
    },
    telefone: {
      patternMismatch: "Insira ddd e telefone válidos.",
      valueMissing: 'O campo "Telefone" deve ser preenchido.',
    },
    mensagem: { valueMissing: 'O campo "Mensagem" deve ser preenchido.' },
  };
})();
