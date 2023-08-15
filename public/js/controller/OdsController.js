import { Controller } from "./Controller.js";

export class OdsController extends Controller {
  constructor() {
    super("/ods");
  }

  async buscaOds() {
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
