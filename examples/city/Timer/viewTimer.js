//string defining the current time in minutes:secondes
let chronoString = '';

/**
 * Ends the game and displays an end dialog based on the type of game ending.
 *
 * @param {string} endType - The type of game ending. Can be 'timeout' or 'questions'.
 * @param {number} score - The player's score at the end of the game.
 */
function endGame(endType , score) {
        //timer ended because of out of time
        if (endType === 'timeout') {
            let endDialog = document.createElement('a-plane');
            endDialog.setAttribute('text', 'value', 'Time is up! Game over!' + score);
            endDialog.setAttribute('id', 'endDialog');
            endDialog.setAttribute('visible', 'true');
            endDialog.setAttribute('position', '0 1 -2');
            endDialog.setAttribute('width', '2');
            endDialog.setAttribute('color', 'red');
            //timer ended because of answered all questions
        } else if (endType === 'questions') {
            let endDialog = document.createElement('a-plane');
            endDialog.setAttribute('text', 'value', 'You have answered all questions! Game over!' + score);
            endDialog.setAttribute('id', 'endDialog');
            endDialog.setAttribute('visible', 'true');
            endDialog.setAttribute('position', '0 1 -2');
            endDialog.setAttribute('width', '2');
            endDialog.setAttribute('color', 'red');
        }
        document.querySelector('a-camera').appendChild(endDialog);
    }
/**
 * Updates the timer display with the given time remaining.
 *
 * @param {number} timeRemaining - The time remaining in seconds.
 */
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