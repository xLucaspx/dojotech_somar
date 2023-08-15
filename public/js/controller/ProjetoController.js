import { Controller } from "./Controller.js";

export class ProjetoController extends Controller {
  constructor() {
    super("/projetos");
  }

  async buscaProjetos() {
    try {
      const res = await fetch(`${this.url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}
