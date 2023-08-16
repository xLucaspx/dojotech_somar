export class Controller {
  baseUrl = "http://localhost:3000";

  constructor(resource) {
    this.url = this.baseUrl + resource;
  }

  async buscaDados(token = "") {
    try {
      const res = await fetch(this.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.message);
    } catch (error) {
      alert(error);
    }
  }

  async buscaPorId(id, token = "") {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.message);
    } catch (error) {
      alert(`Erro ao buscar dados:\n${error.message}`);
    }
  }
}
