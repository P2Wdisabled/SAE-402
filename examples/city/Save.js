import { updateMissionData } from "./data/MissionData.js";
import {setTimeRemaining, getTimeRemaining} from "./Timer/ModelTimer.js";
import {updateTimer} from "./Timer/viewTimer.js";
import {setscore, getScore} from "./Score/modelScore.js";
import {updateScore} from "./Score/viewScore.js";
import {getMissions} from "./Mission/ModelMission.js"
import {updateMissionDisplay} from "./Mission/ViewMission.js"
import {remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, setDatas} from "./data/QuestionData.js";
export async function loadPlayerThings() {
    //load player data from local storage using the stored "saveId" that define the save to use
    let storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
    //if there's no saved data, return early
    if (!storedData) return;
    //parse the data to a JSON object
    let data = JSON.parse(storedData);
    updateMissionData(data.mission)
    //return the parsed data
    setDatas(data.questionsNPC1, data.questionsNPC2, data.questionsNPC3, data.questionsNPC4, data.dialogues, data.remainingQuestions)
    setscore(data.score);
    updateScore(data.score);
    // document.getElementById('rig').getAttribute('position') = data.position;
    updateMissionDisplay(data.missions);
    setTimeRemaining(data.time);
    updateTimer(data.time)
}

//function to save the player's data to local storage
export async function savePlayerThings() {
    const playerData = {
        score: getScore(),
        position: document.getElementById('rig').getAttribute('position'),
        remainingQuestions: remainingQuestions,
        dialogues: dialogues,
        missions: getMissions(),
        questionsNPC1: questionsNPC1,
        questionsNPC2: questionsNPC2,
        questionsNPC3: questionsNPC3,
        questionsNPC4: questionsNPC4,
        time: getTimeRemaining()
    };

    localStorage.setItem('Save' + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(playerData));
}

export async function startSaving() {
    setInterval(async () => {
        await savePlayerThings();
    }, 1000);
}