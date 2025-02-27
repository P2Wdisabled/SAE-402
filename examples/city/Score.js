import * as interactions from './interaction.js';
export let score = 0;
export function updateScore(score) {
    document.getElementById('score').setAttribute("value", `Score: ${score}`);
    interactions.closeDialogue();
}