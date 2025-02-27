
import {savePlayerThings} from "../Save.js";
import {remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues} from "../data/QuestionData.js";
import {showFeedbackMessage} from "./ViewDialogs.js"
import {updateScore} from "../Score/viewScore.js";
import {addScore} from "../Score/modelScore.js";


let currentNpcId = null;
let currentQuestion = {}; 
let chronostarted = false;
export let isDialogueOpen = false;
export function updateDialogueStatus(value) {
    isDialogueOpen = value;
}

function isTalkingTo(npcId) {
    return remainingQuestions[npcId] > 0; 
}
window.isTalkingTo = isTalkingTo;

export function checkAnswer(question, selectedIndex) {
        if (!isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
        if (selectedIndex === question.correct) {
            showFeedbackMessage("✅ Correct! +1 Point", true);
            updateScore(addScore());
            // Remove the current question to get the next one on subsequent calls
            delete currentQuestion[currentNpcId];
            
            // Decrement remaining questions and validate mission if done
            remainingQuestions[currentNpcId]--;
            if (remainingQuestions[currentNpcId] === 0) {
                validateMission(currentNpcId);
            }
        } else {
            showFeedbackMessage("❌ Wrong! Try again.", false);
        }
        
        closeDialogue();
    }
    
    window.checkAnswer = checkAnswer;

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