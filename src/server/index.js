const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("../routes");

// dotenv is being imported in the config.js file

const app = express();
const port = 3000;

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: /[/\\^$*+?.()|[\]{}]/g,
    preserveExtension: 4,
  })
);

routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
