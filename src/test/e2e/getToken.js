async function getToken(
  baseUrl,
  input = { usuario: "silviads", senha: "#senhaSilvia01" }
) {
  const res = await fetch(`${baseUrl}/usuarios/login`, {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });
  const token = await res.json();

  return token;
}

module.exports = getToken;
