const { describe, it, before, after } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");
const getToken = require("./getToken");
const app = require("../../server");

describe("Dojotech API E2E Test Suite - Projetos", () => {
  let BASE_URL = "";
  let _server = {};

  before(async () => {
    if (process.env.NODE_ENV !== "test")
      throw new Error(
        "É preciso estar no ambiente de testes para realizar os teste E2E!"
      );

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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Não é possível gerar um relatório de projetos sem um token de autorização!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
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
        path.join(__dirname, "../../../public/report/relatorio-projetos.txt")
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "O filtro selecionado é inválido!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Não é possível listar projetos de um usuário sem um token de autorização!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
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

      {
        const expected = 401;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível listar projetos de outros usuários!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
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

      {
        const expected = 404;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = { error: "Projeto não encontrado!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
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
          id: 4,
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Não é possível cadastrar um projeto sem um token de autorização!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto com informações faltando", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 4,
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Por favor, verifique se os campos estão preenchidos corretamente!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto sem ODS", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 4,
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível cadastrar um projeto sem nenhum ODS!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 400 (bad request) ao tentar cadastrar um projeto sem id de usuário", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 4,
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

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível cadastrar um projeto sem id de usuário!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 401 (unauthorized) ao tentar cadastrar um projeto com id de outro usuário", async () => {
      const token = await getToken(BASE_URL); // id: 2

      const input = {
        projeto: {
          id: 4,
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

      {
        const expected = 401;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível cadastrar um projeto para outros usuários!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 201 (created) e o projeto criado", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 4,
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

  describe("PUT /projetos/:id", () => {
    it("Deve retornar 400 (bad request) ao tentar editar um projeto sem token de autorização", async () => {
      const input = {
        projeto: {
          nome: "Projeto Teste Atualizado",
          objetivo: "Testar o cadastro e a edição de projetos",
          parceiros: "Node.js core test runner, c8",
          resumo: "Lorem ipsum dolor sit amet!",
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Não é possível editar um projeto sem um token de autorização!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 400 (bad request) ao tentar remover informações do projeto", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          nome: "",
          objetivo: "",
          resumo: "",
          id_usuario: "",
        },
        ods: [1],
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Por favor, verifique se os campos estão preenchidos corretamente!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 400 (bad request) ao tentar editar um projeto sem ODS", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          nome: "Projeto Teste Atualizado",
          objetivo: "Testar o cadastro e a edição de projetos",
          parceiros: "Node.js core test runner, c8",
          resumo: "Lorem ipsum dolor sit amet!",
        },
        ods: "",
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível editar um projeto sem nenhum ODS!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 409 (conflict) ao tentar editar o id de um projeto", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          id: 15,
          nome: "Projeto Teste Atualizado",
          objetivo: "Testar o cadastro e a edição de projetos",
          parceiros: "Node.js core test runner, c8",
          resumo: "Lorem ipsum dolor sit amet!",
        },
        ods: [1, 2],
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = { error: "Não é possível editar o id de um projeto!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 409 (conflict) ao tentar editar o id de usuário de um projeto", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          nome: "Projeto Teste Atualizado",
          objetivo: "Testar o cadastro e a edição de projetos",
          parceiros: "Node.js core test runner, c8",
          resumo: "Lorem ipsum dolor sit amet!",
          id_usuario: 1,
        },
        ods: [1, 2],
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 409;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível editar o usuário de um projeto!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 200 (OK) e o projeto editado", async () => {
      const token = await getToken(BASE_URL);

      const input = {
        projeto: {
          nome: "Projeto Teste Atualizado",
          objetivo: "Testar o cadastro e a edição de projetos",
          parceiros: "Node.js core test runner, c8",
          resumo: "Lorem ipsum dolor sit amet!",
        },
        ods: [4, 8, 9, 17],
      };

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      const expected = 200;
      assert.strictEqual(
        res.status,
        expected,
        `Status deveria ser ${expected}. Retornado: ${res.status}`
      );

      const actualProject = await res.json();
      assert.ok(actualProject, `Deveria retornar o projeto editado`);
    });
  });

  describe("DELETE /projetos/:id", () => {
    it("Deve retornar 400 (bad request) ao tentar excluir um projeto sem token de autorização", async () => {
      const res = await fetch(`${BASE_URL}/projetos/4`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 400;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error:
            "Não é possível excluir um projeto sem um token de autorização!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 401 (unauthorized) ao tentar excluir um projeto de outro usuário", async () => {
      const token = await getToken(BASE_URL, {
        usuario: "juca_s",
        senha: "#senhaJuca01",
      }); // id: 1

      const res = await fetch(`${BASE_URL}/projetos/4`, {
        // usuario_id: 2
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 401;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = {
          error: "Não é possível excluir o projeto de outro usuário!",
        };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 404 (not found) ao tentar excluir um projeto inexistente", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/projetos/45`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      {
        const expected = 404;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = { error: "Projeto não encontrado!" };
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          `Deveria retornar "${expected.error}". Retornado: "${actual.error}"`
        );
      }
    });

    it("Deve retornar 204 (no content) ao excluir um projeto com sucesso", async () => {
      const token = await getToken(BASE_URL);

      const res = await fetch(`${BASE_URL}/projetos/4`, {
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
