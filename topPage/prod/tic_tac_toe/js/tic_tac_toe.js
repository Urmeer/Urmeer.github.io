"use strict";
let flag=0;
let counter=9;
let wSound=['sound/click_sound1.mp3','sound/click_sound2.mp3','sound/draw_sound.mp3','sound/white_sound.mp3','sound/black_sound.mp3'];

const square=document.getElementsByClassName("square");
const restart=document.getElementById("restart");
const msgtxt1='<p class="image"><img src="img/white.png" width=61px height=61px></p><p class=text>White Attack!</p>';
const msgtxt2='<p class="image"><img src="img/black.png" width=61px height=61px></p><p class=text>Black Attack!</p>';
const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
window.addEventListener("DOMContentLoaded",
    function() {
       setMessage("white-turn");
    }, false
);

for(let i=0;i<square.length;i++){
    square[i].addEventListener("click",()=>{
        isSelect(square[i]);
        checkWin();
    })
}

restart.addEventListener("click",()=>{
    newGame();
})


function isSelect(e){
    if (flag===0){
        e.classList.add("js-white-checked","js-unclickable");
        new Audio(wSound[0]).play();
        setMessage("black-turn");
        flag=1
    }else if(flag===1){
        e.classList.add("js-black-checked","js-unclickable");
        setMessage("white-turn");
        new Audio(wSound[1]).play();
        flag=0;
    }
    counter-=1;
    if(counter==0){
        setMessage("draw");
        new Audio(wSound[2]).play();
    }
}
function setMessage(id){
    const msgtext=document.getElementById("msgtext");
    if(id==="white-turn"){
        msgtext.innerHTML=msgtxt1;
    }else if(id==="black-turn"){
        msgtext.innerHTML=msgtxt2;
    }else if(id==="draw"){
        msgtext.innerHTML="<p class=text>Drow</p>";
    }else if(id==="white-win"){
        msgtext.innerHTML="<p class=text>White win!</p>";
    }
}

function newGame(){
    for(let i=0;i<square.length;i++){
        square[i].classList.remove("js-white-checked","js-unclickable","js-black-checked");
    }
    counter=9;
    flag=0;
    setMessage("white-turn");
}

function checkWin(){
    let plays = board.reduce((a, e, i) =>
    (e === player) ? a.concat(i) : a, [])
let gameWin = null;

for (let [index, win] of winCombos.entries()) {
    if (win.every(Element => plays.indexOf(Element) > -1)) {
       
        gameWin = { index: index, player: player };
        break;
}
