import Controller from "./Controller.js";

class ProjetoController extends Controller {
  constructor() {
    super("/project");
  }

  async buscaPorFiltro(filtro, valor) {
    const url = this.url + `?${filtro}=${valor}`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) return data;

      throw new Error(data.error);
    } catch (error) {
      throw error;
    }
  }

  async geraRelatorio(token = "") {
    try {
      const res = await fetch(`${this.url}/relatorio`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) return;

      const data = await res.json();
      throw new Error(data.error);
    } catch (error) {
      throw error;
    }
  }

  async cadastraMidias(idProjeto, formData, token = "") {
    const url = this.url + `/$media?projectId=${idProjeto}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        // não colocar o content-type para que o browser defina o
        // boundary=----WebKitFormBoundary, que delimita os arquivos
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) return;

    const data = await res.json();
    throw new Error(data.error);
  }

  async removeMidia(idProjeto, idMidia, token = "") {
    const url = this.url + `/media`

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ projectId: idProjeto, mediaId: idMidia }),
    });

    if (res.ok) return;

    const data = await res.json();
    throw new Error(data.error);
  }
}

export default ProjetoController;
