const { describe, it, before, after } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const app = require("../server");

describe("Dojotech API E2E test suite - Projetos", () => {
  let BASE_URL = "";
  let _server = {};

  before(async () => {
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

  describe("GET /projetos", () => {
    it("Deve retornar 200 (OK) e a lista de projetos", async () => {
      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(lista, `Deveria retornar a lista de projetos`);
    });
  });

  describe("GET /projetos/relatorio", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/projetos/relatorio`, {
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

    it("Deve retornar 204 (no content) e gerar o relatório de projetos", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/projetos/relatorio`, {
        method: "GET",
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

      const relatorio = fs.existsSync(
        path.join(__dirname, "../../public/report/relatorio-projetos.txt")
      );
      assert.ok(relatorio, `Deveria criar o relatório de projetos`);
    });
  });

  describe("GET /projetos/filtro?", () => {
    it("Deve retornar 400 (bad request) ao buscar por um filtro inexistente", async () => {
      const res = await fetch(`${BASE_URL}/projetos/filtro?ablubleble=`, {
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

    it("Deve retornar 200 (OK) e a lista de projetos ao buscar por ODS", async () => {
      const res = await fetch(
        `${BASE_URL}/projetos/filtro?ods=11%20-%20cidades%20e%20comunidades%20sustentáveis`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(
        lista,
        "Deveria ter retornado a lista de projetos correspondentes."
      );
    });

    it("Deve retornar 200 (OK) e a lista de projetos ao buscar por nome", async () => {
      const res = await fetch(`${BASE_URL}/projetos/filtro?nome=verde`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(
        lista,
        "Deveria ter retornado a lista de projetos correspondentes."
      );
    });

    it("Deve retornar 200 (OK) e a lista de projetos ao buscar por cidade", async () => {
      const res = await fetch(
        `${BASE_URL}/projetos/filtro?cidade=Porto+Alegre+-+RS`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(
        lista,
        "Deveria ter retornado a lista de projetos correspondentes."
      );
    });

    it("Deve retornar 200 (OK) e a lista de projetos ao buscar por causa de atuação", async () => {
      const res = await fetch(
        `${BASE_URL}/projetos/filtro?causa=reflorestamento e arborização`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(
        lista,
        "Deveria ter retornado a lista de projetos correspondentes."
      );
    });

    it("Deve retornar 200 (OK) e a lista de projetos ao buscar por público-alvo", async () => {
      const res = await fetch(
        `${BASE_URL}/projetos/filtro?publico_alvo=moradores`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const lista = await res.json();
      assert.ok(
        lista,
        "Deveria ter retornado a lista de projetos correspondentes."
      );
    });
  });

  describe("GET /projetos/usuario?", () => {
    it("Deve retornar 400 (bad request) sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/projetos/usuario?idUsuario=2`, {
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

    it("Deve retornar 401 (unauthorized) ao buscar um id diferente do presente no token", async () => {
      const token = await getToken(BASE_URL); // id: 2

      const res = await fetch(`${BASE_URL}/projetos/usuario?idUsuario=7`, {
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

    it("Deve retornar 200 (OK) e a lista de projetos do usuário autenticado", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/projetos/usuario?idUsuario=2`, {
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
      assert.ok(lista, "Deveria retornar a lista de projetos do usuário.");
    });
  });

  describe("GET /projetos/:id", () => {
    it("Deve retornar 404 (not found) ao buscar por um id inexistente", async () => {
      const res = await fetch(`${BASE_URL}/projetos/aaa`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 404;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 200 (OK) e o projeto buscado", async () => {
      const res = await fetch(`${BASE_URL}/projetos/1`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const project = await res.json();
      assert.ok(project, "Deveria retornar o projeto buscado.");
    });
  });

  describe("POST /projetos", () => {
    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto sem token de autorização", async () => {
      const input = {
        projeto: {
          id: 3,
          nome: "Projeto Teste",
          causa: "Realizar os testes do sistema",
          objetivo: "Testar o cadastro de projetos",
          cidade: "Porto Alegre - RS",
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
          resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          id_usuario: 2,
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto com informações faltando", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 3,
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
          id_usuario: 2,
        },
        ods: [1],
      };

      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto sem ODS", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 3,
          nome: "Projeto Teste",
          causa: "Realizar os testes do sistema",
          objetivo: "Testar o cadastro de projetos",
          cidade: "Porto Alegre - RS",
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
          resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          id_usuario: 2,
        },
        ods: [],
      };

      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto sem id de usuário", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 3,
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      const expected = 400;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );
    });

    it("Deve retornar 401 (unauthorized) ao tentar cadastrar um projeto com id de outro usuário", async () => {
      const token = await getToken(BASE_URL); // id: 2

      const input = {
        projeto: {
          id: 3,
          nome: "Projeto Teste",
          causa: "Realizar os testes do sistema",
          objetivo: "Testar o cadastro de projetos",
          cidade: "Porto Alegre - RS",
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
          resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          id_usuario: 1,
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos`, {
        method: "POST",
        body: JSON.stringify(input),
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

    it("Deve retornar 201 (created) e o projeto criado", {skip: "skipping until implement the delete route test"}, async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 3,
          nome: "Projeto Teste",
          causa: "Realizar os testes do sistema",
          objetivo: "Testar o cadastro de projetos",
          cidade: "Porto Alegre - RS",
          parceiros: "Node.js core test runner",
          publico_alvo: "Futuros usuários do sistema",
          resumo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          id_usuario: 2,
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      const expected = 201;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const actualProject = await res.json();
      assert.ok(actualProject, `Deveria retornar o projeto cadastrado`);
    });
  });
});

async function getToken(
  baseUrl,
  input = { usuario: "silviads", senha: "#senhaSilvia01" }
) {
  const res = await fetch(`${baseUrl}/usuarios/login`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
  const token = await res.json();

  return token;
}
