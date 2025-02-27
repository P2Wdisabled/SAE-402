import { missions } from "../data/MissionData.js";
let missionData =  missions;
function updateMission(missionId) {
    missionData = missionData.map(mission => 
        mission.id === missionId ? { ...mission, completed: true } : mission
    );
    console.log(missionData.find(m => m.id === missionId));
    return missionData;
}
// function getMission() {
//     // let mission = missions.find(m => m.id );
//     return missionData;
// }
export {updateMission, missionData};