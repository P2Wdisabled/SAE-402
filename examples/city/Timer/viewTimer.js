//string defining the current time in minutes:secondes
let chronoString = '';


function updateTimer(timeRemaining) {
    //convert the current time to minutes
    let minutes = Math.floor(timeRemaining / 60);
    //get the seconds
    let seconds = timeRemaining % 60;
    //convert the values of the minutes and seconds to a string
    chronoString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    //set the value of the timer to the current time
    document.getElementById('time').setAttribute("value", `time left: ${chronoString}`);
}


export {updateTimer};