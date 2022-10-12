"use strict";

window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage==="undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていないです。");
        return;
    }else{
        viewStorage();
        saveLocalStorage();
    }
},false
);

function saveLocalStorage(){
    let save=document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key =document.getElementById("textKey").value;
        const value =document.getElementById("textMemo").value;
        if(key==""||value==""){
            window.alert("key,Memoは何れも必須です。");
            return;
        }else{
            localStorage.setItem(key, value);
            viewStorage();
            let w_msg="LocalStorageに"+key+" "+value+"を保存しました。";
            window.alert(w_msg);
            document.getElementById("textKey").value="";
            document.getElementById("textMemo").value="";
        }
    },false
    )
}

function viewStorage(){
    const list=document.getElementById("list");
    while( list.rows[0] )list.deleteRow(0);
    for(let i=0;i<localStorage.length;i++){
        let w_key=localStorage.key(i);
        const tr=document.createElement("tr");
        const td1=document.createElement("td");
        const td2=document.createElement("td");
        const td3=document.createElement("td");
        list.append(tr);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        td1.innerHTML="<input name='radio1' type='radio'>";
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
}