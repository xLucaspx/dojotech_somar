const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const getToken = require("./getToken");
const verificaJwt = require("../../utils/token/verificaJwt");
const app = require("../../server");

describe("Dojotech API E2E Test Suite - Usuários", () => {
  let BASE_URL = "";
  let _server = {};

  before(async () => {
    // quando não passamos nenhuma porta, o Node escolhe uma vazia:
    _server = app.listen();
    await new Promise((resolve, reject) => {
      _server.once("listening", () => {
        const { port } = _server.address();
        BASE_URL = `http://localhost:${port}`;
        console.log("Servidor rodando em ", BASE_URL);
        resolve();
      });
    });
  });

  after((done) => _server.close(done));

  describe("GET /usuarios", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e a lista de usuários", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(lista, `Deveria retornar a lista de usuários`);
    });
  });

  describe("GET /usuarios/:id", async () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/usuarios/1`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) ao buscar por um id diferente do presente no token", async () => {
      const token = await getToken(BASE_URL); // id: 2

      const res = await fetch(`${BASE_URL}/usuarios/5`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e o usuário buscado com token e id válidos", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "juca@projetosomar.com",
        senha: "#senhaJuca01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const expectedUser = {
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

      const actualUser = await res.json();
      assert.deepStrictEqual(
        actualUser,
        expectedUser,
        `Deveria retornar o usuário com ID correspondente`
      );
    });
  });

  describe("POST /usuarios", () => {
    it("Deve retornar 400 (bad request) ao tentar cadastrar um usuário inválido", async () => {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um usuário com informações faltando", async () => {
      const user = {
        usuario: "usuario",
        senha: "#senhaUsuario",
      };

      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 409 (conflict) ao tentar cadastrar um nome de usuário já utilizado", async () => {
      const user = {
        nome: "Juca da Silva",
        usuario: "juca_s",
        email: "juca@email.com",
        senha: "#senhaJuca01",
        telefone: "51 98765-0987",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const expected = 409;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 409 (conflict) ao tentar cadastrar um email já utilizado", async () => {
      const user = {
        nome: "Juca da Silva",
        usuario: "juca_s_002",
        email: "juca@projetosomar.com",
        senha: "#senhaJuca01",
        telefone: "51 98765-0987",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });

      const expected = 409;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 201 (created) e o usuário criado", async () => {
      const user = {
        id: 3,
        nome: "Usuário de Teste",
        usuario: "test_user",
        email: "usuario@teste.com",
        senha: "#senhaUsuario01",
        telefone: "51 3456-7890",
        cep: "90040191",
        logradouro: "Avenida Venâncio Aires",
        complemento: "",
        numero: "93",
        bairro: "Azenha",
        cidade: "Porto Alegre",
        uf: "RS",
      };

      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const expected = 201;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const actualUser = await res.json();
      assert.ok(actualUser, `Deveria retornar o usuário cadastrado`);
    });
  });

  describe("POST /usuarios/login", () => {
    it("Deve retornar 401 (unauthorized) com nome de usuário válido e senha incorreta", async () => {
      const input = {
        usuario: "test_user",
        senha: "123",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) com email válido e senha incorreta", async () => {
      const input = {
        usuario: "usuario@teste.com",
        senha: "123",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 404 (not found) com usuário inválido", async () => {
      const input = {
        usuario: "invalid",
        senha: "123",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 404;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 404 (not found) com email inválido", async () => {
      const input = {
        usuario: "invalid@email.com",
        senha: "123",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 404;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e token de acesso com usuário e senha válidos", async () => {
      const input = {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const token = await res.json();
      verificaJwt(token);
    });

    it("Deve retornar 200 (OK) e token de acesso com email e senha válidos", async () => {
      const input = {
        usuario: "usuario@teste.com",
        senha: "#senhaUsuario01",
      };

      const res = await fetch(`${BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const token = await res.json();
      verificaJwt(token);
    });
  });

  describe("POST /usuarios/autenticar", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/usuarios/autenticar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) com token de autorização inválido", async () => {
      const res = await fetch(`${BASE_URL}/usuarios/autenticar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.stringify("Bearer invalid.json.token"),
        },
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK), nome e id do usuário com token válido", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/usuarios/autenticar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const user = await res.json();
      assert.ok(user, `Deveria retornar nome e id do usuário`);
    });
  });

  describe("PUT /usuarios/:id", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Usuario" }),
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 400 (bad request) ao passar informações inválidas", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senha: "#novaSenha01",
          cep: null,
          nome: "",
        }),
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) com id diferente do presente no token", async () => {
      const token = await getToken(BASE_URL); // silviads - id = 2

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome: "Usuario" }),
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 409 (conflict) ao tentar alterar o id do usuário", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: 15 }),
      });

      const expected = 409;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 409 (conflict) ao tentar alterar o nome de usuário para outro já existente", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ usuario: "silviads" }),
      });

      const expected = 409;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 409 (conflict) ao tentar alterar o email para outro já existente", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: "silvia@projetosomar.com" }),
      });

      const expected = 409;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e o usuário modificado com token e informações corretas", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cep: "90200-500",
          logradouro: "Rua Fecoméricio",
          numero: 101,
        }),
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const modifiedUser = await res.json();
      assert.ok(
        modifiedUser,
        "Deveria retornar o usuário com as informações atualizadas!"
      );
    });
  });

  describe("DELETE /usuarios/:id", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) com id diferente do presente no token", async () => {
      const token = await getToken(BASE_URL); // silviads - id = 2

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 401;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 204 (no content) ao excluir um usuário", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "test_user",
        senha: "#senhaUsuario01",
      });

      const res = await fetch(`${BASE_URL}/usuarios/3`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 204;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });
  });
});
