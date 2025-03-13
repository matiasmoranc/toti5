"use strict";

//accountNumber
async function get_account_number() {
  const url = window.location.search;
  const urlParams = new URLSearchParams(url);
  const account_number = urlParams.get('accountNumber');

  if (account_number) {
    return account_number;
  } else {
    const logged = localStorage.getItem('customerId');

    if (logged) {
      return JSON.parse(logged).value;
    } else {
      return false;
    }
  }
} //lang


function getLang() {
  return getCookie('LANG');
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function getCookieVariant(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length).split('|'); //Retorna array
    }
  }

  return false;
} //country


function getCntry() {
  const variant = getCookieVariant('variant');

  if (variant) {
    for (let i = 0; i < variant.length; i++) {
      if (variant[i].split(':')[0] == 'cntry') {
        return variant[i].split('cntry:')[1];
      }
    }
  }
} // LoggedIn ?


function userLoggedIn() {
  const sessionId = localStorage.getItem('sessionId');

  if (sessionId) {
    const json_sid = JSON.parse(sessionId);
    const sid = json_sid?.value;
    return sid;
  } else {
    return false;
  }
}

async function participandoPromo(ac, productoId) {
  return await apiFetchJSON('https://respondabodog.com/optin/ac/' + ac + '/' + productoId);
} //fetchs


async function apiFetchJSON(url) {
  const response = await fetch(url);

  if (response.status == 200) {
    const json = await response.json();
    return json;
  } else {
    console.error(response);
    return false;
  }
} //estados cta


function mostrarEstado(estado) {
  const preload = document.querySelectorAll('.optin .preload');
  const login = document.querySelectorAll('.optin .login');
  const participar = document.querySelectorAll('.optin .participar');
  const participando = document.querySelectorAll('.optin .participando');

  if (preload && login && participar && participando) {
    //recorro por si hay mas de un cta
    for (let i = 0; i < login.length; i++) {
      preload[i]?.classList.add('hide');
      participar[i]?.classList.add('hide');
      participando[i]?.classList.add('hide');
      login[i]?.classList.add('hide');

      switch (estado) {
        case 'login':
          login[i]?.classList.remove('hide');
          break;

        case 'preload':
          preload[i]?.classList.remove('hide');
          break;

        case 'participar':
          participar[i]?.classList.remove('hide');
          break;

        case 'participando':
          participando[i]?.classList.remove('hide');
          break;
      }
    }
  }
}

let contadorPreaload = 0;

function verEstadoPreload() {
  const interval = setInterval(() => {
    contadorPreaload++; //despues de los 30seg me fijo si esta oculto el preload

    if (contadorPreaload >= 30) {
      //si esta oculto corto el setInterval
      if (document.querySelector('.preload.hide')) {
        clearInterval(interval);
      } else {
        // si no esta oculto, recargo el boton y reinicio el contador
        bodogOptin();
        contadorPreaload = 0;
      }
    }
  }, 1000);
}

async function bodogOptin() {
  mostrarEstado('preload');
  const userLogin = userLoggedIn(); //me fijo si el usuario esta logueado

  if (userLogin) {
    mostrarCtaSecundarios();
    const ac = await get_account_number();
    const productoId = document.querySelector('.optin')?.dataset.id;

    if (productoId) {
      const participa = await participandoPromo(ac, productoId); //me fijo si esta participando de la promo

      if (participa.length == 1) {
        mostrarEstado('participando');
      } else {
        //si no participa
        mostrarEstado('participar');
      }
    }
  } else {
    //si no esta logueado
    ocultarCtaSecundarios();
    mostrarEstado('login');
  }
}

function ocultarCtaSecundarios() {
  const ctas = document.querySelectorAll('.secundario-optin');

  if (ctas[0]) {
    ctas.forEach(cta => {
      cta.style.opacity = '0';
    });
  }
}

function mostrarCtaSecundarios() {
  const ctas = document.querySelectorAll('.secundario-optin');

  if (ctas[0]) {
    ctas.forEach(cta => {
      cta.style.opacity = '1';
    });
  }
}

function iniciarSesion() {
  mostrarEstado('preload');
  verEstadoPreload();
  document.getElementById('headerUnloggedLogin')?.click();
  const recargar = setInterval(() => {
    const login = userLoggedIn();

    if (login) {
      bodogOptin();
      clearInterval(recargar);
    }
  }, 500);
}

async function agregarUsuario() {
  mostrarEstado('preload');
  const data = new FormData();
  const ac = await get_account_number();
  const idPromo = document.querySelector('.optin')?.dataset.id;
  const namePromo = document.querySelector('.optin')?.dataset.name;
  const productPromo = document.querySelector('.optin')?.dataset.product;
  const country = getCntry();
  const lang = getLang();

  if (idPromo && ac && namePromo && country && productPromo) {
    data.append('ac', ac);
    data.append('idPromo', idPromo);
    data.append('namePromo', namePromo);
    data.append('productPromo', productPromo);
    data.append('country', country);
    data.append('lang', lang);
    const res = await fetch('https://respondabodog.com/optin/add', {
      method: 'POST',
      body: data
    });
    const json = await res.text();
    bodogOptin();
    return json;
  } else {
    console.log('Faltan datos en el html en: data-id o data-name o data-product');
  }
}

bodogOptin();