const Router = require("express");
const OdsController = require("../controller/OdsController");

const router = Router();

router.get("/ods", OdsController.buscaOds);

module.exports = router;
