const db = require("../models");
const { DatabaseError, UniqueConstraintError } = require("sequelize");
const { BadRequestError, ConflictError, NotFoundError } = require("../errors");

class Services {
	constructor(nomeDoModelo) {
		this.nomeDoModelo = nomeDoModelo;
	}

	async buscaRegistros(where = {}) {
		try {
			return await db[this.nomeDoModelo].findAll({ where: { ...where } });
		} catch (error) {
			if (error instanceof DatabaseError)
				throw new BadRequestError("O filtro selecionado é inválido!");

			throw error;
		}
	}

	async buscaUmRegistro(where = {}) {
		try {
			const registro = await db[this.nomeDoModelo].findOne({
				where: { ...where },
			});

			if (registro) return registro;

			throw new NotFoundError("Registro não encontrado!");
		} catch (error) {
			if (error instanceof DatabaseError)
				throw new BadRequestError("O filtro selecionado é inválido!");

			throw error;
		}
	}

	async criaRegistro(dados) {
		try {
			return await db[this.nomeDoModelo].create(dados);
		} catch (error) {
			if (error instanceof UniqueConstraintError && error.fields.PRIMARY)
				throw new ConflictError(
					`O ID ${error.fields.PRIMARY} não está disponível!`
				);

			throw error;
		}
	}

	// async atualizaRegistro(dados, where = {}) {
	//   try {
	//     return await db[this.nomeDoModelo].update(dados, { where: { ...where } });
	//   } catch (error) {
	//     throw error;
	//   }
	// }

	async deletaRegistro(where = {}) {
		try {
			return await db[this.nomeDoModelo].destroy({ where: { ...where } });
		} catch (error) {
			throw error;
		}
	}
}

module.exports = Services;
