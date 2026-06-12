const programas = [

{
nome:"Crédito Rural",
imagem:"img/credito-rural.png"
},

{
nome:"Fomento Rural",
imagem:"img/fomento-rural.png"
},

{
nome:"Raízes Cearenses",
imagem:"img/raizes-cearenses.png"
},

{
nome:"TercIA",
imagem:"img/tercia.png"
},

{
nome:"Turismo Rural",
imagem:"img/turismo-rural.png"
},

{
nome:"CITAF+",
imagem:"img/citaf.png"
},

{
nome:"+Ater Ceará",
imagem:"img/ater-ceara.png"
},

{
nome:"Cotonicultura",
imagem:"img/cotonicultura.png"
}


];
const somAcerto = new Audio("sons/acerto.mp3");
const somErro = new Audio("sons/erro.mp3");
const somVitoria = new Audio("sons/vitoria.mp3");

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;

let jogadas = 0;
let pares = 0;

let segundos = 0;
let timer;

const game = document.getElementById("game");

function embaralhar(array){

return array.sort(() => Math.random() - 0.5);

}

function iniciarCronometro(){

clearInterval(timer);

segundos = 0;

timer = setInterval(() => {

segundos++;

const min = Math.floor(segundos / 60);
const seg = segundos % 60;

document.getElementById("tempo").innerText =
String(min).padStart(2,"0") +
":" +
String(seg).padStart(2,"0");

},1000);

}

function atualizarRecorde(){

const recorde =
localStorage.getItem("recordeEmaterce");

if(recorde){

document.getElementById("recorde").innerText =
recorde;

}

}

function criarCartas(){

cartas = [];

programas.forEach(programa => {

cartas.push(programa);
cartas.push({...programa});

});

embaralhar(cartas);

}

function criarTabuleiro(){

game.innerHTML = "";

cartas.forEach(programa => {

const carta = document.createElement("div");

carta.classList.add("memory-card");

carta.dataset.nome = programa.nome;

carta.innerHTML = `

<div class="front-face">

<img src="img/logo-ematerce.png">

<h3>EMATERCE</h3>

<span>JOGO DA MEMÓRIA</span>

</div>

<div class="back-face">

<img src="${programa.imagem}"
alt="${programa.nome}">

</div>

`;

carta.addEventListener(
"click",
() => virarCarta(carta)
);

game.appendChild(carta);

});

}

function virarCarta(carta){

if(
bloqueado ||
carta.classList.contains("flip")
) return;

carta.classList.add("flip");

if(!primeiraCarta){

primeiraCarta = carta;
return;

}

segundaCarta = carta;

jogadas++;

document.getElementById("jogadas")
.innerText = jogadas;

verificarPar();

}

function verificarPar(){

const igual =
primeiraCarta.dataset.nome ===
segundaCarta.dataset.nome;

if(igual){
    
somAcerto.currentTime = 0;
somAcerto.play();
primeiraCarta.classList.add("matched");
segundaCarta.classList.add("matched");

pares++;

document.getElementById("pares")
.innerText = pares + " / 8";

primeiraCarta = null;
segundaCarta = null;

if(pares === 8){

fimDeJogo();

}

return;

}

somErro.currentTime = 1.5;
somErro.play();

bloqueado = true;

setTimeout(() => {

primeiraCarta.classList.remove("flip");
segundaCarta.classList.remove("flip");

primeiraCarta = null;
segundaCarta = null;

bloqueado = false;

},1000);

}

function fimDeJogo(){

clearInterval(timer);

somVitoria.currentTime = 0;
somVitoria.play();

let recorde =
localStorage.getItem("recordeEmaterce");

if(
!recorde ||
jogadas < Number(recorde)
){

localStorage.setItem(
"recordeEmaterce",
jogadas
);

recorde = jogadas;

}

document.getElementById("resultado-final")
.innerHTML =

`
Você concluiu o jogo em <strong>${jogadas}</strong>
jogadas <br><br>

Tempo: <strong>
${document.getElementById("tempo").innerText} </strong>
`;

document.getElementById("modal-vitoria")
.style.display = "flex";

atualizarRecorde();

}

function fecharModal(){

document.getElementById("modal-vitoria")
.style.display = "none";

startGame();

}

function startGame(){

primeiraCarta = null;
segundaCarta = null;
bloqueado = false;

jogadas = 0;
pares = 0;

document.getElementById("jogadas")
.innerText = "0";

document.getElementById("pares")
.innerText = "0 / 8";

criarCartas();

criarTabuleiro();

iniciarCronometro();

atualizarRecorde();

}

startGame();
document.addEventListener("click",()=>{

somAcerto.load();
somErro.load();
somVitoria.load();

},{once:true});