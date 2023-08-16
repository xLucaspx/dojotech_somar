import { OdsController } from "./controller/OdsController.js";
import { ProjetoController } from "./controller/ProjetoController.js";
import { UsuarioController } from "./controller/UsuarioController.js";

console.log("início teste");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibm9tZSI6Ikx1Y2FzIE9saXZlaXJhIiwiaWF0IjoxNjkyMTkxODA4LCJleHAiOjE2OTIyMTM0MDh9.qfuyIrpnmJh-CreFdLJCmyQYXmmeDieBA2p-pdHrY8k";

const tokenL3 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODMsIm5vbWUiOiJMdWNhcyBUZXJjZWlybyIsImlhdCI6MTY5MjE5MzMzMiwiZXhwIjoxNjkyMjE0OTMyfQ.PRUUhm0JkescTGtqptG4PUr-PWjzA9uA7109IgzQZWA";

const odsController = new OdsController();
const ods = await odsController.buscaDados();
console.log({ ods });

const projetoController = new ProjetoController();
const projetos = await projetoController.buscaDados(token);
const projetoId = await projetoController.buscaPorId(36, token);
console.log({ projetos });
console.log({ projetoId });

const usuarioController = new UsuarioController();
const usuarios = await usuarioController.buscaDados(token);
// const usuarioId1 = await usuarioController.buscaPorId(1, token);
const usuarioId2 = await usuarioController.buscaPorId(3, token);
console.log({ usuarios });
console.log({ usuarioId2 });

// const postOds = await odsController.cadastra({
//   id: 18,
//   nome: "ods nova",
//   url_imagem: "hahahaha",
// });
// console.log({ postOds });

// const postProject = await projetoController.cadastra(
//   {
//     projeto: {
//       nome: "Teste Cadastro",
//       causa: "Testar cadastro com Fetch",
//       objetivo: "Testar cadastro pelo front-end",
//       cidade: "Porto Alegre - RS",
//       publico_alvo: "Todos",
//       parceiros: "",
//       resumo: "Lorem ipsum dolor sit amet, consecteur!",
//       id_usuario: 3,
//     },
//     ods: [2, 5],
//   },
//   token
// );
// console.log({ postProject });

// const postUser = await usuarioController.cadastra({
//   bairro: "Ponta Grossa",
//   cep: "12345789",
//   cidade: "Porto Alegre",
//   email: "lucas3@email.com",
//   logradouro: "Rua A",
//   nome: "Lucas Terceiro",
//   telefone: "5133446788",
//   uf: "RS",
//   usuario: "Lucaspx-3",
//   senha: "#senhaLucas01",
//   resumo: "Lorem ipsum dolor sit amet, consecteur!",
// });
// console.log({ postUser });

// const updateProject = await projetoController.atualiza(
//   {
//     projeto: {
//       nome: "Teste Cadastro Atualizado",
//       causa: "Testar atualização com Fetch",
//       objetivo: "Testar atualização pelo front-end",
//     },
//     ods: [2, 5, 7],
//   },
//   36,
//   token
// );
// console.log({ updateProject });

// const updateUser = await usuarioController.atualiza(
//   {
//     nome: "Lucas Terceiro",
//     numero: "53 A",
//   },
//   83,
//   tokenL3
// );
// console.log({ updateUser });

const deleteProject = await projetoController.deleta(36, token);
console.log(deleteProject);
