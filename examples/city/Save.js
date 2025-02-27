export async function loadPlayerThings() {
    let storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
    if (!storedData) return;

    let data = JSON.parse(storedData);
    score = data.score;
    document.getElementById('rig').setAttribute('position', data.position);

    console.log(data.rotation._x, data.rotation._y, data.rotation._z);

    document.querySelector('[camera]').object3D.rotation.set(
        data.rotation._x,
        data.rotation._y,
        data.rotation._z
    );

    remainingQuestions = data.remainingQuestions
    dialogues = data.dialogues
    missions = data.missions
    questionsNPC1 = data.questionsNPC1
    questionsNPC2 = data.questionsNPC2
    questionsNPC3 = data.questionsNPC3
    questionsNPC4 = data.questionsNPC4
    
    timeRemaining = data.time;

    updateScore();
    savePlayerThings();
}

export async function savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, missions, timeRemaining, score, position) {
    const rotation = document.querySelector('[camera]').object3D.rotation;
    const playerData = {
        score: score,
        position: position,
        rotation: {
            _order: rotation._order,
            _x: rotation._x,
            _y: rotation._y,
            _z: rotation._z
        },
        remainingQuestions: remainingQuestions,
        dialogues: dialogues,
        missions: missions,
        questionsNPC1: questionsNPC1,
        questionsNPC2: questionsNPC2,
        questionsNPC3: questionsNPC3,
        questionsNPC4: questionsNPC4,
        time: timeRemaining
    };

    localStorage.setItem('Save' + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(playerData));
}