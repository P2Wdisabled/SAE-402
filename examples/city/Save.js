export async function loadPlayerThings() {
    //load player data from local storage using the stored "saveId" that define the save to use
    let storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
    //if there's no saved data, return early
    if (!storedData) return;
    //parse the data to a JSON object
    let data = JSON.parse(storedData);
    //return the parsed data
    return data;
}

//function to save the player's data to local storage
export async function savePlayerThings(remainingQuestions, questionsNPC1, questionsNPC2, questionsNPC3, questionsNPC4, dialogues, missions, timeRemaining, score, position) {
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