import { updateTimer } from "./viewTimer.js";

let timeRemaining = 600;


    //interval to start the timer
    let intervalId = null;

    export async function updateChrono() {
        //check if the timer ended (under 0)
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            //stop the timer and end the inverval goes back to it's empty state
            clearInterval(intervalId);
            
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