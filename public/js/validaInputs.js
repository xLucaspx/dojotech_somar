import { validaInput } from "./utils/input.js";

(() => {
  const inputs = document.querySelectorAll(".form__texto");

  inputs.forEach(
    (input) =>
      (input.onchange = async (evento) => await validaInput(evento.target))
  );
})();
