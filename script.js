function calcularImc() {
    const peso = window.document.getElementById("peso").value;
    const altura = window.document.getElementById("altura").value;
    const alturacm = altura / 100;
    const imc = peso / (alturacm ** 2);
    document.getElementById("resultado").textContent = imc.toFixed(2);
    if (imc < 18.5) {
        document.getElementById("result").textContent = "Abaixo do peso";
    }
    else if (imc >= 18.5 && imc <= 24.9) {
        document.getElementById("result").textContent = "Peso ideal (Parabéns)";
    }
    else if (imc > 24.9 && imc <= 29.9) {
        document.getElementById("result").textContent = "Levemente acima do peso";
    }
    else if (imc > 29.9 && imc <= 34.9) {
        document.getElementById("result").textContent = "Obesidade grau I";
    }
    else if (imc > 34.9 && imc <= 39.9) {
        document.getElementById("result").textContent = "Obesidade grau II (Severa)";
    }
    else {
        document.getElementById("result").textContent = "Obesidade grau III (Mórbida)";
    }
}

const menuHambu = document.querySelector('.menu-hambu');
const header = document.querySelector('.header-lp');
const links = document.querySelector('.links')

menuHambu.addEventListener('click', () => {
header.classList.toggle('active-header');
links.classList.toggle('active-links');
})

AOS.init();