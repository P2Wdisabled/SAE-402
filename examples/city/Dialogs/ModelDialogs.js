
import {savePlayerThings} from "../Save.js";
import {remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues} from "../data/QuestionData.js";


export let isDialogueOpen = false;
export function updateDialogueStatus(value) {
    isDialogueOpen = value;
}



export function closeDialogue() {
    // if (!isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues,  document.getElementById('rig').getAttribute('position'));
    document.getElementById('mission-panel').setAttribute('visible', 'true');
    const dialogueBox = document.getElementById('dialogue-box');
    const overlay = document.getElementById('overlay');
    
    dialogueBox.setAttribute('visible', 'false');
    overlay.setAttribute('visible', 'false');

    isDialogueOpen = false; // Réactive l'interaction
}
export function setRemainingQuestions(value) {
    remainingQuestions = value;
}