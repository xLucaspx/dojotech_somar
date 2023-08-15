import { OdsController } from "./controller/OdsController.js";
import { ProjetoController } from "./controller/ProjetoController.js";
import { UsuarioController } from "./controller/UsuarioController.js";

console.log("início teste");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibm9tZSI6Ikx1Y2FzIE9saXZlaXJhIiwiaWF0IjoxNjkyMTA3NjkzLCJleHAiOjE2OTIxMjkyOTN9.X3LVs2gt2c3y5-gPHqP71Vru1RsFav1NKPps0HKvpIQ";

const odsController = new OdsController();
const ods = await odsController.buscaDados();
console.log({ ods });

const projetoController = new ProjetoController();
const projetos = await projetoController.buscaDados();
const projetoId = await projetoController.buscaPorId(19);
console.log({ projetos });
console.log({ projetoId });

const usuarioController = new UsuarioController();
const usuarios = await usuarioController.buscaDados(token);
const usuarioId = await usuarioController.buscaPorId(1);
console.log({ usuarios });
console.log({ usuarioId });
