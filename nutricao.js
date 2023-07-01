const menuHambu = document.querySelector('.menu-hambu');
const header = document.querySelector('.header-lp');
const links = document.querySelector('.links')

menuHambu.addEventListener('click', () => {
header.classList.toggle('active-header');
links.classList.toggle('active-links');
})


let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function() {
    nextImage();
}, 10000)

function nextImage(){
    count++;
    if(count>5){
        count = 1
    }

    document.getElementById("radio"+count).checked = true;

}