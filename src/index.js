const app = require("./server");

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test")
	app.listen(port, () =>
		console.log(`Servidor rodando em http://localhost:${port}`)
	);
