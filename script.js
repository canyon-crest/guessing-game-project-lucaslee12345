// global variables


let level, answer, score; 
const levelArr = document.getElementsByName("level")
const scoreArr = [];
const timeArr = [];
const nameInput = document.getElementById("name");
let stopwatchInterval;
let stopwatch2Interval;
let fastestTime = Infinity; 

// add event listeners
playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess)



function yourname(){
    
    document.getElementById("welcomemsg").innerHTML = "Welcome, " + nameInput.value + "!";
}


function play(){
    document.getElementById("critic").textContent = "";
    score = 0; //sets score to 0 every new game
    playBtn.disabled = true;
    guessBtn.disabled = false; 
    guess.disabled = false;
    giveUp.disabled = false;

    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value; 
        }
            
        levelArr[i].disabled=true
    }
    msg.textContent = nameInput.value + ", guess a number  from 1-" + level;
    answer = Math.floor(Math.random()*level)+1; 
    
    second = 0;
    msecond = 0;
    stopwatchInterval = setInterval(stopwatch, 1000); //Ai help 
    stopwatch2Interval = setInterval(stopwatch2, 10);

    
}

function makeGuess(){
    let userguess = parseInt(guess.value);
    if(isNaN(userguess) || userguess < 1 || userguess > level){
        msg.textContent = nameInput.value + ", enter a VALID #1-" + level;
        return; 
    }
    score++; 
    

    //AI help 
    const warmness = Math.abs(userguess - answer);
    if (userguess !== answer) {
        const lvl = parseInt(level, 10);
        let threshold;
        if (lvl === 3) threshold = 1;
        else if (lvl === 10) threshold = 3; 
        else if (lvl === 100) threshold = 10; 
        else threshold = 3; 

        if (warmness <= threshold) {
            document.getElementById("Warmness").textContent = "Warm";
        } else {
            document.getElementById("Warmness").textContent = "Cold";
        }
    } else {
        
        document.getElementById("Warmness").textContent = "";
    }

    
    if(userguess > answer){
        msg.textContent = nameInput.value + ", It's Too High"
    }
    else if(userguess < answer){
        msg.textContent = nameInput.value + ", It's Too Low"
    }
    else{
        clearInterval(stopwatchInterval);
        clearInterval(stopwatch2Interval);

        //Ai help
        const totalTime = second + (msecond / 100);
        
        timeArr.push(totalTime);
        timeArr.sort((a,b)=>a-b);
        let sumTime = 0;
        for(let i =0; i<timeArr.length; i++){
            sumTime += timeArr[i];
        }
        let avgTime = sumTime/timeArr.length;
        document.getElementById("avgtime").textContent = "Average Time: " + avgTime.toFixed(2) + " seconds";


        
        if (totalTime < fastestTime) {
            fastestTime = totalTime;
            document.getElementById("fastesttime").innerHTML = nameInput.value + ": " + fastestTime.toFixed(2) + " seconds";
        }

        msg.textContent = nameInput.value + ", you got it, it took you " + score + "  tries and " + second + "." + msecond + " seconds." + " Press play to play again"
        updateScore(); 
        reset(); 
        document.getElementById("Warmness").textContent = "";
        document.getElementById("stopwatch").innerHTML = ""; 
        document.getElementById("stopwatch2").innerHTML = ""; 
        
        if(score === 1){
            document.getElementById("critic").textContent = "First Try, Genius!";
            document.getElementById("geniusSound").play();
        }
        else if(score <= 3){
            document.getElementById("critic").textContent = "Smart!";
            document.getElementById("smartSound").play();
        }
        else if(score <= 6){
            document.getElementById("critic").textContent = "Hmm, not bad.";
            document.getElementById("notBadSound").play();
        }
        else if(score <= 10){
            document.getElementById("critic").textContent = "GETOUT";
            document.getElementById("getoutSound").play();
        }

    }


    


   
  
}

function letsgiveup(){
    
    clearInterval(stopwatchInterval);
    clearInterval(stopwatch2Interval);
    msg.textContent = nameInput.value + ", you gave up! The answer was " + answer + ". Press play to try again.";
    reset();
    document.getElementById("Warmness").textContent = "";
    document.getElementById("stopwatch").innerHTML = ""; 
    document.getElementById("stopwatch2").innerHTML = ""; 
}



function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); // sort increasing order
    let lb = document.getElementsByName("leaderboard")
    wins.textContent = "Total Wins: " + scoreArr.length; 
    let sum =0;
    for(let i = 0; i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i] + " tries by  " + nameInput.value
        }
    }
    let avg = sum/scoreArr.length
    avgScore.textContent = "Average Score: " +avg.toFixed(2)

    

}



let second = 0; 
let msecond = 0; 





function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = ""; 
    guess.placeholder = "";
    playBtn.disabled = false; 
    giveUp.disabled = true;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false; 
    }
}

function stopwatch(){
    second ++; ;
    document.getElementById("stopwatch").innerHTML = second; 
}



function stopwatch2(){
    msecond ++; 
    document.getElementById("stopwatch2").innerHTML = msecond;
    if (msecond >= 100){
        msecond = 0;
    }
}

//Ai help 

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    if (day % 10 === 2 && day !== 12) suffix = "nd";
    if (day % 10 === 3 && day !== 13) suffix = "rd";
    
    const formattedDate = `${month} ${day}${suffix}, ${year}`;
    document.getElementById("date").innerHTML = formattedDate + " " + time;
}

updateClock();
setInterval(updateClock, 1000);







