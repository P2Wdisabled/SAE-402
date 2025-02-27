import * as questionData from "./data/QuestionData.js";
import { helper } from "./data/HelperData.js";

import * as playerData from "./Save.js";
import { endGame, startChrono, updateChrono } from "./Timer/timer.js";
import {addScore} from "./Score/ModelScore.js";
import { updateScore } from "./Score/viewScore.js";
import {updateMission, missionData} from "./Mission/ModelMission.js";
import { updateMissionDisplay } from "./Mission/ViewMission.js";
let questionsNPC1 = questionData.questionsNPC1;
let questionsNPC2 = questionData.questionsNPC2;
let questionsNPC3 = questionData.questionsNPC3;
let questionsNPC4 = questionData.questionsNPC4;
let dialogues = questionData.dialogues;
let remainingQuestions = questionData.remainingQuestions;
let sentenceNPCSpawn = questionData.sentenceNPCSpawn;
// let missions = missionData.missions;
// let timeRemaining = timer.timeRemaining
document.addEventListener("DOMContentLoaded", () => {
    let isDay = true;
    const sky = document.getElementById("sky");
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    
    setInterval(() => {
      isDay = !isDay;
      if (isDay) {
        sky.setAttribute("color", "#87CEEB"); 
        sun.setAttribute("visible", "true");
        moon.setAttribute("visible", "false");
      } else {
        sky.setAttribute("color", "#1a1a2e");
        sun.setAttribute("visible", "false");
        moon.setAttribute("visible", "true");
      }
    }, 500000); 
  });


  console.log(questionData.totalQuestions);
    let currentNpcId = null;

   // Easing function for smoother movement
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Smooth movement and rotation logic for the character





let isDialogueOpen = false;
let chronostarted = false;
let currentQuestion = {}; 

function openDialogue(npcId) {
    if (npcId === 'npcSpawn-hitbox') {
        document.getElementById('mission-panel').setAttribute('visible', 'true');
        updateMission(1); 
    }
    console.log("📢 Ouverture du dialogue avec :", npcId);

    // Cacher le panneau des missions
    document.getElementById('mission-panel').setAttribute('visible', 'false');

    // Stocker le dernier NPC contacté
    currentNpcId = npcId;

    // Vérifier si une mission doit être validée
    // validateMission(npcId);

    if (isDialogueOpen) return;
    
    isDialogueOpen = true;
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
    if (!currentQuestion[npcId]) {
        currentQuestion[npcId] = questionData.getRandomQuestion(npcId);
    }
    
    const randomQuestion = currentQuestion[npcId];

    if (!randomQuestion) {

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
        if(nextNPCName){
        document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Please go see " + nextNPCName);}
        else{
            document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Good Job you are a real New Yorker.");
        }
        
        // Masquer les choix lorsque plus aucune question n'est disponible
        document.getElementById('choice1').setAttribute('visible', 'false');
        document.getElementById('choice2').setAttribute('visible', 'false');
        document.getElementById('remaining-text').setAttribute('visible', 'true');
        document.getElementById('difficulty-text').setAttribute('visible', 'false');

        isDialogueOpen = false;
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
    document.getElementById('choice1').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 0)`);

    document.getElementById('choice2').style.display = "block";
    document.getElementById('choice2').setAttribute('text', `value: ${randomQuestion.choices[1]}; color: lightgreen;`);
    document.getElementById('choice2').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 1)`);
}


