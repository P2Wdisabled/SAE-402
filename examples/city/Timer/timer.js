let timeRemaining = 600;

export function endGame(endType , score) {
        
        if (endType === 'timeout') {
            let endDialog = document.createElement('a-plane');
            endDialog.setAttribute('text', 'value', 'Time is up! Game over!' + score);
            endDialog.setAttribute('id', 'endDialog');
            endDialog.setAttribute('visible', 'true');
            endDialog.setAttribute('position', '0 1 -2');
            endDialog.setAttribute('width', '2');
            endDialog.setAttribute('color', 'red');

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

    let chronoString = '';
    let intervalId = null;

    export async function updateChrono() {
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            clearInterval(intervalId);
            await endGame('timeout');
            return;
        }
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        chronoString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        document.getElementById('time').setAttribute("value", `time left: ${chronoString}`);
    }

    export async function startChrono() {
        if (!intervalId) {
            intervalId = setInterval(async () => {
                await updateChrono();
            }, 1000);
        }
    }