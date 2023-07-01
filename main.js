// FUNÇÕES DO HEADER

const menuHambu = document.querySelector('.menu-hambu');
const header = document.querySelector('.header-lp');
const links = document.querySelector('.links')

menuHambu.addEventListener('click', () => {
header.classList.toggle('active-header');
links.classList.toggle('active-links');
})