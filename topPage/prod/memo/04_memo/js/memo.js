"use strict";

window.addEventListener("DOMContentLoaded",
function(){
    if(typeof localStorage==="undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていないです。");
        return;
    }else{
        viewStorage();
        saveLocalStorage();
        choose();
        delete1();
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
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML="<input name='radio1' type='radio'>";
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
}

function choose(){
    for(let i=2;i<localStorage.length*3;i++){
    if(document.getElementsByTagName("input")[i].checked){
        document.getElementById("textKey").value=document.getElementsByTagName("td")[i-1].innerHTML;
        document.getElementById("textMemo").value=document.getElementsByTagName("td")[i].innerHTML;
    }
    }
}


function delete1(){
    let delete1=document.getElementById("delete");
    delete1.addEventListener("click",
    function(e){
        e.preventDefault();
        const list1=document.getElementById("list");
        if(localStorage.length>0){
            let w_key=localStorage.key(localStorage.length-1);
            localStorage.removeItem(w_key);
            list1.deleteRow(localStorage.length-1);
        }
        else{
            console.log("error");
        }
    },false
    )
}