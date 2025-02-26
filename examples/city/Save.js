// import { questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4 } from "./data/QuestionData.js";
// import { missions } from "./data/MissionData.js";
// import { updateScore } from "./Score.js";
// import {  remainingQuestions, dialogues } from "./data/QuestionData.js";
// let localQuestionsNPC1 = [...questionsNPC1];
// let localQuestionsNPC2 = [...questionsNPC2];
// let localQuestionsNPC3 = [...questionsNPC3];
// let localQuestionsNPC4 = [...questionsNPC4];
// let localDialogues = { ...dialogues };
// let localRemainingQuestions = { ...remainingQuestions };
// let timeRemaining = 600;
// let score = updateScore;
// async function loadPlayerThings() {
//     let storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
//     if (!storedData) return;

//     let data = JSON.parse(storedData);
//     score = data.score;
//     document.getElementById('rig').setAttribute('position', data.position);

//     console.log(data.rotation._x, data.rotation._y, data.rotation._z);

//     document.querySelector('[camera]').object3D.rotation.set(
//         data.rotation._x,
//         data.rotation._y,
//         data.rotation._z
//     );

//     localRemainingQuestions = { ...data.remainingQuestions };
//     localDialogues = { ...data.dialogues };
//     localQuestionsNPC1 = [...data.questionsNPC1];
//     localQuestionsNPC2 = [...data.questionsNPC2];
//     localQuestionsNPC3 = [...data.questionsNPC3];
//     localQuestionsNPC4 = [...data.questionsNPC4];
    
//     timeRemaining = data.time;

//     updateScore();
//     savePlayerThings();
// }

// async function savePlayerThings() {
//     const rotation = document.querySelector('[camera]').object3D.rotation;
//     const playerData = {
//         score: score,
//         position: document.getElementById('rig').getAttribute('position'),
//         rotation: {
//             _order: rotation._order,
//             _x: rotation._x,
//             _y: rotation._y,
//             _z: rotation._z
//         },
//         localRemainingQuestions: remainingQuestions,
//         localDialogues: dialogues,
//         questionsNPC1: questionsNPC1,
//         questionsNPC2: questionsNPC2,
//         questionsNPC3: questionsNPC3,
//         questionsNPC4: questionsNPC4,
//         time: timeRemaining
//     };

//     localStorage.setItem('Save' + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(playerData));
// }
// export { loadPlayerThings, savePlayerThings };