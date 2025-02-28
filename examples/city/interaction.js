import { remainingQuestions,  totalQuestions} from "./data/QuestionData.js";
import { closeDialogue, isDialogueOpen} from "./Dialogs/ModelDialogs.js";
import { openDialogue, showHelp} from "./Dialogs/ViewDialogs.js";
import {getMissions, updateMission, findMissionById } from "./Mission/ModelMission.js";
import { updateMissionDisplay } from "./Mission/ViewMission.js";
import {showFeedbackMessage} from "./Dialogs/ViewDialogs.js";
import {updateScore} from "./Score/viewScore.js";
import {addScore, getScore} from "./Score/modelScore.js";
import {endGame} from "./Timer/viewTimer.js";
import {startSaving, loadPlayerThings} from "./Save.js";

let currentNpcId = null;
let currentQuestion = {}; 
// let missions = missionData.missions;
// let timeRemaining = timer.timeRemaining
document.addEventListener("DOMContentLoaded", async () => {
    await loadPlayerThings()
    startSaving();
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


   // Easing function for smoother movement
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Smooth movement and rotation logic for the character

    function isTalkingTo(npcId) {
        return remainingQuestions[npcId] > 0; 
    }
    window.isTalkingTo = isTalkingTo;


document.getElementById('help').addEventListener('click', showHelp);

function validateMission(npcId) {
    console.log(`🟢 validateMission() appelé pour ${npcId}`);

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

    const missionId = missionMapping[npcId];
    const mission = findMissionById(missionId);

    console.log(`🎯 Mission trouvée pour ${npcId} :`, mission);

    if (mission && !mission.completed) {
        console.log(`✅ Mission ${missionId} validée.`);
        updateMission(missionId);
        updateMissionDisplay(getMissions());

    }   

    if (questionMissionMapping[npcId]) {
        if (remainingQuestions[npcId] === 0) {
            console.log(`🎯 Mission de questions validée pour ${npcId}`);
            updateMission(questionMissionMapping[npcId]);
            updateMissionDisplay(getMissions());
        } else {
            console.log(`⚠ Il reste ${remainingQuestions[npcId]} questions à répondre.`);
        }
    }
}
window.validateMission = validateMission;




// Event listener pour désactiver les clics pendant un dialogue ouvert
document.querySelectorAll('.clickable').forEach(hitbox => {
hitbox.addEventListener('click', function () {
    if (isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    currentNpcId = this.id;
    openDialogue(this.id);
    validateMission(currentNpcId);
});
});

    document.getElementById('mission-panel').setAttribute('visible', 'false');
    updateMissionDisplay(getMissions());
    document.getElementById('mission-panel').setAttribute('visible', 'true');
    // Function to check the answer and display the feedback message


    const dialogueBox = document.getElementById('dialogue-box');
        dialogueBox.addEventListener('click', function(event) {
            if (event.target.className == 'close') {
                closeDialogue();
                updateMissionDisplay(getMissions());
            }
        });
        const answer = document.querySelector('.clickableChoice');
        answer.addEventListener('click', function(event) {
            if (event.target.id === 'close') {
                console.log("Fermeture du dialogue"); // Debug
                closeDialogue();
                updateMissionDisplay(getMissions());
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



    export function checkAnswer(question, selectedIndex) {
        console.log(currentNpcId);
        if (!question) {
            console.error("No question available!");
            closeDialogue();
            validateMission(currentNpcId);
            return;
        }
        if (!isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    
        if (selectedIndex === question.correct) {
            showFeedbackMessage("✅ Correct! +1 Point", true);
            updateScore(addScore());
    
            delete currentQuestion[currentNpcId];
    
            remainingQuestions[currentNpcId]--;
            if (remainingQuestions[currentNpcId] === 0) {
                console.log(currentNpcId);
                validateMission(currentNpcId);
            }
        } else {
            showFeedbackMessage("❌ Wrong! Try again.", false);
        }
    
        closeDialogue();
    }
    if(totalQuestions==0  ){endGame('questions', getScore());}
    // window.checkAnswer = checkAnswer;
    window.updateHitboxPosition = updateHitboxPosition;

