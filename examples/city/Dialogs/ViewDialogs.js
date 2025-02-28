import {updateMission} from "../Mission/ModelMission.js";
import {startChrono} from "../Timer/ModelTimer.js";
import {getRandomQuestion, remainingQuestions, sentenceNPCSpawn} from "../data/QuestionData.js";
import { isDialogueOpen, updateDialogueStatus, setRemainingQuestions } from "./ModelDialogs.js";
import { helper } from "../data/HelperData.js";
import {checkAnswer} from "../interaction.js"

let currentNpcId = null;
let currentQuestion = {}; 
let chronostarted = false;
export function openDialogue(npcId) {
    if (npcId === 'npcSpawn-hitbox') {
        document.getElementById('mission-panel').setAttribute('visible', 'true');
        updateMission(1); 
    }
    console.log("📢 Ouverture du dialogue avec :", npcId);

    // Cacher le panneau des missions
    document.getElementById('mission-panel').setAttribute('visible', 'false');

    // Stocker le dernier NPC contacté
    currentNpcId = npcId;
    // let question = 
    // Vérifier si une mission doit être validée
    // validateMission(npcId);

    if (isDialogueOpen) return;
    
    updateDialogueStatus(true);
    if (!chronostarted) {
        startChrono();
        chronostarted = true;
    }

    console.log("Opening of the dialog box:", npcId);

    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.setAttribute('visible', 'true');

    if (npcId === 'npcSpawn-hitbox') {
        // Display only the spawn message
        document.getElementById('dialogue-text').setAttribute('value', sentenceNPCSpawn.question);

        // Hide choices
        document.getElementById('choice1').setAttribute('visible', 'false');
        document.getElementById('choice2').setAttribute('visible', 'false');
        document.getElementById('remaining-text').setAttribute('visible', 'false');
        document.getElementById('difficulty-text').setAttribute('visible', 'false');
        return;
    }
    let newQuestion = getRandomQuestion(npcId);
    if (currentQuestion[npcId]) {
        while(newQuestion.question === currentQuestion[npcId].question) {
            newQuestion = getRandomQuestion(npcId);
        }
    }
    currentQuestion[npcId] = newQuestion;
    const randomQuestion = currentQuestion[npcId];
    console.log(`📢 Avant vérification, remainingQuestions[${npcId}] =`, remainingQuestions[npcId]);

    if (remainingQuestions[npcId] === 0) {
        console.log(`✅ remainingQuestions[${npcId}] est bien 0, on affiche la fin du dialogue.`);
    

        let nextNPCName = '';
        switch (npcId) {
            case 'npc1-hitbox':
                nextNPCName = 'Luke at the park';
                break;
            case 'npc2-hitbox':
                nextNPCName = 'Greg near some food truck';
                break;
                case 'npc3-hitbox':
    
                    nextNPCName = 'Jack at the biggest statue of NY';
                    break;
            // default:
            //     nextNPCName = '';
        }
        if (nextNPCName) {
            document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Please go see " + nextNPCName);
            document.getElementById('remaining-text').setAttribute('value', `Remaining: 0`)
        } else {
            document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Good Job you are a real New Yorker.");
            document.getElementById('remaining-text').setAttribute('value', `Remaining: 0`)
        }
        
        // Masquer les choix lorsque plus aucune question n'est disponible
        document.getElementById('choice1').setAttribute('visible', 'false');
        document.getElementById('choice2').setAttribute('visible', 'false');
        document.getElementById('remaining-text').setAttribute('visible', 'true');
        document.getElementById('difficulty-text').setAttribute('visible', 'false');

        updateDialogueStatus(false);
        return;
    }
    document.getElementById('remaining-text').setAttribute('visible', 'true');
    document.getElementById('difficulty-text').setAttribute('visible', 'true');
    document.getElementById('choice1').setAttribute('visible', 'true');
    document.getElementById('choice2').setAttribute('visible', 'true');
    document.getElementById('dialogue-text').setAttribute('value', randomQuestion.question);
    document.getElementById('difficulty-text').setAttribute('value', `Difficulty: ${randomQuestion.difficulty}`);
    document.getElementById('remaining-text').setAttribute('value', `Remaining: ${remainingQuestions[npcId]}`);

    document.getElementById('choice1').style.display = "block";
    document.getElementById('choice1').setAttribute('text', `value: ${randomQuestion.choices[0]}; color: lightblue;`);


    document.getElementById('choice2').style.display = "block";
    document.getElementById('choice2').setAttribute('text', `value: ${randomQuestion.choices[1]}; color: lightgreen;`);

    
    document.getElementById('choice1').addEventListener('click', function() { checkAnswer(randomQuestion, 0); });
    document.getElementById('choice2').addEventListener('click', function() { checkAnswer(randomQuestion, 1); });

}


export function showFeedbackMessage(text, isCorrect) {
    const feedback = document.getElementById('feedback-message');
    const textFeedback = document.getElementById('feedback-text');

    feedback.setAttribute('position','0, 0.5, -1');
    feedback.setAttribute('visible', 'true');
    // console.log(feedback);
   
    if(isCorrect){
        feedback.setAttribute('material', `color: rgb(41, 45, 41); opacity: 0.5; shader: standard;`);
        textFeedback.setAttribute('value', ` ${text}; `);
        textFeedback.setAttribute('color', 'green');
        textFeedback.setAttribute('font', 'mozillavr');
        

    }else{
        feedback.setAttribute('material', `color: rgb(41, 45, 41); opacity: 0.5; shader: standard;`);
        textFeedback.setAttribute('value', ` ${text}; `);
        textFeedback.setAttribute('color', '#ff0000');
        textFeedback.setAttribute('font', 'mozillavr');
    }


    setTimeout(() => {
        feedback.setAttribute('material', 'opacity: 0'); 
        setTimeout(() => {
            feedback.setAttribute('visible', 'false');
        }, 500); 
    }, 2000);
}


export function showHelp() {
    const dialogueText = document.getElementById('dialogue-text');
    // Check if we've stored the original question text
    let originalText = dialogueText.getAttribute('data-original');
    const currentText = dialogueText.getAttribute('value');

    // If no original text is stored, save the current as the original question 
    if (!originalText) {
        dialogueText.setAttribute('data-original', currentText);
        originalText = currentText;
    }

    // Toggle: if current text is not the original, revert back to the question
    if (currentText !== originalText) {
        dialogueText.setAttribute('value', originalText);
    } else {
        // Otherwise, display help if available
        if (helper[originalText]) {
            dialogueText.setAttribute('value', helper[originalText]);
        } else {
            dialogueText.setAttribute('value', "Max help use.");
        }
    }
}