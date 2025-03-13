"use strict";

//******** MOVER FLECHAS CAROUSEL *****************
function moverCarousel(id, direction) {
  var distance = document.getElementById(id)?.clientWidth;
  var carouselsh = document.getElementById(id);

  if (carouselsh && distance) {
    var maxScroll = carouselsh.scrollWidth - carouselsh.clientWidth;
    var cantCards = carouselsh.children.length;

    switch (direction) {
      case 'left':
        carouselsh.scrollTo({
          left: carouselsh.scrollLeft - distance,
          behavior: 'smooth'
        });

        if (carouselsh.scrollLeft - distance == 0 || carouselsh.scrollLeft == 0 || carouselsh.scrollLeft < distance / 2) {
          carouselsh.parentElement.children[1].children[0].style.opacity = '.2';
          carouselsh.parentElement.children[1].children[1].style.opacity = '.7';
        } else {
          carouselsh.parentElement.children[1].children[0].style.opacity = '.7';
          carouselsh.parentElement.children[1].children[1].style.opacity = '.7';
        }

        break;

      case 'right':
        carouselsh.scrollTo({
          left: carouselsh.scrollLeft + distance,
          behavior: 'smooth'
        });

        if (carouselsh.scrollLeft + distance >= maxScroll) {
          carouselsh.parentElement.children[1].children[1].style.opacity = '.2';
          carouselsh.parentElement.children[1].children[0].style.opacity = '.7';
        } else {
          carouselsh.parentElement.children[1].children[1].style.opacity = '.7';
          carouselsh.parentElement.children[1].children[0].style.opacity = '.7';
        }

        break;

      default:
        break;
    }
  }
}