"use strict";

//*** ESTRUCTURA BASICA HTML ***/
// <div class="cuenta-atras">
//     <p id="mostrar_hora">
//         <span id="dias"></span>:<span id="horas"></span>:<span id="minutos"></span>:<span id="segundos"></span>
//     </p>
// </div>
//ccuenta regresiva 
function cuentaRegFun() {
  //*** poner fecha de comienzo del evento ***
  const fecha_evento = new Date('Oct 17 2022 18:30:00 GMT-03:00');
  const dias = document.getElementById('dias');
  const horas = document.getElementById('horas');
  const minutos = document.getElementById('minutos');
  const segundos = document.getElementById('segundos'); //calcular mili segundos

  const mili_segundos_segundo = 1000;
  const mili_segundos_minuto = mili_segundos_segundo * 60;
  const mili_segundos_hora = mili_segundos_minuto * 60;
  const mili_segundos_dia = mili_segundos_hora * 24;
  const cuentaReg = setInterval(() => {
    actualizarCuentaAtras();
  }, mili_segundos_segundo);

  function actualizarCuentaAtras() {
    const hoy = new Date();
    const duracion = fecha_evento - hoy;
    const restante_dias = Math.floor(duracion / mili_segundos_dia);
    const restante_horas = Math.floor(duracion % mili_segundos_dia / mili_segundos_hora);
    const restante_minutos = Math.floor(duracion % mili_segundos_hora / mili_segundos_minuto);
    const restante_segundos = Math.floor(duracion % mili_segundos_minuto / mili_segundos_segundo); // mostrar cuenta atras en pantalla

    if (dias && horas && minutos && segundos) {
      dias.textContent = restante_dias.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      ;
      horas.textContent = restante_horas.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      minutos.textContent = restante_minutos.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
      segundos.textContent = restante_segundos.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
    }

    if (restante_dias <= 0 && restante_horas <= 0 && restante_minutos <= 0 && restante_segundos <= 0) {
      //******* PONER ACA LO QUE QUEREMOS QUE HAGA CUANDO TERMINE LA CUENTA REGRESIVA **************
      // Ocultar contador al iniciar evento 
      //************************************/
      // const contador: HTMLStyleElement | null = document.querySelector('.cuenta-atras');
      // if ( contador ) {
      //     contador.classList.add('optin_hide');
      // }
      clearInterval(cuentaReg);
    }
  }

  actualizarCuentaAtras();
}