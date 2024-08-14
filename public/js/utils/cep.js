async function buscaCep(cep) {
	const url = `https://viacep.com.br/ws/${cep}/json/`;
	const options = {
		method: "GET",
		mode: "cors",
		headers: { "content-type": "application/json;charset=utf-8" },
	};

	const res = await fetch(url, options);
	const dados = await res.json();

	if (dados.erro) {
		throw new Error("Não foi possível buscar o CEP");
	}
	return dados;
}

function preencheCamposCep(dados) {
	const logradouro = document.getElementById("cadastro_usuario__logradouro");
	const bairro = document.getElementById("cadastro_usuario__bairro");
	const cidade = document.getElementById("cadastro_usuario__cidade");
	const uf = document.getElementById("cadastro_usuario__uf");

	logradouro.value = dados.logradouro;
	bairro.value = dados.bairro;
	cidade.value = dados.localidade;
	uf.value = dados.uf;
}

export { buscaCep, preencheCamposCep };
