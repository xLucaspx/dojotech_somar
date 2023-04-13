const inputNome = document.getElementById("cadastro_usuario__nome");
const inputEmail = document.getElementById("cadastro_usuario__email");
const inputUsuario = document.getElementById("cadastro_usuario__usuario");
const inputTelefone = document.getElementById("cadastro_usuario__telefone");
const inputSenha = document.getElementById("cadastro_usuario__senha");
const inputCep = document.getElementById("cadastro_usuario__cep");
const inputLogradouro = document.getElementById("cadastro_usuario__logradouro");
const inputBairro = document.getElementById("cadastro_usuario__bairro");
const inputNumero = document.getElementById("cadastro_usuario__numero");
const inputComplemento = document.getElementById(
  "cadastro_usuario__complemento"
);
const inputCidade = document.getElementById("cadastro_usuario__cidade");
const inputUf = document.getElementById("cadastro_usuario__uf");

const btnCadastro = document.getElementById("cadastro_usuario__btnCadastro");

btnCadastro.onclick = async (event) => {
  event.preventDefault();

  const usuario = {
    nome: inputNome.value,
    email: inputEmail.value,
    usuario: inputUsuario.value,
    telefone: inputTelefone.value,
    senha: inputSenha.value,
    cep: inputCep.value,
    logradouro: inputLogradouro.value,
    bairro: inputBairro.value,
    numero: inputNumero.value,
    complemento: inputComplemento.value,
    cidade: inputCidade.value,
    uf: inputUf.value,
  };

  try {
    await axios.post("http://localhost:3000/usuarios", usuario);

    inputNome.value = "";
    inputEmail.value = "";
    inputUsuario.value = "";
    inputTelefone.value = "";
    inputSenha.value = "";
    inputCep.value = "";
    inputLogradouro.value = "";
    inputBairro.value = "";
    inputNumero.value = "";
    inputComplemento.value = "";
    inputCidade.value = "";
    inputUf.value = "";

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Erro ao cadastrar usuário: " + error.message);
  }
};
