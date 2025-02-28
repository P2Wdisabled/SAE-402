import { updateTimer } from "./viewTimer.js";
import { endGame } from "./viewTimer.js";
import { getScore } from "../Score/ModelScore.js";
let timeRemaining = 600;
//600

    //interval to start the timer
    let intervalId = null;

    /**
     * Updates the countdown timer.
     * 
     * This function decreases the remaining time by one unit and updates the timer display.
     * If the remaining time reaches zero, it stops the timer and ends the game.
     * 
     * @async
     * @function updateChrono
     * @returns {Promise<void>} A promise that resolves when the timer is updated.
     */
    export async function updateChrono() {
        //check if the timer ended (under 0)
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            //stop the timer and end the inverval goes back to it's empty state
            clearInterval(intervalId);
            if(timeRemaining == 0){endGame('timeout', getScore());}
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
    export function getTimeRemaining() {
        return timeRemaining;
    }
    export function setTimeRemaining(time) {
        timeRemaining = time;
    }