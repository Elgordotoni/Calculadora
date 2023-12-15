document.addEventListener("DOMContentLoaded", () => {
  // variables de captura
  const montoInput = document.getElementById("monto");
  const porcentajeInput = document.getElementById("porcentaje");
  const cuotasInput = document.getElementById("cuotas");
  const topeInput = document.getElementById("tope");
  const valorError = document.getElementById("valorError");
  const primeResultDiv = document.getElementById("primeResult");
  const restResultsDiv = document.getElementById("restResults");




  function calcularCuotas(numero, descuento, cuota, tope) {
    /* validaciones */

    if (numero === undefined) {
      return valorError.textContent = "Ingresa un número válido";
    }
    if (typeof (numero) !== "number") {
      return valorError.textContent = "Valor ingresado no es un numero";
    }
    if (Math.sign(numero) === -1) {
      return valorError.textContent = "Ingresaste un valor negativo";
    }
    if (typeof (descuento) !== "number") {
      return console.error("el valor ingresado no es un numero");
    }
    if (Math.sign(descuento) === -1) {
      return valorError.textContent = "Ingresaste un valor negativo";
    }
    if (cuota > 6) { // Cambiando la condición a cuota > 4
      return montoError.textContent = "El descuento es hasta en 6 cuotas";
    }
    if (typeof (cuota) !== "number") {
      return valorError.textContent = "Valor ingresado no es un numero";
    }
    if (Math.sign(cuota) === -1) {
      return valorError.textContent = "Ingresaste un valor negativo";
    }
    if (typeof (tope) !== "number") {
      return valorError.textContent = "el valor ingresado no es un numero";
    }
    if (Math.sign(tope) === -1) {
      return valorError.textContent = "Ingresaste un valor negativo";
    }

    /* lógica */
    let division = numero / cuota;
    console.info(DIVISION = `${division}`);
    let desCuento = numero / 100 * descuento;
    console.info(DESCUENTO = `${desCuento}`);
    let cuotaConDescuento = division - desCuento;
    console.info(EXCEDECUOTA = `${cuotaConDescuento}`);
    let topeExcedeCuota = division - tope;
    console.info(TOPEEXCEDECUOTA = `${topeExcedeCuota}`);

    function formatearNumero(numero) {
      return Math.abs(numero).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // lógica sin tope de reintegro.

    if (Math.sign(cuotaConDescuento) === -1) {
      primeResultDiv.textContent = `primera cuota = bonificación de $${formatearNumero(
        cuotaConDescuento
      )}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`;
    } else {
      primeResultDiv.textContent = `primera cuota de = $${formatearNumero(cuotaConDescuento)}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`;
    }






    //logica con tope de reintegro. 

    //Descuento mayor al tope y excede a la cuota.   1
    if (desCuento > tope && Math.sign(topeExcedeCuota) === -1) {
      primeResultDiv.textContent = `primera cuota = bonificación de $${formatearNumero(
        topeExcedeCuota
      )}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`
    }






    //Descuento menor al tope y excede a la cuota.     2
    else if (desCuento < tope && cuotaConDescuento < division && Math.sign(cuotaConDescuento) === -1) {
      primeResultDiv.textContent = `primera cuota = bonificación de $${formatearNumero(
        cuotaConDescuento
      )}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`
    }






    //Descuento mayor al tope y menor a la cuota.     3
    else if (desCuento > tope) {
      primeResultDiv.textContent = `primera cuota de = $${formatearNumero(
        topeExcedeCuota
      )}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`
    }




    // Descuento menor al tope y menor a la cuota.      4
    else if (desCuento > tope) {
      primeResultDiv.textContent = `primera cuota de = $${formatearNumero(
        cuotaConDescuento
      )}`;
      restResultsDiv.textContent = `resto ${cuota - 1} cuotas de = $${formatearNumero(division)}`
    }

  }



  //actualiza los resultados ingresados en el input llamando dentro la función calcular cuotas e igualando a variables.
  function actualizarResultados() {
    const numero = parseFloat(montoInput.value);
    const descuento = parseFloat(porcentajeInput.value);
    const cuota = parseFloat(cuotasInput.value);
    const tope = parseFloat(topeInput.value);

    calcularCuotas(numero, descuento, cuota, tope);
  }


  // evento input ejecuta valor ingresado como parámetro de la función actualizarResultados
  montoInput.addEventListener("input", actualizarResultados);
  porcentajeInput.addEventListener("input", actualizarResultados);
  cuotasInput.addEventListener("input", actualizarResultados);
  topeInput.addEventListener("input", actualizarResultados);
});
