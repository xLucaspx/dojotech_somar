import { Controller } from "./Controller.js";

export class UsuarioController extends Controller {
  constructor() {
    super("/usuarios");
  }

  async autenticaUsuario(token) {
    try {
      const res = await fetch(`${this.url}/autenticar`, {
        method: "GET",
        headers: {
          "Content-Type": "application.json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await req.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error);
        throw new Error(
          "Ocorreu um erro inesperado ao realizar a autenticação do usuário"
        );
      }
      throw error;
    }
  }
}
