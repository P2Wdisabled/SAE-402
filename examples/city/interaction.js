import { remainingQuestions} from "./data/QuestionData.js";
import { closeDialogue, isDialogueOpen} from "./Dialogs/ModelDialogs.js";
import { openDialogue, showHelp} from "./Dialogs/ViewDialogs.js";
import { missionData} from "./Mission/ModelMission.js";
import { updateMissionDisplay } from "./Mission/ViewMission.js";
// let missions = missionData.missions;
// let timeRemaining = timer.timeRemaining
document.addEventListener("DOMContentLoaded", () => {
    let isDay = true;
    const sky = document.getElementById("sky");
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    
    setInterval(() => {
      isDay = !isDay;
      if (isDay) {
        sky.setAttribute("color", "#87CEEB"); 
        sun.setAttribute("visible", "true");
        moon.setAttribute("visible", "false");
      } else {
        sky.setAttribute("color", "#1a1a2e");
        sun.setAttribute("visible", "false");
        moon.setAttribute("visible", "true");
      }
    }, 500000); 
  });


   // Easing function for smoother movement
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Smooth movement and rotation logic for the character




document.getElementById('help').addEventListener('click', showHelp);


// Event listener pour désactiver les clics pendant un dialogue ouvert
document.querySelectorAll('.clickable').forEach(hitbox => {
hitbox.addEventListener('click', function () {
    if (isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    openDialogue(this.id);
});
});

    document.getElementById('mission-panel').setAttribute('visible', 'false');
    updateMissionDisplay(missionData);

    document.getElementById('mission-panel').setAttribute('visible', 'true');
    // Function to check the answer and display the feedback message


    const dialogueBox = document.getElementById('dialogue-box');
        dialogueBox.addEventListener('click', function(event) {
            if (event.target.className == 'close') {
                closeDialogue();
            }
        });
        const answer = document.querySelector('.clickableChoice');
        answer.addEventListener('click', function(event) {
            if (event.target.id === 'close') {
                console.log("Fermeture du dialogue"); // Debug
                closeDialogue();
            }
        });       
    // Removed redundant event delegation for '.choice' as inline onclick events are already being used.
    // Function to 
    // update the position of the hitboxes to match the parent NPC position
    function updateHitboxPosition() {
        document.querySelectorAll('.clickable').forEach(hitbox => {
            let parent = hitbox.parentElement;
            let position = parent.getAttribute('position');

            if (position) {
                hitbox.setAttribute('position', '0 1 0');
            }
        });
    }

    window.updateHitboxPosition = updateHitboxPosition;
    if(remainingQuestions==0){endGame('questions', currentScore);}