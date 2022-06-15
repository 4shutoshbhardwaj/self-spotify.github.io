// Initialize the variables

let songIndex=0;
let audioElement=new Audio("0.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItem=Array.from(document.getElementsByClassName("songItem"));


let songs=[
    {songName:"STARBOY", filePath:"0.mp3",timeStamp:"03:50"},
    {songName:"Party Monster", filePath:"1.mp3",timeStamp:"04:09"},
    {songName:"False Alarm", filePath:"2.mp3",timeStamp:"03:40"},
    {songName:"Reminder", filePath:"3.mp3",timeStamp:"03:38"},
    {songName:"Rokin'", filePath:"4.mp3",timeStamp:"03:52"}
];

songItem.forEach((element,i)=>{
    console.log(element,i);
    // element.getElementsByTagName("img")[0].src=songs[i].filePath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    // element.getElementsByClassName("timeStamp")[0].innerText=songs[i].timeStamp;
})

// let audioElement=new Audio('1.Starboy.mp3');
// audioElement.play();

// Handle Play/Pause click
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
})

// Listen to Events
audioElement.addEventListener("timeupdate",()=>{
    // Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((e)=>{
        e.classList.remove("fa-pause-circle");
        e.classList.add("fa-play-circle");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src=songIndex+".mp3";
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    })
})

document.getElementById("next").addEventListener("click",()=>{
    if(songIndex>=4){
        songIndex=0
    }else{
        songIndex+=1;
    }
    audioElement.src=songIndex+".mp3";
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex=4
    }else{
        songIndex-=1;
    }
    audioElement.src=songIndex+".mp3";
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});