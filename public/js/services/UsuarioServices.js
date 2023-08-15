import { Services } from "./Services.js";

export class UsuarioServices extends Services {
  constructor() {
    super("usuarios/");
  }

  async logaUsuario(dados) {
    const url = this.url + "login/";
    try {
      const res = await axios.post(url, dados);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async autenticaUsuario(tokenJwt) {
    const url = this.url + "autenticar/";
    const headers = { authorization: `Bearer ${tokenJwt}` };
    try {
      const res = await axios.post(url, {}, { headers });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}
