const temas=[

{nome:"Crédito Rural",imagem:"img/credito-rural.png"},
{nome:"Fomento Rural",imagem:"img/fomento-rural.png"},
{nome:"Raízes Cearenses",imagem:"img/raizes-cearenses.png"},
{nome:"Terc.IA",imagem:"img/tercia.png"},
{nome:"Assistência Técnica",imagem:"img/ater-ceara.png"},
{nome:"Turismo Rural",imagem:"img/turismo-rural.png"},
{nome:"Cotonicultura",imagem:"img/cotonicultura.png"},
{nome:"+Ater Ceará",imagem:"img/ater-ceara.png"},
{nome:"Citaf+",imagem:"img/citaf.png"}

];

let cartas=[];
let primeiraCarta=null;
let segundaCarta=null;
let bloqueado=false;

let jogadas=0;
let pares=0;

let segundos=0;
let timer;

function embaralhar(a){
return a.sort(()=>Math.random()-0.5);
}

function startGame(){

clearInterval(timer);

segundos=0;

timer=setInterval(()=>{

segundos++;

const min=Math.floor(segundos/60);
const seg=segundos%60;

document.getElementById("tempo").innerText=
String(min).padStart(2,"0")+":"+
String(seg).padStart(2,"0");

},1000);

jogadas=0;
pares=0;

document.getElementById("jogadas").innerText="0";
document.getElementById("pares").innerText="0/9";

const game=document.getElementById("game");

game.innerHTML="";

cartas=embaralhar([...temas,...temas]);

cartas.forEach(tema=>{

const card=document.createElement("div");

card.classList.add("card");

card.dataset.tema=tema.nome;

card.innerHTML=`

<div class="front">
EMATERCE
</div>

<div class="back">
<img src="${tema.imagem}" class="logo-programa">
<div class="titulo-programa">
${tema.nome}
</div>
</div>
`;

card.addEventListener("click",()=>virarCarta(card));

game.appendChild(card);

});

}

function virarCarta(card){

if(
bloqueado ||
card.classList.contains("flip") ||
card===primeiraCarta
) return;

card.classList.add("flip");

if(!primeiraCarta){

primeiraCarta=card;
return;
}

segundaCarta=card;

jogadas++;

document.getElementById("jogadas").innerText=jogadas;

verificarPar();
}

function verificarPar(){

const igual=
primeiraCarta.dataset.tema===
segundaCarta.dataset.tema;

if(igual){

primeiraCarta.classList.add("encontrada");
segundaCarta.classList.add("encontrada");

pares++;

document.getElementById("pares").innerText=
pares+"/9";

primeiraCarta=null;
segundaCarta=null;

if(pares===9){

clearInterval(timer);

let recorde=
localStorage.getItem("recorde");

if(!recorde || jogadas<recorde){

localStorage.setItem(
"recorde",
jogadas
);

document.getElementById("recorde").innerText=
jogadas;
}

setTimeout(()=>{

alert(
"Parabéns! Você concluiu o jogo em "+
jogadas+
" jogadas."
);

},300);
}

return;
}

bloqueado=true;

setTimeout(()=>{

primeiraCarta.classList.remove("flip");
segundaCarta.classList.remove("flip");

primeiraCarta=null;
segundaCarta=null;

bloqueado=false;

},1000);
}

startGame();
