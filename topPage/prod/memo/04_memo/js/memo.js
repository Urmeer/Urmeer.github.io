"use strict";
let wSound=['sound/click.mp3','sound/confirmation.mp3','sound/cancel.mp3','sound/error.mp3'];
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
            new Audio(wSound[0]).play();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            if (key == "" || value == "") {
                Swal.fire({
                    title:"Error",
                    html:"key,Memoは何れも必須です。",
                    type:"error",
                    animation:false,
                    customClass:'t1',
                    allowOutsideClick:false,
                }).then(function(result){
                    if(result.value===true){
                    new Audio(wSound[0]).play();
                    }
                    });    
                new Audio(wSound[3]).play();
                return;
            } else {
                let w_msg="LocalStorageに「"+key+" "+value+"」を保存しますか。";
                Swal.fire({
                    title:"Question",
                    html:w_msg,
                    type:"question",
                    animation:false,
                    customClass:'t2',
                    showCancelButton:true
                }).then(function(result){
                    if(result.value===true){
                        new Audio(wSound[0]).play();
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存しました。";
                        Swal.fire({
                            title:"Success",
                            html:w_msg,
                            type:"success",
                            animation:false,
                            customClass:'t3',
                            allowOutsideClick:false
                        }).then(function(result){
                            if(result.value===true){
                            new Audio(wSound[0]).play();
                            }
                            }); 
                        new Audio(wSound[1]).play();   
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }else{
                        new Audio(wSound[2]).play();
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
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img class='trash' src='./img/trash_icon.png'>";
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
            new Audio(wSound[0]).play();
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
        else if(mode==="del"){
            Swal.fire({
                title:"Error",
                html:"一つ以上を選択してください。",
                type:"error",
                animation:false,
                customClass:'t1',
                allowOutsideClick:false
            }).then(function(result){
                if(result.value===true){
                new Audio(wSound[0]).play();
                }
                });    
            new Audio(wSound[3]).play();
            return w_cnt;
        }else {
            Swal.fire({
                title:"Error",
                html:"一つを選択してください。",
                type:"error",
                animation:false,
                customClass:'t1',
                allowOutsideClick:false
            }).then(function(result){
                if(result.value===true){
                new Audio(wSound[0]).play();
                }
                });    
            new Audio(wSound[3]).play();
            return;
        }
   
}

function deleteStorage() {
    const delete1 = document.getElementById("delete");
    delete1.addEventListener("click",
        function(e) {
            e.preventDefault();
            new Audio(wSound[0]).play();
            let w_cnt=0;
            w_cnt=selectCheckBox("del");
            const chkbox1=document.getElementsByName("chkbox1");
            const table1=document.getElementById("table1");
            if(w_cnt>="1"){
                let w_msg="LocalStorageから選択されている"+w_cnt+"件を削除しますか。";
                Swal.fire({
                    title:"Question",
                    html:w_msg,
                    type:"question",
                    animation:false,
                    customClass:'t2',
                    showCancelButton:true
                }).then(function(result){
                        if(result.value===true){
                            new Audio(wSound[0]).play();
                            for(let i=0;i<chkbox1.length;i++){
                                if(chkbox1[i].checked){ 
                                localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                                }   
                            }
                            viewStorage();
                            let w_msg="LocalStorageから"+w_cnt+"件を削除しました。";
                            Swal.fire({
                                title:"Success",
                                html:w_msg,
                                type:"success",
                                animation:false,
                                customClass:'t3',
                                allowOutsideClick:false
                            }).then(function(result){
                                if(result.value===true){
                                new Audio(wSound[0]).play();
                                }
                                }); 
                            new Audio(wSound[1]).play();  
                            document.getElementById("textKey").value = "";
                            document.getElementById("textMemo").value = ""; 
                        }else{
                            new Audio(wSound[2]).play();
                        }
                    }    
                )                      
            }
        },false
    );
    const table1 =document.getElementById("table1");
    table1.addEventListener("click",(e) =>{
        if(e.target.classList.contains("trash")===true){
            new Audio(wSound[0]).play();
            let w_msg="LocalStorageから選択されている1件を削除しますか。";
            Swal.fire({
                title:"Question",
                html:w_msg,
                type:"question",
                animation:false,
                customClass:'t2',
                showCancelButton:true,
            }).then(function(result){
                    if(result.value===true){
                        new Audio(wSound[0]).play();
                        let tr=e.target.parentNode.parentNode;
                        localStorage.removeItem(table1.rows[tr.sectionRowIndex+1].cells[1].firstChild.data);
                        tr.parentNode.deleteRow(tr.sectionRowIndex);
                        let w_msg="LocalStorageから選択されている1件を削除しました。";
                        Swal.fire({
                            title:"Success",
                            html:w_msg,
                            type:"success",
                            animation:false,
                            customClass:'t3',
                            allowOutsideClick:false
                        }).then(function(result){
                            if(result.value===true){
                            new Audio(wSound[0]).play();
                            }
                            }); 
                        new Audio(wSound[1]).play();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = ""; 
                    }else{
                        new Audio(wSound[2]).play();
                    }
                }    
            )                      
           
        }
    })
}

function allClearLocalStorage(){
    let allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            new Audio(wSound[0]).play();
            let w_msg="LocalStorageのデータをすべて削除します。\r\nよろしいですか。";
            Swal.fire({
                title:"Question",
                html:w_msg,
                type:"question",
                animation:false,
                customClass:'t2',
                showCancelButton:true,
            }).then(function(result){
                    if(result.value===true){
                        new Audio(wSound[0]).play();
                        localStorage.clear();
                        viewStorage();
                        let w_msg="LocalStorageのデータを全て削除しました。"
                        Swal.fire({
                            title:"Success",
                            html:w_msg,
                            type:"success",
                            animation:false,
                            customClass:'t3',
                            allowOutsideClick:false,
                        }).then(function(result){
                            if(result.value===true){
                            new Audio(wSound[0]).play();
                            }
                            }); 
                        new Audio(wSound[1]).play();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }else{
                        new Audio(wSound[2]).play();
                    }
                }    
            )                      
        }
    )
}

