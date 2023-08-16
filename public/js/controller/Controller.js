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

  async cadastra(dados, token = "") {
    try {
      const res = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.message);
    } catch (error) {
      if (error instanceof SyntaxError) console.error("Syntax:\n", error);

      console.error("Erro ao cadastrar:\n", error);
    }
  }

  async atualiza(dados, id, token = "") {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async deleta(id, token = "") {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.message);
    } catch (error) {
      console.error(error);
      console.log(res);
    }
  }
}
