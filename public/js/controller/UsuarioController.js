import { BASE_URL } from "../baseUrl.js";
import Controller from "./Controller.js";

class UsuarioController extends Controller {
	constructor() {
		super("/user");
	}

	async autenticaUsuario(token) {
		try {
			const res = await fetch(`${BASE_URL}/auth`, {
				method: "GET",
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
			const res = await fetch(`${BASE_URL}/login`, {
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

	async buscaProjetos(idUsuario, token = "") {
		const url = this.url + `/projects?userId=${idUsuario}`;

		try {
			const res = await fetch(url, {
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
}

export default UsuarioController;
