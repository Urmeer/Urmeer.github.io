"use strict";
let flag=0; 
let counter=9;
let wSound=['sound/click_sound1.mp3','sound/click_sound2.mp3','sound/draw_sound.mp3','sound/white_sound.mp3','sound/black_sound.mp3'];
let valueStorage=new Array(9);
let whiteStorage=new Array();
let blackStorage=new Array();
let lineStorage=new Array();
let n;
let randomStorage=[0,1,2,3,4,5,6,7,8];
const square=document.getElementsByClassName("square");
const restart=document.getElementById("restart");
const menu=document.getElementById("menu");
const msgtxt1='<p class="image"><img src="img/white.png" width=61px height=61px></p><p class=text>White Attack!</p>';
const msgtxt2='<p class="image"><img src="img/black.png" width=61px height=61px></p><p class=text>Black Attack!</p>';
const msgtxt3='<p class="image"><img src="img/white.png" width=61px height=61px></p><p class=text1>White Win!</p>';
const msgtxt4='<p class="image"><img src="img/black.png" width=61px height=61px></p><p class=text2>Black Win!</p>';
const msgtxt0='<p class="text"style="height:103px; font-size:48px;">Drow!</p>';
const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
const image=['img/ParticleSmoke.png','img/star.png'];

window.addEventListener("DOMContentLoaded",
    function() {
       setMessage("white-turn");
    }, false
);

for(let i=0;i<square.length;i++){
    square[i].addEventListener("click",()=>{
        isSelect(square[i],1,i);
        valueCheck(square,i);
        checkWin();
        if(counter==0&&flag!=2){
            setMessage("draw");
            gameOver("draw");
        }
    })
}

restart.addEventListener("click",()=>{
    newGame();
})

restart.addEventListener('click',e=>{
    let span=document.createElement('span');
    span.style.left=e.offsetX+'px';
    span.style.top=e.offsetY+'px';
    restart.appendChild(span);
    setTimeout(function(){
        span.remove();
    },1000)
})

function isSelect(e,mode,i){
    if(mode==0){
        if (flag===0){
            new Audio(wSound[0]).play();
            e.classList.add("js-white-checked","js-unclickable");
            e.setAttribute('value',0);
            setMessage("black-turn");
            flag=1
        }else if(flag===1){
            new Audio(wSound[1]).play();
            e.classList.add("js-black-checked","js-unclickable");
            e.setAttribute('value',1);
            setMessage("white-turn");
            flag=0;
        }
        counter-=1;
    }
    else if(mode==1){
        new Audio(wSound[0]).play();
        e.classList.add("js-white-checked","js-unclickable");
        e.setAttribute('value',0);
        setMessage("black-turn");
        computer(1,i);
        counter--;
    }
}

function setMessage(id){
    const msgtext=document.getElementById("msgtext");
    if(id==="white-turn"){
        msgtext.innerHTML=msgtxt1;
    }else if(id==="black-turn"){
        msgtext.innerHTML=msgtxt2;
    }else if(id==="draw"){
        new Audio(wSound[2]).play();
        msgtext.innerHTML=msgtxt0;
    }else if(id==="white-win"){
        new Audio(wSound[3]).play();
        msgtext.innerHTML=msgtxt3;
        flag=2;
    }else if(id==="black-win"){
        new Audio(wSound[4]).play();
        msgtext.innerHTML=msgtxt4;
    }
}

function newGame(){
    for(let i=0;i<square.length;i++){
        square[i].classList.remove("js-white-checked","js-unclickable","js-black-checked","js-white_highLight","js-black_highLight");
    }
    counter=9;
    flag=0;
    whiteStorage=new Array();
    blackStorage=new Array();
    lineStorage=new Array();
    valueStorage=new Array(9);
    randomStorage=[0,1,2,3,4,5,6,7,8];
    setMessage("white-turn");
    $(document).snowfall("clear");
}

function valueCheck(square,i){
    valueStorage[i]=square[i].getAttribute('value');
    if(valueStorage[i]==0){
        whiteStorage.push(i);
    }
    if(valueStorage[i]==1){
        blackStorage.push(i);
    }
}

function checkWin(){
    for(let [,win]of winCombos.entries()){
        if(win.every(Element=>whiteStorage.indexOf(Element)>-1)){
            setMessage("white-win");
            snowfall(0);
            lineStorage=win;
            gameOver("white");
        }
        if(win.every(Element=>blackStorage.indexOf(Element)>-1)){
            setMessage("black-win");
            snowfall(1);
            lineStorage=win;
            gameOver("black");
        }
    } 
}

function gameOver(status){
    for(let i=0;i<square.length;i++){
        square[i].classList.add("js-unclickable");
    }
    if(status=="white"){
        for(let [,n]of lineStorage.entries()){
            square[n].classList.add("js-white_highLight");
        }
    }else if(status=="black"){
        for(let [,n]of lineStorage.entries()){
            square[n].classList.add("js-black_highLight");
        }
    }
}

function snowfall(n){
    $(document).ready(function(){
    $(document).snowfall({
    maxSpeed :10, 
    minSpeed :1,
    maxSize :60,
    minSize :30, 
    image:image[n],
    })
    })
}

function computer(mode,i){
    if(mode==1){
        if(square[i].getAttribute('value')==0){
            randomStorage.splice(i,1);
        }
        n=Math.floor(Math.random()*randomStorage.length);
        while(true){
            if(square[n].getAttribute('value')==null){
                new Audio(wSound[1]).play();
                square[randomStorage[n]].classList.add("js-black-checked","js-unclickable");
                square[randomStorage[n]].setAttribute('value',1);
                setMessage("white-turn");
                randomStorage.splice(i,1);
                return;
            }else{
                n=Math.floor(Math.random()*randomStorage.length);
            }
        }
    }
}
console.log(randomStorage);
        console.log(randomStorage[n]);
        console.log(n);