const { describe, it } = require("node:test");
const assert = require("node:assert");
const { UsuarioServices } = require("../../services");
const criaHashComSalt = require("../../utils/hash/criaHashComSalt");
const usuarioServices = new UsuarioServices();

describe("Dojotech API Unit Test Suite - UsuarioServices", () => {
  describe("Método buscaUsuario", () => {
    it("Deve lançar um erro ao buscar com um filtro inexistente", async () => {
      await assert.rejects(
        usuarioServices.buscaUsuario({ inexistente: "inexistente" }),
        {
          message: "O filtro selecionado é inválido!",
          status: 400,
        }
      );
    });

    it("Deve lançar um erro ao buscar por um usuário inexistente", async () => {
      await assert.rejects(
        usuarioServices.buscaUsuario({ nome: "inexistente" }),
        {
          message: "Usuário não encontrado!",
          status: 404,
        }
      );
    });

    it("Deve retornar o usuário buscado", async () => {
      const expected = {
        id: 1,
        nome: "Juca da Silva",
        usuario: "juca_s",
        email: "juca@projetosomar.com",
        telefone: "51 98765-0987",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: null,
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      const actual = await usuarioServices.buscaUsuario({ id: expected.id });

      assert.deepStrictEqual(
        actual.dataValues,
        expected,
        "Deveria retornar o usuário buscado!"
      );
    });
  });

  describe("Método buscaUsuarioLogin", () => {
    it("Deve lançar um erro ao buscar por um usuário inexistente", async () => {
      await assert.rejects(
        usuarioServices.buscaUsuarioLogin({ usuario: "inexistente" }),
        {
          message: "Usuário não encontrado!",
          status: 404,
        }
      );
    });

    it("Deve retornar as informações de login do usuário buscado", async () => {
      const expected = {
        id: 1,
        nome: "Juca da Silva",
        hash_senha:
          "ddbef2b610e422b4985c268c015a55e27e69a911790187413a2adf52bc3647e375d74c58d0c824b74572a469314ea28653006f85d1971d6fcf1fb03c9fbec6ec",
        salt: "2ceb3b70c876ad982127be383fc71a39",
      };

      const actual = await usuarioServices.buscaUsuarioLogin({
        email: "juca@projetosomar.com",
      });

      assert.deepStrictEqual(
        actual.dataValues,
        expected,
        "Deveria retornar o usuário buscado!"
      );
    });
  });

  describe("Método cadastraUsuario", () => {
    it("Deve lançar um erro ao tentar cadastrar um usuário inválido", async () => {
      await assert.rejects(usuarioServices.cadastraUsuario({}), {
        message:
          "Por favor, verifique se os campos estão preenchidos corretamente!",
        status: 400,
      });
    });

    it("Deve lançar um erro ao tentar cadastrar um ID repetido", async () => {
      const [salt, hash] = criaHashComSalt("#senhaUsuario01").split(":");
      const user = {
        id: 1,
        nome: "Usuário de Teste",
        usuario: "test_user",
        email: "usuario@teste.com",
        hash_senha: hash,
        salt: salt,
        telefone: "51 3344-5678",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      await assert.rejects(usuarioServices.cadastraUsuario(user), {
        message: `O ID ${user.id} não está disponível!`,
        status: 409,
      });
    });

    it("Deve lançar um erro ao tentar cadastrar um nome de usuário repetido", async () => {
      const [salt, hash] = criaHashComSalt("#senhaUsuario01").split(":");
      const user = {
        nome: "Usuário de Teste",
        usuario: "juca_s",
        email: "usuario@teste.com",
        hash_senha: hash,
        salt: salt,
        telefone: "51 3344-5678",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      await assert.rejects(usuarioServices.cadastraUsuario(user), {
        message: `O nome de usuário "${user.usuario}" não está disponível!`,
        status: 409,
      });
    });

    it("Deve lançar um erro ao tentar cadastrar um email repetido", async () => {
      const [salt, hash] = criaHashComSalt("#senhaUsuario01").split(":");
      const user = {
        nome: "Usuário de Teste",
        usuario: "test_user",
        email: "juca@projetosomar.com",
        hash_senha: hash,
        salt: salt,
        telefone: "51 3344-5678",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      await assert.rejects(usuarioServices.cadastraUsuario(user), {
        message: `Já existe uma conta registrada para o email "${user.email}"!`,
        status: 409,
      });
    });

    it("Deve retornar o usuário criado", async () => {
      const [salt, hash] = criaHashComSalt("#senhaUsuario01").split(":");
      const user = {
        id: 3,
        nome: "Usuário de Teste",
        usuario: "test_user",
        email: "usuario@teste.com",
        hash_senha: hash,
        salt: salt,
        telefone: "51 3344-5678",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
        updatedAt: new Date(),
        createdAt: new Date(),
      };

      const actual = await usuarioServices.cadastraUsuario(user);

      assert.deepStrictEqual(
        actual.dataValues,
        user,
        "Deveria retornar o usuário criado!"
      );
    });
  });

  describe("Método atualizaUsuario", () => {
    it("Deve lançar um erro ao tentar remover informações de um usuário", async () => {
      await assert.rejects(
        usuarioServices.atualizaUsuario({ nome: "", cep: null }, 3),
        {
          message:
            "Por favor, verifique se os campos estão preenchidos corretamente!",
          status: 400,
        }
      );
    });

    it("Deve lançar um erro ao tentar editar um usuário inexistente", async () => {
      await assert.rejects(usuarioServices.atualizaUsuario({}, "aaa"), {
        message: "Usuário não encontrado!",
        status: 404,
      });
    });

    it("Deve lançar um erro ao tentar editar o id de um usuário", async () => {
      const user = {
        id: 55,
        nome: "Usuário de Teste Atualizado",
      };

      await assert.rejects(usuarioServices.atualizaUsuario(user, 3), {
        message: "Não é possível editar o id de um usuário!",
        status: 409,
      });
    });

    it("Deve lançar um erro ao tentar atualizar o nome de usuário para um já cadastrado", async () => {
      const user = {
        usuario: "juca_s",
      };

      await assert.rejects(usuarioServices.atualizaUsuario(user, 3), {
        message: `O nome de usuário "${user.usuario}" não está disponível!`,
        status: 409,
      });
    });

    it("Deve lançar um erro ao tentar atualizar o email para um já cadastrado", async () => {
      const user = {
        email: "juca@projetosomar.com",
      };

      await assert.rejects(usuarioServices.atualizaUsuario(user, 3), {
        message: `Já existe uma conta registrada para o email "${user.email}"!`,
        status: 409,
      });
    });
  });

  describe("Método deletaRegistro", () => {
    it("Deve deletar o usuário informado", async () => {
      const deleted = await usuarioServices.deletaRegistro({ id: 3 });
      assert.strictEqual(
        deleted,
        1,
        `Deveria retornar 1. Retornado: ${deleted}`
      );
    });
  });
});
