
let stateSet = document.querySelector(".state_set");
let musicHead = document.querySelector(".head");
let musicOBJ = document.querySelector("audio");
let proLine = document.querySelector(".pros");
let timeshow = document.querySelector(".time_show");
let musicLineMoveFa = document.querySelector(".progress");
let musicLineMove = document.querySelector(".pros");
let volumeBtn = document.querySelector(".volume");
let volumeBar = document.querySelector(".volume_range");
let volumePro = document.querySelector(".range");
let musicLast = document.querySelector(".last");
let musicNext = document.querySelector(".next");
let musicBOXbc = document.querySelector(".play_bc > img");
let musicInfoShow = document.querySelector(".music_info");


window.onload = function(){
    musicPlaySet();
    musicMove();
    musicListen();
    volumeSet();
    musicJump();
}

let time = null;
let time2 = null;
let time3 = null;
let time4 = null;
let f1 = false;
let f2 = true;
let i1 = 0;
let nowtime = 0;
let currtime = 0;

function musicPlaySet(){
    stateSet.onclick = function(){
        if(f1){
            musicStop();
        }else{
            stateSet.className = "state_set iconfont icon-24gl-pause2";
            musicOBJ.play();
            musicTime();
            time = setInterval(() => {
                i1++;
                musicHead.style.transform = `rotate(${i1}deg)`;
            }, 20);
            f1 = true;
        }
    }
}

function musicTime(){
    let time = Math.floor(musicOBJ.duration);
    let minute = Math.floor(time / 60) + "";
    minute = minute < 10 ? "0" + minute : minute; 
    let second = time % 60 + "";
    second = second < 10 ? "0" + second : second; 
    time4 = setInterval(() => {
        let muscurrtime = musicOBJ.currentTime;
        let currminute = Math.floor(muscurrtime / 60) + "";
        currminute = currminute < 10 ? "0" + currminute : currminute; 
        let currsecond = Math.floor(muscurrtime % 60) + "";
        currsecond = currsecond < 10 ? "0" + currsecond : currsecond; 
        timeshow.innerText = `${currminute}:${currsecond} / ${minute}:${second}`;
    }, 1);
    time2 = setInterval(() => {
        let movetime = 330 / time;
        nowtime += movetime;
        proLine.style.width = nowtime + "px";
    }, 1000);
}

function musicMove(){
    musicLineMove.onmousedown = function(){
        clearInterval(time);
        clearInterval(time2);
        clearInterval(time4);
        musicLineMoveFa.onmousemove = function(){
            clearInterval(time);
            clearInterval(time2);
            clearInterval(time4);
            x = event.clientX - (window.innerWidth - 330) / 2 - 30;
            proLine.style.width = x + "px";
            currtime = x / (330 / musicOBJ.duration);
        }
    }
    musicLineMove.onmouseup = function(){
        musicLineMoveFa.onmousemove = null;
        musicOBJ.currentTime = currtime;
        proLine.style.width = currtime * (330 / musicOBJ.duration) + "px";
        nowtime = currtime * (330 / musicOBJ.duration);
        musicTime();
        musicOBJ.play();
        stateSet.className = "state_set iconfont icon-24gl-pause2";
        time = setInterval(() => {
            i1++;
            musicHead.style.transform = `rotate(${i1}deg)`;
        }, 20);
        f1 = true;
    }
}

function musicListen(){
    time3 = setInterval(() => {
        if(musicOBJ.ended){
            proLine.style.width = "0px";
            stateSet.className = "state_set iconfont icon-24gl-play";
            nowtime = 0;
            clearInterval(time);
            clearInterval(time2);
            clearInterval(time4);
            musicloop();
            f1 = false; 
        }
    }, 1000);
}

function volumeSet(){
    volumePro.autofocus = true;
    volumePro.defaultValue = 100;
    volumePro.step = 1;
    volumePro.max = 100;
    volumePro.min = 0;
    volumeBtn.onmouseenter = function(){
        volumeBar.style.height = "100px";
        volumeBar.style.padding = "5px";
        volumeBar.style.top = "-110px";
        volumeBtn.onclick = function(){
            if(f2){
                volumePro.disabled = true;
                volumeBtn.className = "volume iconfont icon-24gl-volumeDisable";
                musicOBJ.muted = true;
                f2 = false;
            }else{
                volumePro.disabled = false;
                volumeBtn.className = "volume iconfont icon-24gl-volumeMiddle";
                musicOBJ.muted = false;
                f2 = true;
            }
        }
    }
    volumeBtn.onmouseleave = function(){
        volumeBar.style.height = "0px";
        volumeBar.style.padding = "0px";
        volumeBar.style.top = "0px";
    }
    volumePro.onfocus = function(){
        volumeBtn.onclick = null;
        this.onchange = function(){
            musicOBJ.volume = this.value / 100;
            console.log(this.value);
            if(this.value === 0){
                volumeBtn.className = "volume iconfont icon-24gl-volumeDisable";
                f2 = false;
            }
        }
    }
}

let musicList = ["Reprologue","Shadyshady"];
function musicJump(){
    for (let i = 0; i < musicList.length; i++) {
        musicLast.onclick = function(){
            musicInfoShow.innerText = musicList[i];
            musicOBJ.src = "music/" + musicList[i] + ".mp3";
            musicBOXbc.src = "head/" + musicList[i] + ".jpg";
            musicHead.src = "head/" + musicList[i] + ".jpg";
            nowtime = 0;
            console.log(i);
            i--;
            if(i < 0 || i > 5){
                i = musicList.length - 1;
            }
            musicStop();
        }
        musicNext.onclick = function(){
            musicInfoShow.innerText = musicList[i];
            musicOBJ.src = "music/" + musicList[i] + ".mp3";
            musicBOXbc.src = "head/" + musicList[i] + ".jpg";
            musicHead.src = "head/" + musicList[i] + ".jpg";
            nowtime = 0;
            i++;
            if(i < 0 || i >= 1){
                i = 0;
            }
            musicStop();
        }
    }
}

function musicStop(){
    stateSet.className = "state_set iconfont icon-24gl-play";
    musicOBJ.pause();
    clearInterval(time);
    clearInterval(time2);
    clearInterval(time4);
    f1 = false;
}

function musicloop(){
    stateSet.className = "state_set iconfont icon-24gl-pause2";
    musicOBJ.play();
    musicTime();
    time = setInterval(() => {
    i1++;
    musicHead.style.transform = `rotate(${i1}deg)`;
    }, 20);
    f1 = true;
}
