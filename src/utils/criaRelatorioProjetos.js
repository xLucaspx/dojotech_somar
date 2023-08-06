function criaCabecalhoRelatorio(totalProjetos) {
  const strData = new Date().toLocaleString("pt-BR", {
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

  let projetos = totalProjetos;
  if (totalProjetos < 10) projetos = "000" + totalProjetos;
  else if (totalProjetos < 100) projetos = "00" + totalProjetos;
  else if (totalProjetos < 1000) projetos = "0" + totalProjetos;

  const arrStrTotal = "- Total de projetos cadastrados".split("");
  let strTotal = "";
  for (let i = 0; i < 60; i++)
    strTotal += arrStrTotal[i] ? arrStrTotal[i] : ".";

  return `# Relatório de projetos do programa Somar
    \n${strData}\n\n${strTotal} ${projetos}
    \n- Total de projetos para cada ODS:\n`;
}

function formataLinhaRelatorio(id, ods, projetos) {
  const strId = id < 10 ? " " + id : id;

  ods = ods.split("");
  let strOds = "";
  for (let i = 0; i < 51; i++) strOds += ods[i] ? ods[i] : ".";

  let strProjetos = projetos;
  if (projetos < 10) strProjetos = "000" + projetos;
  else if (projetos < 100) strProjetos = "00" + projetos;
  else if (projetos < 1000) strProjetos = "0" + projetos;

  return `  - ${strId} - ${strOds} ${strProjetos}\n`;
}

function criaRelatorioProjetos(totalProjetos, dadosOds) {
  let relatorio = criaCabecalhoRelatorio(totalProjetos);

  for (const line of dadosOds)
    relatorio += formataLinhaRelatorio(line.id, line.ods, line.projetos);

  return relatorio;
}

module.exports = criaRelatorioProjetos;
