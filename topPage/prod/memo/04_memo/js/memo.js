"use strict";


window.addEventListener("DOMContentLoaded",
    function() {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていないです。");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            deleteStorage();
            allClearLocalStorage();
            selectTable();
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
                let w_confirm=confirm("LocalStorageに「"+key+" "+value+"」を保存しますか。");
                if(w_confirm===true){
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
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
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");    
}



function selectTable(){
    const select=document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox(0);
    },false
    );
}

function selectCheckBox(a){
    let w_sel="0";
    let w_cnt=0;
    const chkbox1=document.getElementsByName("chkbox1");
    const table1=document.getElementById("table1");
    let w_textKey="";
    let w_textMemo="";
    for(let i=0;i<chkbox1.length;i++){
        if(chkbox1[i].checked){
            if(w_cnt===0){
                w_textKey=table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo=table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
        if(w_cnt===1){
            w_sel="1";
            document.getElementById("textKey").value = w_textKey;
            document.getElementById("textMemo").value = w_textMemo;
        }else if(a===0){
            window.alert("一つ選択してください。");
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }else if(a===1){
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    return w_sel;  
}

function deleteStorage() {
    let delete1 = document.getElementById("delete");
    delete1.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_sel="0";
            w_sel=selectCheckBox(1);
            let key = document.getElementById("textKey").value;
            const chkbox1=document.getElementsByName("chkbox1");
            const table1=document.getElementById("table1");
            console.log(w_sel);
            if(w_sel==="1"){
                let w_confirm=confirm("LocalStorageに「"+key+""+value+"」を削除しますか。");
                if(w_confirm===true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg="LocalStorageから"+key+" "+value+"を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }else if(w_sel==="0"){
                let w_confirm=confirm("選択された項目を削除しますか。");
                if(w_confirm===true){
                    for(let i=0;i<chkbox1.length;i++){
                        if(chkbox1[i].checked){
                            key=table1.rows[i+1].cells[1].firstChild.data;
                            localStorage.removeItem(key);
                        }
                    }
                    viewStorage();
                    let w_msg="選択された項目は全て削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        },false
    );
}

function allClearLocalStorage(){
    let allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();
        let w_confirm=confirm("LocalStorageのデータをすべて削除します。\r\nよろしいですか。");
        if(w_confirm===true){
            localStorage.clear();
            viewStorage();
            let w_msg="LocalStorageのデータを全て削除しました。"
            window.alert(w_msg);
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
    }
    )
}

