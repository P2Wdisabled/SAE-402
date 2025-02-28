// view.js (Vue) - Gère l'affichage et le DOM
export function showDialogueBox(npcId, question) {
    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.setAttribute('visible', 'true');
    document.getElementById('dialogue-text').setAttribute('value', question);
}

export function hideDialogueBox() {
    document.getElementById('dialogue-box').setAttribute('visible', 'false');
}

export function updateMissionDisplay(missions) {
    const missionPanel = document.getElementById('mission-panel');
    missionPanel.innerHTML = "";
    missions.forEach((mission, index) => {
        const missionText = document.createElement('a-text');
        missionText.setAttribute('value', (mission.completed ? "✅ " : "❌ ") + mission.text);
        missionPanel.appendChild(missionText);
    });
}

// controller.js (Contrôleur) - Gère les interactions utilisateur
import { showDialogueBox, hideDialogueBox, updateMissionDisplay } from './view.js';
import { updateMission, savePlayerData, loadPlayerData, remainingQuestions } from './model.js';

document.addEventListener("DOMContentLoaded", async () => {
    await loadPlayerData();
    document.querySelectorAll('.clickable').forEach(hitbox => {
        hitbox.addEventListener('click', function () {
            if (remainingQuestions[this.id] > 0) {
                showDialogueBox(this.id, "Random Question?");
            }
        });
    });
    document.getElementById('dialogue-box').addEventListener('click', hideDialogueBox);
    updateMissionDisplay(remainingQuestions);
});