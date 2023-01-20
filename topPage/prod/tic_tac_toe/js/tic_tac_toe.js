"use strict";
let flag=0; 
let counter=9;
let winstate;
let wSound=['sound/click_sound1.mp3','sound/click_sound2.mp3','sound/draw_sound.mp3','sound/white_sound.mp3','sound/black_sound.mp3'];
let whiteStorage=new Array();
let blackStorage=new Array();
let lineStorage=new Array();
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
let s=Array.from(square);
let arg=1;
window.addEventListener("DOMContentLoaded",
    function() {
       setMessage("white-turn");
    }, false
);

for(let i=0;i<square.length;i++){
    square[i].addEventListener("click",()=>{
        isSelect(square[i],arg);
        valueCheck(square,i);
        checkWin();
        if(counter==0||counter==-1&&winstate!=0){
            setMessage("draw");
            gameOver("draw");
        }
    },true)
    
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

function isSelect(e,arg){
    mode(e,arg);
    document.getElementById("check").style.pointerEvents='none';
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
        square[i].setAttribute('value',null);
    }
    counter=9;
    flag=0;
    winstate=null;
    whiteStorage=new Array();
    blackStorage=new Array();
    lineStorage=new Array();
    document.getElementById("check").style.pointerEvents='auto';
    setMessage("white-turn");
    $(document).snowfall("clear");
}

function valueCheck(square,i){
    if(square[i].getAttribute('value')==0){
        whiteStorage.push(i);
    }
    if(square[i].getAttribute('value')==1){
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
            return winstate=0;
        }
        if(win.every(Element=>blackStorage.indexOf(Element)>-1)){
            setMessage("black-win");
            snowfall(1);
            lineStorage=win;
            gameOver("black");
            return winstate=1;
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

function mode(e,arg){
    if(arg==0){
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
    }else{
            new Audio(wSound[0]).play();
            e.classList.add("js-white-checked","js-unclickable");
            e.setAttribute('value',0);
            setMessage("black-turn");
            setTimeout(function(){
            emptyIndexies(s);
            if(arg==1){
                if(emptyIndexies(s).length>0&&winstate!=0){
                    let n=Math.floor(emptyIndexies(s).length*Math.random());
                    new Audio(wSound[1]).play();
                    emptyIndexies(s)[n].classList.add("js-black-checked","js-unclickable");
                    emptyIndexies(s)[n].setAttribute('value',1);
                    s.map((val,i)=>{
                        if(val.getAttribute('value')==1){
                           blackStorage.push(i);
                        }
                       })
                    checkWin();
                    setMessage("white-turn");
                }
            }
            },300)
            counter-=2;
    }
}

function emptyIndexies(board){                                                                      
    return board.filter(val=>val.getAttribute('value')!=0&&val.getAttribute('value')!=1);
}


function modeChange(){
    if(arg==1&&document.getElementById("check").style.pointerEvents!='none'){
        document.getElementById('PVE').style.display='none';
        return arg=0;
    }else if(arg==0&&document.getElementById("check").style.pointerEvents!='none'){
        document.getElementById('PVE').style.display='none';
        return arg=1;
    }
}

