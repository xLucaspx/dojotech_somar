import { OdsController } from "./controller/OdsController.js";
import { ProjetoController } from "./controller/ProjetoController.js";
import { UsuarioController } from "./controller/UsuarioController.js";

console.log("início teste");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6IlPDrWx2aWEgRGlhcyIsImlhdCI6MTY5MjEyMTc0OSwiZXhwIjoxNjkyMTQzMzQ5fQ.eqOt-6f-F28IQVjXUOwMgeJTlbr8q_Gmy708ZcqzuUg";

const odsController = new OdsController();
const ods = await odsController.buscaDados();
console.log({ ods });

const projetoController = new ProjetoController();
const projetos = await projetoController.buscaDados(token);
const projetoId = await projetoController.buscaPorId(6, token);
console.log({ projetos });
console.log({ projetoId });

const usuarioController = new UsuarioController();
const usuarios = await usuarioController.buscaDados();
const usuarioId1 = await usuarioController.buscaPorId(1, token);
const usuarioId2 = await usuarioController.buscaPorId(2, token);
console.log({ usuarios });
console.log({ usuarioId1 });
console.log({ usuarioId2 });
