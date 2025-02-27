import { missions } from "../data/MissionData.js";
let missionData =  missions;
function updateMission(missionId) {
    missionData = missionData.map(mission => 
        mission.id === missionId ? { ...mission, completed: true } : mission
    );
    console.log(missionData.find(m => m.id === missionId));
    return missionData;
}

function validateMission(npcId) {
    // console.log(`🔎 Validation des missions pour ${npcId}`);

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
        // console.log(`🎯 Mission de dialogue validée pour ${npcId}`);
        updateMission(missionMapping[npcId]);
        
    }   

    if (questionMissionMapping[npcId]) {
        if (remainingQuestions[npcId] === 0) {
            // console.log(`🎯 Mission de questions validée pour ${npcId}`);
            updateMission(questionMissionMapping[npcId]);
            // updateMissionDisplay(missionData);
        } else {
            console.log(`⚠ Il reste ${remainingQuestions[npcId]} questions à répondre.`);
        }
    }
}
window.validateMission = validateMission;
// function getMission() {
//     // let mission = missions.find(m => m.id );
//     return missionData;
// }
export {updateMission, missionData};