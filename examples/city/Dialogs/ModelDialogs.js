export let isDialogueOpen = false;
export function updateDialogueStatus(value) {
    isDialogueOpen = value;
}



/**
 * Closes the dialogue by hiding the dialogue box and overlay, and setting the mission panel to visible.
 * 
 * This function performs the following actions:
 * 1. Sets the 'visible' attribute of the element with ID 'mission-panel' to 'true'.
 * 2. Sets the 'visible' attribute of the element with ID 'dialogue-box' to 'false'.
 * 3. Sets the 'visible' attribute of the element with ID 'overlay' to 'false'.
 * 4. Sets the global variable `isDialogueOpen` to `false`.
 */
export function closeDialogue() {
    // if (!isDialogueOpen) return; 
    document.getElementById('mission-panel').setAttribute('visible', 'true');
    const dialogueBox = document.getElementById('dialogue-box');
    const overlay = document.getElementById('overlay');
    
    dialogueBox.setAttribute('visible', 'false');
    overlay.setAttribute('visible', 'false');

    isDialogueOpen = false;
}