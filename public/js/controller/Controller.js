import { BASE_URL } from "../baseUrl.js";

class Controller {
	baseUrl = BASE_URL;

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

			throw new Error(data.error);
		} catch (error) {
			throw error;
		}
	}

	async buscaPorId(id, token = "") {
		try {
			const res = await fetch(`${this.url}/details?id=${id}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			});
			const data = await res.json();

			if (res.ok) return data;

			throw new Error(data.error);
		} catch (error) {
			throw error;
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

			throw new Error(data.error);
		} catch (error) {
			// if (error instanceof SyntaxError) console.error("Syntax:\n", error);

			throw error;
		}
	}

	async atualiza(dados, token = "") {
		try {
			const res = await fetch(this.url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(dados),
			});

			if (res.ok) return;

			const data = await res.json();
			throw new Error(data.error);
		} catch (error) {
			throw error;
		}
	}

	async deleta(id, token = "") {
		try {
			const res = await fetch(this.url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ id }),
			});

			if (res.ok) return;

			const data = await res.json();
			throw new Error(data.error);
		} catch (error) {
			throw error;
		}
	}
}

export default Controller;
