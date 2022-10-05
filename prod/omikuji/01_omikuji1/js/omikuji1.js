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
const btn1 = document.getElementById("btn1");
btn1.addEventListener("click",
    function() {
        let resultText=["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶..","大凶...."];
        let resultColor=["Crimson","Red","DeepPink","HotPink","Violet","Gray","Black"];
        let resultFontSize=["66px","62px","60px","58px","56px","65px","68px"];
        let resultMaxSpeed=[9,8,8,8,8,5,5];
        let resultMaxSize=[90,100,100,100,100,80,80];
        let resultImg=['img/1.png','img/3.png','img/3.png','img/3.png','img/3.png','img/2.png','img/0.png']
        let n=Math.floor(Math.random()*resultText.length);
        btn1.textContent = resultText[n];
        btn1.style.color = resultColor[n];
        btn1.style.fontSize = resultFontSize[n];
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