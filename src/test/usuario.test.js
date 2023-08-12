const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const app = require("../server");
const verificaJwt = require("../utils/token/verificaJwt");

describe("Teste rotas de usuário", () => {
  const port = process.env.PORT || 3000;
  let BASE_URL = `http://localhost:${port}`;
  let _server = {};

  before(async () => {
    _server = app;
    _server.listen(port, () =>
      console.log("teste usuários: servidor rodando em ", BASE_URL)
    );
  });

  after((done) => _server.close(done));

  describe("GET /usuarios", () => {
    const url = `${BASE_URL}/usuarios`;
    const method = "GET";

    it("Deve retornar 200 (OK) e a lista de usuários", async () => {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 404 (not found) ao buscar por um id inexistente", async () => {
      const res = await fetch(`${url}/aaa`, {
        method: method,
        headers: { "Content-Type": "application/json" },
      });

      const expected = 404;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e o usuário buscado", async () => {
      const res = await fetch(`${url}/1`, {
        method: method,
        headers: { "Content-Type": "application/json" },
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

  describe("POST /usuarios/login", () => {
    const url = `${BASE_URL}/usuarios/login`;
    const method = "POST";
    const validUser = {
      usuarioDigitado: "silviads",
      senhaDigitada: "#senhaSilvia01",
    };

    it("deve retornar 401 (unauthorized) com usuário válido e senha incorreta", async () => {
      const input = {
        usuarioDigitado: validUser.usuarioDigitado,
        senhaDigitada: "invalid",
      };

      const res = await fetch(url, {
        method: method,
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

    it("deve retornar 404 (not found) com usuário inválido", async () => {
      const input = {
        usuarioDigitado: "invalid",
        senhaDigitada: "invalid",
      };

      const res = await fetch(url, {
        method: method,
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

    it("deve retornar 200 (OK) e um token de acesso com usuário e senha válidos", async () => {
      const input = validUser;

      const res = await fetch(url, {
        method: method,
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
});
