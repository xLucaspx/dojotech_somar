const express = require("express");
const cors = require("cors");
const routes = require("../routes");

const app = express();
app.use(cors());

const port = 3000;
routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
