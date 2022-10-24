"use strict";

let tempi;
let temps;
let flag=0;
window.addEventListener("DOMContentLoaded",
    function() {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていないです。");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            selectTable();
            choose();
            delete1();
        }
    }, false
);

function saveLocalStorage() {
    let save = document.getElementById("save");
    save.addEventListener("click",
        function(e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            if (key == "" || value == "") {
                window.alert("key,Memoは何れも必須です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();
                choose();
                let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    )
}

function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
}

function choose() {
    const radio1 = document.getElementsByName("radio1");
    for (let i = 0; i < localStorage.length; i++) {
        radio1[i].addEventListener("click",
            function() {
                if (radio1[i].checked) {
                    document.getElementById("textKey").value = document.getElementsByTagName("td")[3 * i + 1].innerHTML;
                    document.getElementById("textMemo").value = document.getElementsByTagName("td")[3 * i + 2].innerHTML;
                    temps=document.getElementsByTagName("td")[3 * i + 1].innerHTML;
                    tempi=i;
                    flag=1;
                }
            }, false
        )
    }
}

function selectTable(){
    const select=document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectRadioBtn();
    },false
    );
}

function selectRadioBtn(){
    let w_sel="0";
    const radio1=document.getElementsByName("radio1");
    const table1=document.getElementById("table1");
    for(let i=0;i<radio1.length;i++){
        if(radio1[i].checked){
            document.getElementById("textKey").value=table1.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value=table1.rows[i+1].cells[2].firstChild.data;
            return w_sel="1";
        }
    }
    window.alert("一つ選択してください。")
}

function delete1() {
    let delete1 = document.getElementById("delete");
    const list1 = document.getElementById("list");
    let w_key;
    delete1.addEventListener("click",
        function() {
            if(flag==0&&localStorage.length>0){
                w_key=document.getElementsByTagName("td")[1].innerHTML;
                localStorage.removeItem(w_key);
                list1.deleteRow(0);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }else if(flag==1&&localStorage.length>0){
                w_key=temps;
                localStorage.removeItem(w_key);
                list1.deleteRow(tempi);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                choose();
            }else{
                window.alert("error");
            }
        }, false
    )
}