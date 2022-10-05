'use strict';

var st=0;          //入力値は数字の場合は0,演算子の場合は1
var calcu=0;           //メソッド判断

const elementCalcLog=document.getElementById("calcLog");
const elementResult=document.getElementById("result");


//数字、括弧、πの入力
function edit(x){
    var str0=elementCalcLog.innerHTML;
    var str=elementResult.innerHTML;
    if(str0.indexOf("=")>0){
        zero();
        str=elementResult.innerHTML;
    }
    if(str=="0")
        str="";
    str+=String(x);
    elementResult.innerHTML=str;
    st=0;
}

//"."の入力
function dot(){
	var str0=elementCalcLog.innerHTML;
	var str=elementResult.innerHTML;
	if(str0.indexOf("=")>0){
		zero();
        str=elementResult.innerHTML;
	}
	str=str+".";
    elementResult.innerHTML=str;
}

//"+","-","x","÷"の入力
function add(){
    calcu=1;
    calculate();
}
function multi(){
    calcu=2;
    calculate();
}
function div(){
    calcu=3;
    calculate();
}
function sub(){
    var str0=elementCalcLog.innerHTML;
	var str=elementResult.innerHTML;
	if(str0.indexOf("=")>0){
		zero();
		str=elementResult.innerHTML+"-";
	}
 	else
 		str+="-";
 	elementResult.innerHTML=str;
}
function calculate(){
    if(st==1)
        return;
    var str0=elementCalcLog.innerHTML;
    var str=elementResult.innerHTML;
    if(str0.indexOf("=")>0){
        zero();
        str=elementResult.innerHTML;
    }
    if(str=="")
        str="0";
    switch(calcu){
        case 1: str+="+";
        break;
        case 2: str+="x";
        break;
        case 3: str+="÷";
        break;
    }
    elementResult.innerHTML=str;
    st=1;
}
//三角関数及び1/X,ln,logの入力
function sin(){
    calcu=1;
    cal();
}
function cos(){
    calcu=2;
    cal();
}
function tan(){
    calcu=3;
    cal();
}
function div1(){
    calcu=4;
    cal();
}
function ln(){
    calcu=5;
    cal();
}
function log(){
    calcu=6;
    cal();
}
function cal(){
    var str0=elementCalcLog.innerHTML;
    var str=elementResult.innerHTML;
    if(str0.indexOf("=")>0){
        zero();
        str=elementResult.innerHTML;
    }
    if(str=="0")
        str="";
    switch(calcu){                                   
        case 1: str+=String("sin(");
        break;               
        case 2: str+=String("cos(");
        break;               
        case 3: str+=String("tan(");
        break; 
        case 4: str+=String("1/");
        break;
        case 5: str+=String("ln(");
        break;
        case 6: str+=String("log(");
        break;
    }   
    elementResult.innerHTML=str;
    st=1;
}
// "^","√","%"の入力
function pow(){
    calcu=1;
    powS();
}
function sqr(){
    calcu=2;
    powS();
}
function per(){
    calcu=3;
    powS();
}
function powS(){
	if(st == 1)
		return;
	var str0=elementCalcLog.innerHTML;
	var str=elementResult.innerHTML;
	if(str0.indexOf("=")>0){
		zero();
		str=elementResult.innerHTML
	}
	switch(calcu){
		case 1: str+=String('^');
 			    break;
		case 2: if(str=='0')
			  		str="√";
			  	else{
			  		str+=String('√');
			  	}
			    break;
		case 3: str+=String("%");
				break;
	}
	elementResult.innerHTML=str;
	st=1;
}


//初期化
function zero(){
    elementResult.innerHTML="0";
    elementCalcLog.innerHTML="";
}

//バック
function back(){
    var str0=elementCalcLog.innerHTML;
    var str=elementResult.innerHTML;
    if(str0.indexOf("=")>0|| str=="")
        return;
    str=str.substring(0,(str.length)-1)
    elementResult.innerHTML=str;
}

//プラマイ
function sign(){
    var str0=elementCalcLog.innerHTML;
    var str=elementResult.innerHTML;
    if(str0.indexOf("=")>0)
        return;
    if(st===0){
    elementResult.innerHTML=Number(-str);
    }
    else{
    elementResult.innerHTML="エラー";
    }
}

//計算
function equal(){
    var str0=elementResult.innerHTML;
    if(str0=="")
        return;
    var str=str0.replace(/x/g,'*');
        str=str.replace(/÷/g,'/');
        str=str.replace(/π/g,'Math.PI');
    if(str.indexOf("sin")>=0){
        str=str.replace(/sin/g,'Math.round(Math.sin');
        str+="*1000000)/1000000";
        elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
    }
    else if(str.indexOf("cos")>=0){
        str=str.replace(/cos/g,'Math.round(Math.cos');
        str+='*1000000)/1000000';
        elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
    }
    else if(str.indexOf("tan")>=0){
        str=str.replace(/tan/g,'Math.round(Math.tan');
        str+="*1000000)/1000000";
        elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
    }
    else if(str.indexOf("^")>=0){
        var pos=str0.indexOf('^');
		var pow1=str0.substring(0,pos);
		var pow2=str0.substring(pos+1,str0.length+1);
		var result=Math.pow(pow1, pow2);
		elementCalcLog.innerHTML=str0.concat("=");
		elementResult.innerHTML=eval(result);
    }
    else if(str.indexOf("√")>=0){
        var pos=str0.indexOf('√');
		var pow1=str0.substring(0,pos);
		var pow2=str0.substring(pos+1,str0.length+1);
		if(pow1==''){
			var result=Math.pow(pow2,0.5);
            elementCalcLog.innerHTML=str0.concat("=");
            elementResult.innerHTML=eval(result);
		}
		else{
			var result=Math.pow(pow2, 1/pow1);
            elementCalcLog.innerHTML=str0.concat("=");
            elementResult.innerHTML=eval(result);
		}
	}
    else if(str.indexOf("ln")>=0){
		var str=str0.replace(/ln/g,'Math.round(Math.log');
		str+='*1000000)/1000000';
        elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
	}
    else if(str.indexOf("log")>=0){
		var str=str0.replace(/log/g,'Math.log');
		str+= '/Math.log(10)';
		elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
	}
    else if(str.indexOf("%")>=0){
        var pos=str0.indexOf('%');
            var pow1=str0.substring(pos-2,pos);
            str=Number(pow1/100);
        elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(str);
    }
    else{
		result=(eval(str));
		elementCalcLog.innerHTML=str0.concat("=");
        elementResult.innerHTML=eval(result);
	}
    var m=elementResult.innerHTML
	if(m=="Infinity")
        elementResult.innerHTML="∞";
	else if(m=="-Infinity")
        elementResult.innerHTML="-∞";
}
 
//htmlのスタイル変換
function styleChange(){
	if(document.getElementById('rows').style.display=='inline'){
		document.getElementById('rows').style.display='none';
		document.getElementById('sci').style.display='inline';
        zero();
	}
	else if(document.getElementById('rows').style.display=='none'){
		document.getElementById('rows').style.display='inline';
		document.getElementById('sci').style.display='none';
        zero();
	}
}