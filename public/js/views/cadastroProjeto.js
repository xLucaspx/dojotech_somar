const inputNome = document.getElementById("cadastro_projeto__nome");
const inputCausa = document.getElementById("cadastro_projeto__causa");
const inputObjetivo = document.getElementById("cadastro_projeto__objetivo");
const inputPublico = document.getElementById("cadastro_projeto__publico");
const inputCidade = document.getElementById("cadastro_projeto__cidade");
const inputParceiros = document.getElementById("cadastro_projeto__parceiros");
const inputResumo = document.getElementById("cadastro_projeto__resumo");

const form = document.querySelector(".cadastro_projeto__form");

form.onsubmit = (event) => {
  event.preventDefault();

  try {
    const inputOds = Array.from(
      document.querySelectorAll("input[name=ods]:checked")
    );
    const ods = inputOds.map((input) => input.value);

    if (ods.length <= 0) {
      throw new Error("Você precisa selecionar pelo menos um ODS");
    }

    const projeto = {
      nome: inputNome.value,
      causa: inputCausa.value,
      objetivo: inputObjetivo.value,
      publico: inputPublico.value,
      cidade: inputCidade.value,
      parceiros: inputParceiros.value,
      resumo: inputResumo.value,
      ods: ods,
    };

    console.log(projeto);
  } catch (error) {
    alert(`Erro ao cadastrar projeto:\n${error.message}`);
  }
};
