export async function loadPlayerThings() {
    let storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
    if (!storedData) return;

    let data = JSON.parse(storedData);
    return data;
}

export async function savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, missions, timeRemaining, score, position) {
    const rotation = document.querySelector('[camera]').object3D.rotation;
    const playerData = {
        score: score,
        position: position,
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