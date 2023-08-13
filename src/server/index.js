const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("../routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: /[/\\^$*+?.()|[\]{}]/g,
    preserveExtension: 4,
    limits: {
      files: 6,
      fileSize: 16500000, // 16.5 MB
    },
    // uploadTimeout: 10000, // 10 seg. (não testado)
  })
);

routes(app);

module.exports = app;
