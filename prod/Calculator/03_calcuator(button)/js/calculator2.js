'use strict';

// ワークエリア
var wkFirst = "1";//初回FLG
var wkTotal = 0;  //合計
var wkInput = ""; //現在クリックされたボタンの値
var wkCalc = "+"; //初期値 "+"
var wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
const elementCalcLog=document.getElementById("calcLog");
const elementResult=document.getElementById("result");

const num1=document.getElementById("num1");
const num2=document.getElementById("num2");
const num3=document.getElementById("num3");
const num4=document.getElementById("num4");
const num5=document.getElementById("num5");
const num6=document.getElementById("num6");
const num7=document.getElementById("num7");
const num8=document.getElementById("num8");
const num9=document.getElementById("num9");
const num0=document.getElementById("num0");

const elementAdd=document.getElementById("add");
const elementSub=document.getElementById("sub");
const elementMulti=document.getElementById("multi");
const elementDiv=document.getElementById("div");

const elementEqual=document.getElementById("equal");
const elementCancel=document.getElementById("cancel");


num1.addEventListener("click",function(){edit(1)},false);
num2.addEventListener("click",function(){edit(2)},false);
num3.addEventListener("click",function(){edit(3)},false);
num4.addEventListener("click",function(){edit(4)},false);
num5.addEventListener("click",function(){edit(5)},false);
num6.addEventListener("click",function(){edit(6)},false);
num7.addEventListener("click",function(){edit(7)},false);
num8.addEventListener("click",function(){edit(8)},false);
num9.addEventListener("click",function(){edit(9)},false);
num0.addEventListener("click",function(){edit(0)},false);

elementAdd.addEventListener("click",function(){update("+")},false);
elementSub.addEventListener("click",function(){update("-")},false);
elementMulti.addEventListener("click",function(){update("x")},false);
elementDiv.addEventListener("click",function(){update("÷")},false);

elementEqual.addEventListener("click",dspResult,false);
elementCancel.addEventListener("click",clear,false);

document.addEventListener("keydown",function(){keyDownEvent(event)},false)
/** 数字がクリックされたときの処理 */
function edit(wkInput) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
      elementResult.innerHTML = Number(elementResult.innerHTML + wkInput); //入力値の結合（ゼロサプレスして結合）
  } 
  // １つ前の入力が、演算子
  else {
    elementResult.innerHTML = Number(wkInput);
  }
  wkFirst = "0" //初回FLG off
  wkBefore = "0"
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementCalcLog.innerHTML = elementCalcLog.innerHTML + Number(elementResult.innerHTML) + calcType; //計算ログ
    calculator();
  } 
  // １つ前の入力が演算子（演算子 入力しなおし）
  else {
    // 初回入力
    if (wkFirst === "1") {
      elementCalcLog.innerHTML = "0" + calcType; //計算ログ
    }
    else {
      // 演算子 入力しなおし
      let wkLogLastWord = elementCalcLog.innerHTML.slice(-1); //ログ最後の１文字
      if (["+","-","x","÷"].includes(wkLogLastWord)) {
        elementCalcLog.innerHTML = elementCalcLog.innerHTML.slice(0, -1) + calcType; //計算ログ　末尾1文字（前回の演算子）を削除
      }
      // イコールの後の演算子
      else{
        elementCalcLog.innerHTML = elementCalcLog.innerHTML + calcType; //計算ログ
      }
    }
  }
  wkCalc = calcType;  //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
function dspResult(){

  if(wkFirst==="0"&&wkBefore==="0"){
    elementCalcLog.innerHTML=elementCalcLog.innerHTML+Number(elementResult.innerHTML);
    calculator();
    wkCalc="=";
    wkBefore="1";
  }
  
}
function calculator(){
    switch(wkCalc){
        case"+":
        wkTotal+=Number(elementResult.innerHTML);
        break;
        case"-":
        wkTotal-=Number(elementResult.innerHTML);
        break;
        case"x":
        wkTotal*=Number(elementResult.innerHTML);
        break;
        case"÷":
        wkTotal/=Number(elementResult.innerHTML);
        break;
    }
    elementResult.innerHTML=wkTotal;
}
  

function clear(){
    elementResult.innerHTML="0";
    elementCalcLog.innerHTML="";
    wkFirst = "1"; 
    wkTotal = 0;  
    wkInput = ""; 
    wkCalc = "+"; 
    wkBefore = "1";
}

function back(){
  var str0=elementCalcLog.innerHTML;
  var str=elementResult.innerHTML;
  if(str0.indexOf("=")>0|| str=="")
      return;
  str=str.substring(0,(str.length)-1)
  elementResult.innerHTML=str;
}
function keyDownEvent(event){
  let n;
  for(n=0;n<=9;n++){
    if(event.key==n){
      edit(n);
    }
  }
  switch(event.key){
    case "*":
      update("x");
      break;
    case "+":
      update("+");
      break;
    case "-":
      update("-");
      break;
    case "/":
      update("÷");
      break;
  }
  if(event.key=="Escape"){
    clear();
  }
  if(event.key=="Enter"){
    dspResult();
  }
  if(event.key=="Backspace"){
    back();
  }
}
/*
function keyDownEvent(event){
    let n;
    for(n=0;n<=9;n++){
      if(event.keyCode==(n+96)){
        edit(n);
      }
    }
    switch(event.keyCode){
      case 106:
        update("x");
        break;
      case 107:
        update("+");
        break;
      case 109:
        update("-");
        break;
      case 111:
        update("÷");
        break;
    }
    if(event.keyCode==27){
      clear();
    }
    if(event.keyCode==13){
      dspResult();
    }
    if(event.keyCode==8){
      back();
    }
}
*/



