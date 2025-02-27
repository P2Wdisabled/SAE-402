    export let timeRemaining = 600;
    

    

    function endGame(endType) {
        if (endType === 'timeout') {
            alert('Time is up! Game over!');
        } else if (endType === 'questions') {
            alert('You have answered all questions!');
        }
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