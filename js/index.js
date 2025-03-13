let hamb = document.querySelector('.header__hamb');
let navMobile = document.querySelector('.nav-mobile');
let lUno = document.querySelector('.linea-uno');
let lDos = document.querySelector('.linea-dos');

//abrir menu hamburguesa
hamb.addEventListener("click", function (e) {
      lUno.classList.toggle('rotar-u');
      lDos.classList.toggle('rotar-d');
      navMobile.classList.toggle('esconder');
});


//mostrar header con scroll
const header = document.getElementById("header");
let lastScrollTop = 0;
let scrolledDownThreshold = 0; // Guarda cuánto ha bajado el usuario
const threshold = 90; // Límite de 80px

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    scrolledDownThreshold += currentScroll - lastScrollTop;
    if (lastScrollTop > threshold) {
      header.classList.add("ocultar-header");

            //me fijo si esta abierto el menu y lo cierro
            const div = document.querySelector(".nav-mobile.mobile");
            if (div && !div.classList.contains("esconder")) {
                  div.classList.add('esconder');
                  lUno.classList.remove('rotar-u');
                  lDos.classList.remove('rotar-d');
            } 
    }
  } else {
    // Scrolling up
    if (lastScrollTop > threshold) {
      header.classList.remove("ocultar-header");
    }
  }

  lastScrollTop = currentScroll;

});




//Oberve de instagram
const imgIg = document.getElementById("img-ig");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imgIg.classList.add("visible");
    } else {
      imgIg.classList.remove("visible");
    }
  });
});

observer.observe(imgIg);