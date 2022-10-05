"use strict";

window.addEventListener("DOMContentLoaded",
    function() {
        $("header").textillate({
            loop: false,
            minDisplayTime: 2000, 
            autoStart: true, 
            in: {
            effect: "fadeInLeftBig", 
            delayScale: 1.5,
            delay: 50, 
            sync: false, 
            shuffle: true 
            }
            });
            $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
            });
        setTimeout(
            function(){
            let popMessage = "いっらしゃい！おみくじ引いてって";
            window.alert(popMessage);
        },"7000");
    
    }, false
);
let soundEndFlag="0";
const btn1 = document.getElementById("btn1");
const omikujiText=document.getElementById("omikujiText");
btn1.addEventListener("click",
    function() {
        if(soundEndFlag==="1"){
            soundControl("end","");
        }
        let resultText=["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶..","大凶...."];
        let resultColor=["Crimson","Red","DeepPink","HotPink","Violet","Gray","Black"];
        let resultFontSize=["66px","62px","60px","58px","56px","65px","68px"];
        let resultMaxSpeed=[9,8,8,8,8,5,5];
        let resultMaxSize=[90,100,100,100,100,80,80];
        let resultImg=['img/1.png','img/3.png','img/3.png','img/3.png','img/3.png','img/2.png','img/0.png']
        let resultSound=['sound/omikuji_sound1.mp3','sound/omikuji_sound1.mp3','sound/omikuji_sound2.mp3','sound/omikuji_sound2.mp3','sound/omikuji_sound3.mp3','sound/omikuji_sound4.mp3','sound/omikuji_sound5.mp3','sound/omikuji_sound5.mp3']
        let n=Math.floor(Math.random()*resultText.length);
        omikujiText.textContent = resultText[n];
        omikujiText.style.color = resultColor[n];
        omikujiText.style.fontSize = resultFontSize[n];
        w_sound=resultSound[n];
        soundControl("start",w_sound);
        soundEndFlag="1";
        $(document).snowfall("clear");
        $(document).ready(function(){
        $(document).snowfall({
        maxSpeed : resultMaxSpeed[n], 
        minSpeed : 1,
        maxSize :resultMaxSize[n],
        minSize : 1, 
        image : resultImg[n],
})
}
)},false
);  
let w_sound
let music
function soundControl(status,w_sound){
    if(status==="start"){
        music =new Audio(w_sound);
        music.currentTime=0;
        music.play();
    }else if(status==="end"){
        music.pause();
        music.currentTime=0;
    }
}
