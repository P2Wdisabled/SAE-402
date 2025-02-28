export let isDialogueOpen = false;
export function updateDialogueStatus(value) {
    isDialogueOpen = value;
}



export function closeDialogue() {
    // if (!isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    document.getElementById('mission-panel').setAttribute('visible', 'true');
    const dialogueBox = document.getElementById('dialogue-box');
    const overlay = document.getElementById('overlay');
    
    dialogueBox.setAttribute('visible', 'false');
    overlay.setAttribute('visible', 'false');

    isDialogueOpen = false; // Réactive l'interaction
}