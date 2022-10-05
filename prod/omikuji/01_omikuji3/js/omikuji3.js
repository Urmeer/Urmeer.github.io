"use strict";
let n="";
let nBefore="";
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
const omikujiTextImage=document.getElementById("omikujiTextImage")
btn1.addEventListener("click",
    function() {
        if(soundEndFlag==="1"){
            soundControl("end","");
        }
        let resultText=['img/daikichi.png','img/chukichi.png','img/syokichi.png','img/suekichi.png','img/daikyo.png',];
        let resultMaxSpeed=[10,10,8,6,7];
        let resultMaxSize=[100,80,70,80,90];
        let resultImg=['img/1.png','img/3.png','img/3.png','img/2.png','img/0.png']
        let resultSound=['sound/omikuji_sound1.mp3','sound/omikuji_sound2.mp3','sound/omikuji_sound3.mp3','sound/omikuji_sound4.mp3','sound/omikuji_sound5.mp3']
        while(n===nBefore){
             n=Math.floor(Math.random()*resultText.length);
        }
        nBefore=n;
        omikujiTextImage.src = resultText[n];
        omikujiTextImage.classList.add("omikujiPaper");
        omikujiTextImage.addEventListener("animationend",
        function(){
            omikujiTextImage.classList.remove("omikujiPaper");
        },false
        );

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