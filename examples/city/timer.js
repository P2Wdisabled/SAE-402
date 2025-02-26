// import { savePlayerThings, loadPlayerThings } from "./Save.js";

// let timeRemaining = 600;
// let chronoString = '';
// let intervalId = null;

// async function updateChrono() {
//     if (timeRemaining <= 0) {
//         timeRemaining = 0;
//         clearInterval(intervalId);
//         await endGame('timeout');
//         return;
//     }
//     timeRemaining--;
//     let minutes = Math.floor(timeRemaining / 60);
//     let seconds = timeRemaining % 60;
//     chronoString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
//     document.getElementById('time').setAttribute("value", `time left: ${chronoString}`);
// }

// async function startChrono() {
//     if (!intervalId) {
//         intervalId = setInterval(async () => {
//             await updateChrono();
//         }, 1000);
//     }
// }

// setInterval(() => {
//     savePlayerThings();
// }, 500);

// loadPlayerThings();
// export { startChrono, updateChrono, chronoString, intervalId };