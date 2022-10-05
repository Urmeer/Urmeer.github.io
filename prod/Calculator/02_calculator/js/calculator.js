"use strict";

//加減乗除の実現
const result = document.getElementById("result");
const btnEqual = document.getElementById("btnEqual");
const elementNum1=document.getElementById("num1");
const elementNum2=document.getElementById("num2");
const elementSelect=document.getElementById("calcType");
elementNum1.addEventListener("change",clear,false);
elementNum2.addEventListener("change",clear,false);
elementSelect.addEventListener("change",clear,false);
btnEqual.addEventListener("click",update_a,false);

//進数変換の実現
const input = document.getElementsByName("input_"); //labelのDOM要素の取得
const output = document.getElementsByName("output_");
const input_num = document.getElementById("input_num"); //selectのDOM要素の取得
const output_num = document.getElementById("output_num");
const input_value = document.getElementById("input_value"); //inputのDOM要素の取得
const output_value = document.getElementById("output_value");
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("click",
        function() {
            if (input[i].checked == true) {
                input_num[i].selected = true; //selectで選択されたlabelの表示
                input_value.addEventListener("input",
                    function() {
                        if (input[0].checked == true) {
                            binRule();
                        }
                        if (input[1].checked == true) {
                            octRule();
                        }
                        if (input[2].checked == true) {
                            decRule();
                        }
                        if (input[3].checked == true) {
                            hexRule();
                        }
                    }, false
                );
            }
        }, false
    );
    output[i].addEventListener("click",
        function() {
            if (output[i].checked == true) {
                output_num[i].selected = true; //selectで選択されたlabelの表示
                for (let j = 0; j < input.length; j++) {
                    if (input[j].checked == true) {
                        output_value.value = parseInt(input_value.value, input[j].value).toString(output_num[i].value); //進数変換
                    }
                }
            }
        }, false
    );
};
//入力値制限
function binRule() {
    input_value.value = input_value.value.replace(/[^0-1]+/g, '');
}

function octRule() {
    input_value.value = input_value.value.replace(/[^0-7]+/g, '');
}

function decRule() {
    input_value.value = input_value.value.replace(/[^0-9]+/g, '');
}

function hexRule() {
    input_value.value = input_value.value.replace(/[^0-9A-Fa-f]+/g, '');
}
//加減乗除の算法
function update_a() {
    let num1 = Number(elementNum1.value); //String型をNumberに変換する
    let num2 = Number(elementNum2.value);
    let index = elementSelect.selectedIndex; //選択されたselectセレクタのindexの値の取得
    let value = [num1 + num2, num1 - num2, num1 * num2, num1 / num2];
    result.textContent = String(value[index]);
}
function clear(){
    result.innerHTML="";
}
/*switchを使う(3_1,3_2,3_3)
function update_b(){
    let num1=Number(elementNum1.value);
    let num2=Number(elementNum2.value);
    let calcType=elementSelect.value;
    const result1=c(num1,num2,calcType);
     result.innerHTML=result1;
}
function c(num1,num2,calcType){
    let result1;
    switch(calcType){
        case "type-add":
            result1=num1+num2;
            break;
        case "type-subtraction":
            result1=num1-num2;
            break;
        case "type-multiply":
            result1=num1*num2;
            break;
        case "type-divide":
            result1=num1/num2;
            break;
    }
    return result1;
}*/


