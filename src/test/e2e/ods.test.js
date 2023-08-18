const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const listaOds = require("../listaOds");
const app = require("../../server");

describe("Dojotech API E2E Test Suite - ODS", () => {
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

  describe("GET /ods", () => {
    it("Deve retornar 200 (OK) e a lista de ODS", async () => {
      const res = await fetch(`${BASE_URL}/ods`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      {
        const expected = 200;
        assert.strictEqual(
          res.status,
          expected,
          `Status deveria ser ${expected}. Retornado: ${res.status}`
        );
      }
      {
        const expected = listaOds;
        const actual = await res.json();
        assert.deepStrictEqual(
          actual,
          expected,
          "Deveria retornar a lista de ODS."
        );
      }
    });
  });
});
