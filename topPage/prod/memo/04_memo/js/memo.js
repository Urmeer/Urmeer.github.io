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
                Swal.fire({
                    title:"Memo app",
                    html:"key,Memoは何れも必須です。",
                    type:"error",
                    allowOutsideClick:false
                });
                return;
            } else {
                let w_msg="LocalStorageに「"+key+" "+value+"」を保存しますか。";
                Swal.fire({
                    title:"Memo app",
                    html:w_msg,
                    type:"question",
                    showCancelButton:true
                }).then(function(result){
                    if(result.value===true){
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title:"Memo app",
                            html:w_msg,
                            type:"success",
                            allowOutsideClick:false
                        });                    
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                })
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

function selectCheckBox(mode){
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
        document.getElementById("textKey").value = w_textKey;
        document.getElementById("textMemo").value = w_textMemo;
        if(w_cnt===1){
            return w_cnt;
        }
        else if(mode==="del"&&w_cnt>=1){
            return w_cnt;
        }else {
            window.alert("一つ選択してください。")
        }
   
}

function deleteStorage() {
    let delete1 = document.getElementById("delete");
    delete1.addEventListener("click",
        function(e) {
            e.preventDefault();
            let w_cnt=0;
            w_cnt=selectCheckBox("del");
            const chkbox1=document.getElementsByName("chkbox1");
            const table1=document.getElementById("table1");
            if(w_cnt>="1"){
                let w_confirm=confirm("LocalStorageから選択されている"+w_cnt+"件を削除しますか。");
                if(w_confirm===true){
                    for(let i=0;i<chkbox1.length;i++){
                        if(chkbox1[i].checked){ 
                        localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }   
                    }
                    viewStorage();
                    let w_msg="LocalStorageから"+w_cnt+"件を削除しました。";
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

