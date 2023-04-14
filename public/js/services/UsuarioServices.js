import { Services } from "./Services.js";

export class UsuarioServices extends Services {
  constructor() {
    super("usuarios/");
  }

  async buscaPorUsuario(usuario) {
    const url = this.url + `usuario/${usuario}`;
    try {
      const user = await axios.get(url);
      return user.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async buscaPorEmail(email) {
    const url = this.url + `email/${email}`;
    try {
      const user = await axios.get(url);
      return user.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
