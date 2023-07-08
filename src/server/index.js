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
    limits: {
      files: 6,
      fileSize: 100000000, // 100 MB
    },
  })
);

routes(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
