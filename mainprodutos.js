// VARIÁVEL QUE MANTÉM O ESTADO VÍSIVEL DO CARRINHO
var carrinhoVisivel = false;

// ESPERAMOS QUE TODOS OS ELEMENTOS DA PÁGINA SE CARREGUEM PARA CONTINUAR COM O SCRIPT
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else {
    ready();
}

function ready(){
    // ADICIONAREMOS FUNCIONALIDADE AO BOTÃO ELIMINAR DO CARRINHO
    var botoesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botoesEliminarItem.length;i++){
        var botao = botoesEliminarItem[i];
        botao.addEventListener('click', eliminarItemCarrinho);
    }

    // ADICIONAR FUNCIONALIDADE AO BOTÃO DE SOMAR QUANTIDADE
    var botoesSomarQuantidade = document.getElementsByClassName('somar-quantidade');
    for(var i=0; i < botoesSomarQuantidade.length;i++){
        var botao = botoesSomarQuantidade[i];
        botao.addEventListener('click', somarQuantidade);
    }

    // ADICIONAR FUNCIONALIDADE AO BOTÃO DE SUBTRAIR QUANTIDADE
    var botoesSubtrairQuantidade = document.getElementsByClassName('subtrair-quantidade');
    for(var i=0; i < botoesSubtrairQuantidade.length;i++){
        var botao = botoesSubtrairQuantidade[i];
        botao.addEventListener('click', subtrairQuantidade);
    }

    // ADICIONAR FUNÇÃO AOS BOTÕES DE ADICIONAR AO CARRINHO
    var botoesAdicionarAoCarrinho = document.getElementsByClassName('botao-item');
    for(var i=0; i <  botoesAdicionarAoCarrinho.length;i++){
        var botao = botoesAdicionarAoCarrinho[i];
        botao.addEventListener('click', adicionarAoCarrinhoClickado);
    }

    // ADICIONAR FUNCIONALIDADE AO BOTÃO PAGAR
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClickado);
}

// ELIMINAR O ITEM SELECIONADO DO CARRINHO
function eliminarItemCarrinho(event){
    var botaoClickado = event.target;
    botaoClickado.parentElement.parentElement.remove();

    // ATUALIZAREMOS O VALOR TOTAL DO CARRINHO UMA VEZ QUE ELIMINAMOS UM ITEM
    atualizarTotalCarrinho();

    // A SEGUNTE FUNÇÃO CONTROLA SE TEM ELEMENTOS NO CARRINHO UMA VEZ QUE ELIMINO ELES
    // SE NÃO TEM ELEMENTOS DEVO OCULTAR O CARRINHO
    ocultarCarrinho();
}

