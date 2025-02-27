import { updateTimer } from "./viewTimer.js";

let timeRemaining = 600;

export function endGame(endType , score) {
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
    //interval to start the timer
    let intervalId = null;

    export async function updateChrono() {
        //check if the timer ended (under 0)
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            //stop the timer and end the inverval goes back to it's empty state
            clearInterval(intervalId);
            await endGame('timeout');
            return;
        }
        //decrease the timer
        timeRemaining--;
        updateTimer(timeRemaining);
    }

    export async function startChrono() {
        //start if the interval is "empty" (not filled in) & still run while the interval is not empty
        if (!intervalId) {
            //create a while stored in the interval running until the interval is emptyed
            intervalId = setInterval(async () => {
                await updateChrono();
            }, 1000);
        }
    }