import { missions } from "../data/MissionData.js";
let missionData =  missions;
/**
 * Updates the status of a mission to completed based on the given mission ID.
 *
 * @param {number} missionId - The ID of the mission to update.
 * @returns {void}
 */
function updateMission(missionId) {
    let mission = findMissionById(missionId);
    if (mission) {
        mission.completed = true;  
        console.log(`✅ Mission ${missionId} mise à jour !`);
    } else {
        console.error(`❌ Mission ${missionId} introuvable !`);
    }

    console.log("📢 État actuel des missions :", getMissions()); 
}

function findMissionById(id) {
    return missionData.find(m => m.id === id);
}

function getMissions() {

    return missionData; 
}

export { updateMission, getMissions, findMissionById };