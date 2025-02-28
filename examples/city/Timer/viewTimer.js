//string defining the current time in minutes:secondes
let chronoString = '';

function endGame(endType, score) {
    //timer ended because of out of time
    if (endType === 'timeout') {
        console.log('end game');
        let endDialog = document.createElement('a-plane');
        endDialog.setAttribute('text', 'value: Time is up! Game over! ' + score + '; align: center;');
        endDialog.setAttribute('id', 'endDialog');
        endDialog.setAttribute('visible', 'true');
        endDialog.setAttribute('position', '0 2.5 -2');
        endDialog.setAttribute('width', '8');
        // endDialog.setAttribute('heigth', '');
        endDialog.setAttribute('material', 'color: rgb(41, 45, 41); opacity: 0.5; shader: standard;');
        document.querySelector('#rig').appendChild(endDialog);
    //timer ended because of answered all questions
    } else if (endType === 'questions') {
        let endDialog = document.createElement('a-plane');
        endDialog.setAttribute('text', 'value: You have answered all questions! Game over! ' + score + '; align: center;');
        endDialog.setAttribute('id', 'endDialog');
        endDialog.setAttribute('visible', 'true');
        endDialog.setAttribute('position', '0 2.5 -2');
        endDialog.setAttribute('width', '2');
        endDialog.setAttribute('material', 'color: rgb(41, 45, 41); opacity: 0.5; shader: standard;');
        document.querySelector('#rig').appendChild(endDialog);

    
    }
    
    // Add a button to return to the site
    let backButton = document.createElement('a-plane');
    backButton.setAttribute('text', 'value: Back to Site; align: center; color: #FFF; width: 4;');
    backButton.setAttribute('id', 'backButton');
    backButton.setAttribute('visible', 'true');
    backButton.setAttribute('position', '0 -1 0.5');
    backButton.setAttribute('width', '4');
    backButton.setAttribute('height', '0.5');
    backButton.setAttribute('material', 'color: #007BFF; opacity: 0.8; shader: standard; cursor: pointer;');
    backButton.addEventListener('click', () => {
        console.log('click');
        window.location.href = 'https://vr.louis-potevin.dev/V2';
    });
    document.querySelector('#endDialog').appendChild(backButton);
}
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


export {updateTimer, endGame};