import Controller from "./Controller.js";

class UsuarioController extends Controller {
  constructor() {
    super("/usuarios");
  }

  async autenticaUsuario(token) {
    try {
      const res = await fetch(`${this.url}/autenticar`, {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
        throw new Error(
          "Ocorreu um erro inesperado ao tentar realizar a autenticação do usuário!"
        );
      }
      throw error;
    }
  }

  async logaUsuario(dados) {
    try {
      const res = await fetch(`${this.url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
        throw new Error(
          "Ocorreu um erro inesperado ao tentar realizar o login do usuário!"
        );
      }
      throw error;
    }
  }
}

export default UsuarioController;
