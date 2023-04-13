const inputUsuario = document.getElementById("login__usuario");
const inputSenha = document.getElementById("login__senha");

const btnLogin = document.getElementById("login__btnLogin");

btnLogin.onclick = async (event) => {
  event.preventDefault();

  const usuario = inputUsuario.value;
  const senhaDigitada = inputSenha.value;

  try {
    let res;
    if (usuario.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      res = await axios.get(`http://localhost:3000/usuarios/email/${usuario}`);
    } else {
      res = await axios.get(
        `http://localhost:3000/usuarios/usuario/${usuario}`
      );
    }

    if (res.data.senha === senhaDigitada) {
      window.location.href = "index.html";
    } else {
      alert("Nome de usuário ou senha incorretos!");
      inputSenha.value = "";
    }
  } catch (error) {
    console.log(error.message);
  }
};
