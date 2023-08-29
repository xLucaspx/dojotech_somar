const { describe, it } = require("node:test");
const assert = require("node:assert");
const criaRelatorioProjetos = require("../../utils/criaRelatorioProjetos");
const listaOds = require("../listaOds");

describe("Dojotech API Unit Test Suite - Relatório de Projetos", () => {
  it("Deve gerar corretamente o relatório de projetos com as informações passadas", () => {
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 0000
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(0, []).replace(/\s/g, "");

      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 0005
        - Total de projetos para cada ODS:
        -  1 - Erradicação da Pobreza............................. 0005
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(5, [
        {
          id: listaOds[0].id,
          ods: listaOds[0].nome,
          projetos: 5,
        },
      ]).replace(/\s/g, "");
      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 0018
        - Total de projetos para cada ODS:
        -  1 - Erradicação da Pobreza............................. 0005
        -  2 - Fome Zero e Agricultura Sustentável................ 0010
        - 11 - Cidades e Comunidades Sustentáveis................. 0008
        - 15 - Vida Terrestre..................................... 0006
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(18, [
        { id: listaOds[0].id, ods: listaOds[0].nome, projetos: 5 },
        { id: listaOds[1].id, ods: listaOds[1].nome, projetos: 10 },
        { id: listaOds[10].id, ods: listaOds[10].nome, projetos: 8 },
        { id: listaOds[14].id, ods: listaOds[14].nome, projetos: 6 },
      ]).replace(/\s/g, "");
      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 0175
        - Total de projetos para cada ODS:
        -  1 - Erradicação da Pobreza............................. 0027
        -  2 - Fome Zero e Agricultura Sustentável................ 0032
        -  4 - Educação de Qualidade.............................. 0046
        - 10 - Redução das Desigualdades.......................... 0029
        - 11 - Cidades e Comunidades Sustentáveis................. 0108
        - 15 - Vida Terrestre..................................... 0106
        - 17 - Parcerias e Meios de Implementação................. 0125
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(175, [
        { id: listaOds[0].id, ods: listaOds[0].nome, projetos: 27 },
        { id: listaOds[1].id, ods: listaOds[1].nome, projetos: 32 },
        { id: listaOds[3].id, ods: listaOds[3].nome, projetos: 46 },
        { id: listaOds[9].id, ods: listaOds[9].nome, projetos: 29 },
        { id: listaOds[10].id, ods: listaOds[10].nome, projetos: 108 },
        { id: listaOds[14].id, ods: listaOds[14].nome, projetos: 106 },
        { id: listaOds[16].id, ods: listaOds[16].nome, projetos: 125 },
      ]).replace(/\s/g, "");
      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 3975
        - Total de projetos para cada ODS:
        -  1 - Erradicação da Pobreza............................. 1027
        -  2 - Fome Zero e Agricultura Sustentável................ 0100
        -  4 - Educação de Qualidade.............................. 0010
        - 10 - Redução das Desigualdades.......................... 0001
        - 11 - Cidades e Comunidades Sustentáveis................. 1000
        - 15 - Vida Terrestre..................................... 2375
        - 17 - Parcerias e Meios de Implementação................. 1234
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(3975, [
        { id: listaOds[0].id, ods: listaOds[0].nome, projetos: 1027 },
        { id: listaOds[1].id, ods: listaOds[1].nome, projetos: 100 },
        { id: listaOds[3].id, ods: listaOds[3].nome, projetos: 10 },
        { id: listaOds[9].id, ods: listaOds[9].nome, projetos: 1 },
        { id: listaOds[10].id, ods: listaOds[10].nome, projetos: 1000 },
        { id: listaOds[14].id, ods: listaOds[14].nome, projetos: 2375 },
        { id: listaOds[16].id, ods: listaOds[16].nome, projetos: 1234 },
      ]).replace(/\s/g, "");
      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
    {
      const strData = getStringData();
      const expected = `
        # Relatório de projetos do programa Somar${strData}
        - Total de projetos cadastrados............................. 23422
        - Total de projetos para cada ODS:
        -  1 - Erradicação da Pobreza............................. 10273
        -  2 - Fome Zero e Agricultura Sustentável................ 0105
        -  4 - Educação de Qualidade.............................. 0015
        - 10 - Redução das Desigualdades.......................... 0007
        - 11 - Cidades e Comunidades Sustentáveis................. 16763
        - 15 - Vida Terrestre..................................... 11298
        - 17 - Parcerias e Meios de Implementação................. 1234
      `.replace(/\s/g, "");

      const actual = criaRelatorioProjetos(23422, [
        { id: listaOds[0].id, ods: listaOds[0].nome, projetos: 10273 },
        { id: listaOds[1].id, ods: listaOds[1].nome, projetos: 105 },
        { id: listaOds[3].id, ods: listaOds[3].nome, projetos: 15 },
        { id: listaOds[9].id, ods: listaOds[9].nome, projetos: 7 },
        { id: listaOds[10].id, ods: listaOds[10].nome, projetos: 16763 },
        { id: listaOds[14].id, ods: listaOds[14].nome, projetos: 11298 },
        { id: listaOds[16].id, ods: listaOds[16].nome, projetos: 1234 },
      ]).replace(/\s/g, "");
      assert.deepEqual(
        actual,
        expected,
        `Deveria retornar: ${expected}\nRetornado: ${actual}`
      );
    }
  });
});

function getStringData() {
  return new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    hourCycle: "h24",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