function showHelp() {
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

document.getElementById('help').addEventListener('click', showHelp);


// Event listener pour désactiver les clics pendant un dialogue ouvert
document.querySelectorAll('.clickable').forEach(hitbox => {
hitbox.addEventListener('click', function () {
    if (isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    openDialogue(this.id);
});
});
//console.log(document.getElementById('npc2-container'));

function showFeedbackMessage(text, isCorrect) {
    const feedback = document.getElementById('feedback-message');
    const textFeedback = document.getElementById('feedback-text');

    feedback.setAttribute('position','0, 0.5, -1');
    feedback.setAttribute('visible', 'true');
    console.log(feedback);
   
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


function validateMission(npcId) {
    console.log(`🔎 Validation des missions pour ${npcId}`);

    const missionMapping = {
        'npcSpawn-hitbox': 1,
        'npc1-hitbox': 2,    
        'npc2-hitbox': 4,    
        'npc3-hitbox': 6,     
        'npc4-hitbox': 8      
    };

    const questionMissionMapping = {
        'npc1-hitbox': 3,     
        'npc2-hitbox': 5,     
        'npc3-hitbox': 7,    
        'npc4-hitbox': 9     
    };


    if (missionMapping[npcId] && !missions[missionMapping[npcId] - 1].completed) {
        console.log(`🎯 Mission de dialogue validée pour ${npcId}`);
        updateMission(missionMapping[npcId]);
        
    }   

    if (questionMissionMapping[npcId]) {
        if (remainingQuestions[npcId] === 0) {
            console.log(`🎯 Mission de questions validée pour ${npcId}`);
            updateMission(questionMissionMapping[npcId]);
            // updateMissionDisplay(missionData);
        } else {
            console.log(`⚠ Il reste ${remainingQuestions[npcId]} questions à répondre.`);
        }
    }
}
window.validateMission = validateMission;
    document.getElementById('mission-panel').setAttribute('visible', 'false');
    updateMissionDisplay(missionData);

    document.getElementById('mission-panel').setAttribute('visible', 'true');
    

    
    function isTalkingTo(npcId) {
        return remainingQuestions[npcId] > 0; 
    }
    window.isTalkingTo = isTalkingTo;
    // Function to check the answer and display the feedback message
    function checkAnswer(question, selectedIndex) {
        if (selectedIndex === question.correct) {
            showFeedbackMessage("✅ Correct! +1 Point", true);
            updateScore(addScore());
            console.log(questionData.totalQuestions);
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
        playerData.savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues,  document.getElementById('rig').getAttribute('position'));
        console.log("Fermeture du dialogue...");
        document.getElementById('mission-panel').setAttribute('visible', 'true');
        const dialogueBox = document.getElementById('dialogue-box');
        const overlay = document.getElementById('overlay');
        
        dialogueBox.setAttribute('visible', 'false');
        overlay.setAttribute('visible', 'false');
    
        isDialogueOpen = false; // Réactive l'interaction
    }
    const dialogueBox = document.getElementById('dialogue-box');
        dialogueBox.addEventListener('click', function(event) {
            if (event.target.className == 'close') {
                console.log("Fermeture du dialogue"); // Debug
                closeDialogue();
            }
        });
        const answer = document.querySelector('.clickableChoice');
        answer.addEventListener('click', function(event) {
            if (event.target.id === 'close') {
                console.log("Fermeture du dialogue"); // Debug
                closeDialogue();
            }
        });       
    // Removed redundant event delegation for '.choice' as inline onclick events are already being used.
    // Function to 
    // update the position of the hitboxes to match the parent NPC position
    function updateHitboxPosition() {
        document.querySelectorAll('.clickable').forEach(hitbox => {
            let parent = hitbox.parentElement;
            let position = parent.getAttribute('position');

            if (position) {
                hitbox.setAttribute('position', '0 1 0');
            }
        });
    }

    window.updateHitboxPosition = updateHitboxPosition;
    if(remainingQuestions==0){endGame('questions', currentScore);}
    // startChrono();

    // setInterval(() => {
    //     playerData.savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, missions, timeRemaining, currentScore, document.getElementById('rig').getAttribute('position'));
    // }, 500);

    // let data = await playerData.loadPlayerThings();
    // currentScore = data.score;
    // document.getElementById('rig').setAttribute('position', data.position);

    // remainingQuestions = data.remainingQuestions
    // dialogues = data.dialogues
    // missions = data.missions
    // questionsNPC1 = data.questionsNPC1
    // questionsNPC2 = data.questionsNPC2
    // questionsNPC3 = data.questionsNPC3
    // questionsNPC4 = data.questionsNPC4
    // timeRemaining = data.time;
    // score.updateScore(currentScore);
    // timer.updateChrono()
    // playerData.savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, missions, timeRemaining, currentScore, document.getElementById('rig').getAttribute('position'));

    // missions.forEach(mission => {
    //     if (mission.completed) {
    //         updateMission(mission.id);
    //     }
    // });