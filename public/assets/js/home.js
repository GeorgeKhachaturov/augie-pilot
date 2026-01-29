const menu = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');

const OpenMenu = () => {
    navbar.classList.toggle('active')
}

menu.addEventListener('click', OpenMenu);