import { missions } from "../data/MissionData.js";
let missionData =  missions;
function updateMission(missionId) {
    let mission = findMissionById(missionId);
    if (mission) {
        mission.completed = true;  // ✅ Modification directe
        console.log(`✅ Mission ${missionId} mise à jour !`);
    } else {
        console.error(`❌ Mission ${missionId} introuvable !`);
    }

    console.log("📢 État actuel des missions :", getMissions());  // 🔎 Vérifie si la mise à jour fonctionne
}

function findMissionById(id) {
    return missionData.find(m => m.id === id);
}

function getMissions() {

    return missionData; 
}

export { updateMission, getMissions, findMissionById };