// ATUALIZAREMOS O TOTAL DO CARRINHO
function atualizarTotalCarrinho(){
    // SELECIONAR O CONTAINER DO CARRINHO
    var carrinhoContainer = document.getElementsByClassName('carrinho')[0];
    var carrinhoItems = carrinhoContainer.getElementsByClassName('carrinho-item')
    var total = 0;

    // RECORREMOS CADA ELEMENTO DO CARRINHO PARA ATUALIZAR O TOTAL
    for(var i=0; i < carrinhoItems.length;i++){
        var item = carrinhoItems[i];
        var precoElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        console.log(precoElemento);
        // REMOVEMOS O SÍMBOLO DO PESO E O MILÉSIMO PONTO
        var preco = parseFloat(precoElemento.innerText.replace('R$', '').replace('.',''));
        console.log(preco);
        var quantidadeItem = item.getElementsByClassName('carrinho-item-quantidade')[0];
        var quantidade = quantidadeItem.value;
        console.log(quantidade);
        total = total + (preco * quantidade);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrinho-preco-total')[0].innerText = 'R$' + total.toLocaleString("pt-br") + ',00';
}

function ocultarCarrinho(){
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    if(carrinhoItems.childElementCount==0){
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity='0';
        carrinhoVisivel = false;

        //  AGORA MAXIMIZA O CONTAINER DOS ELEMENTOS
        var items = document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}

// AUMENTA EM UM A QUANTIDADE DO ELEMENTO SELECIONADO
function somarQuantidade(event){
    var botaoClickado = event.target;
    var seletor = botaoClickado.parentElement;
    var quantidadeAtual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    console.log(quantidadeAtual);
    quantidadeAtual++;
    seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
    // ATUALIZAREMOS O TOTAL
    atualizarTotalCarrinho();
}

function subtrairQuantidade(event){
    var botaoClickado = event.target;
    var seletor = botaoClickado.parentElement;
    var quantidadeAtual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    console.log(quantidadeAtual);
    quantidadeAtual--;

    // CONTROLAMOS QUE NÃO SERÁ MENOR QUE 1
    if(quantidadeAtual>=1){
        seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
        // ATUALIZAREMOS O TOTAL
        atualizarTotalCarrinho();
    }
}

function adicionarAoCarrinhoClickado(event){
    var botao = event.target;
    var item = botao.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var preco = item.getElementsByClassName('preco-item')[0].innerText;
    var imagemSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagemSrc);

    // A PRÓXIMA FUNÇÃO ADICIONA O ELEMENTO NO CARRINHO. EU ENVIO OS VALORES POR PARÂMETROS
    adicionarItemAoCarrinho(titulo, preco, imagemSrc);

    // FAZEMOS O CARRINHO VISIVEL QUANDO ADICIONAMOS UM ITEM PELA PREIMEIRA VEZ
    fazerCarrinhoVisivel();
}

function adicionarItemAoCarrinho(titulo, preco, imagemSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrinho = document.getElementsByClassName('carrinho-items')[0];

    // VAMOS CONTROLAR QUE O ELEMENTO QUE ESTA ESTRANDO NÃO SE ENCONTRA NO CARRINHO
    var nomesItemsCarrinho = itemsCarrinho.getElementsByClassName('carrinho-item-titulo');
    for(var i=0; i < nomesItemsCarrinho.length;i++){
        if(nomesItemsCarrinho[i].innerText==titulo){
            alert("O item já se encontra em seu carrinho");
            return;
        }
    } 

    var itemCarrinhoContido = `
    <div class="carrinho-item">
        <img src="${imagemSrc}" alt="" width="80px">
        <div class="carrinho-item-detalhes">
            <span class="carrinho-item-titulo">${titulo}</span>
            <div class="selecionar-quantidade">
                <i class="fa-solid fa-minus subtrair-quantidade"></i>
                <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                <i class="fa-solid fa-plus somar-quantidade"></i>
            </div>
            <span class="carrinho-item-preco">${preco}</span>
        </div>
        <span class="btn-eliminar">
            <i class="fa-solid fa-trash"></i>
        </span>
    </div>
    `
    item.innerHTML = itemCarrinhoContido;
    itemsCarrinho.append(item);

    // ADICIONAMOS A FUNÇÃO ELIMINAR NOVAMENTE
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrinho);

    // ADICIONAMOS A FUNÇÃO DE SOMAR NOVAMENTE
    var botaoSomarQuantidade = item.getElementsByClassName('somar-quantidade')[0];
    botaoSomarQuantidade.addEventListener('click', somarQuantidade);
    
    // ADICIONAMOS A FUNÇÃO DE SUBTRAIR NOVAMENTE
    var botaoSubtrairQuantidade = item.getElementsByClassName('subtrair-quantidade')[0];
    botaoSubtrairQuantidade.addEventListener('click', subtrairQuantidade);
}

function pagarClickado(event){
    alert("Agradeçemos a sua compra");
    // ELIMINAR TODOS ELEMENTOS DO CARRINHO
    var carrinhoItems = document.getElementsByClassName('carrinho-items')[0];
    while(carrinhoItems.hasChildNodes()){
        carrinhoItems.removeChild(carrinhoItems.firstChild);
    }
    atualizarTotalCarrinho();

    // FUNÇÃO QUE OCULTA O CARRINHO
    ocultarCarrinho();
}

function fazerCarrinhoVisivel(){
    carrinhoVisivel = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var items = document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

// FUNÇÕES DO HEADER

const menuHambu = document.querySelector('.menu-hambu');
const header = document.querySelector('.header-lp');
const links = document.querySelector('.links')

menuHambu.addEventListener('click', () => {
header.classList.toggle('active-header');
links.classList.toggle('active-links');
})