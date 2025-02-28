import { remainingQuestions, addTotalQuestions, totalQuestions } from "./data/QuestionData.js";
import { closeDialogue, isDialogueOpen } from "./Dialogs/ModelDialogs.js";
import { openDialogue, showHelp } from "./Dialogs/ViewDialogs.js";
import { getMissions, updateMission, findMissionById } from "./Mission/ModelMission.js";
import { updateMissionDisplay } from "./Mission/ViewMission.js";
import { showFeedbackMessage } from "./Dialogs/ViewDialogs.js";
import { updateScore } from "./Score/viewScore.js";
import { addScore, getScore } from "./Score/modelScore.js";
import { endGame } from "./Timer/viewTimer.js";
import { playSound } from "./sounds/sound.js";

let currentNpcId = null;
let currentQuestion = {};

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

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function isTalkingTo(npcId) {
    return remainingQuestions[npcId] > 0;
}
window.isTalkingTo = isTalkingTo;

document.getElementById('help').addEventListener('click', showHelp);

function validateMission(npcId) {
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

    if (mission && !mission.completed) {
        updateMission(missionId);
        updateMissionDisplay(getMissions());
        playSound("sounds/mission.mp3", 2000);
    }

    if (questionMissionMapping[npcId]) {
        if (remainingQuestions[npcId] === 0) {
            updateMission(questionMissionMapping[npcId]);
            updateMissionDisplay(getMissions());
            playSound("sounds/mission.mp3", 2000);
        }
    }
}
window.validateMission = validateMission;

document.querySelectorAll('.clickable').forEach(hitbox => {
    hitbox.addEventListener('click', function () {
        if (isDialogueOpen) return;
        currentNpcId = this.id;
        openDialogue(this.id);
        validateMission(currentNpcId);
    });
});

document.getElementById('mission-panel').setAttribute('visible', 'false');
updateMissionDisplay(getMissions());
document.getElementById('mission-panel').setAttribute('visible', 'true');

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
        closeDialogue();
        updateMissionDisplay(getMissions());
    }
});

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
    if (!question) {
        closeDialogue();
        validateMission(currentNpcId);
        return;
    }
    if (!isDialogueOpen) return;
    console.log(question.correct)
    console.log(selectedIndex)
    if (selectedIndex === question.correct) {
        console.log(question.correct)
        
        showFeedbackMessage("✅ Correct! +1 Point", true);
        playSound("sounds/correct.mp3", 2000);
        updateScore(addScore());
        delete currentQuestion[currentNpcId];
        addTotalQuestions(1);
        remainingQuestions[currentNpcId]--;
        if (remainingQuestions[currentNpcId] === 0) {
            addTotalQuestions(1);
            validateMission(currentNpcId);
        }
    } else {
        showFeedbackMessage("❌ Wrong! Try again.", false);
        playSound("sounds/wrong.mp3", 1000);
    }
    
    closeDialogue();
}

if (totalQuestions == 0) { endGame('questions', getScore()); }
window.updateHitboxPosition = updateHitboxPosition;
window.checkAnswer = checkAnswer;