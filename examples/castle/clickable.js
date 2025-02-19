AFRAME.registerComponent('glow', {
    schema: {
      color: { default: '#ffffff', type: 'color' },
      intensity: { default: 1.0 }
    },
    init: function () {
      this.el.addEventListener('object3dset', function () {
        this.update();
      }.bind(this));
    },
    update: function () {
      var data = this.data;
      this.el.object3D.traverse(function (node) {
        if (node.isMesh) {
          node.material.emissive.copy(new THREE.Color(data.color));
          node.material.emissiveIntensity = data.intensity;
        }
      });
    }
  });

  /**
   * Simple spin-and-levitate animation.
   */
  AFRAME.registerComponent('levitate', {
    tick: function (t, dt) {
      var mesh = this.el.getObject3D('mesh');
      if (!mesh) return;
      mesh.rotation.y += 0.1 * dt / 1000;
      mesh.position.y = 0.25 * Math.sin(t / 1000);
    }
  });

  /**
   * Removes current element if on a mobile device.
   */
  AFRAME.registerComponent('not-mobile', {
    init: function () {
      var el = this.el;
      if (el.sceneEl.isMobile) {
        el.parentEl.remove(el);
      }
    }
  });

let questionsNPC1 = [

    {
        question: "You just arrived in New York. How do you greet the customs officer?",
        choices: ["Hi, how are you?", "Yo, what's up?"],
        correct: 0,
        difficulty: "easy"
    },
    {
        question: "What is the English word for 'aéroport'?",
        choices: ["Train station", "Airport"],
        correct: 1,
        difficulty: "easy"
    },
    {
        question: "At JFK Airport, what do you say to get a taxi?",
        choices: ["Give me a taxi!", "Can I get a taxi, please?"],
        correct: 1,
        difficulty: "easy"
    },
    {
        question: "You need to go to Manhattan. What do you ask the taxi driver?",
        choices: ["Take me to Manhattan, please.", "Go Manhattan now!"],
        correct: 0,
        difficulty: "easy"
    }
    ];
    
    let questionsNPC2 = [
    {
        question: "At a coffee shop, how do you order a coffee politely?",
        choices: ["I want coffee.", "Can I have a coffee, please?"],
        correct: 1,
        difficulty: "medium"
    },
    {
        question: "You are lost in the subway. What do you ask?",
        choices: ["Where is the metro?", "How do I get to Times Square?"],
        correct: 1,
        difficulty: "medium"
    },
    {
        question: "You enter a restaurant. What does 'Takeout or dine-in?' mean?",
        choices: ["Eat here or take away?", "Cash or credit card?"],
        correct: 0,
        difficulty: "medium"
    },
    {
        question: "Which one is a typical New York food?",
        choices: ["Baguette", "Hot dog"],
        correct: 1,
        difficulty: "medium"
    },
    {
        question: "Which subway line takes you to Central Park?",
        choices: ["A", "Q"],
        correct: 1,
        difficulty: "medium"
    }
    ];
    
    let questionsNPC3 = [
    {
        question: "A New Yorker tells you 'It's a piece of cake!'. What does it mean?",
        choices: ["It's delicious.", "It's very easy."],
        correct: 1,
        difficulty: "Hard"
    },
    {
        question: "Someone says 'I'm in a rush'. What does it mean?",
        choices: ["They are relaxing.", "They are in a hurry."],
        correct: 1,
        difficulty: "Hard"
    },
    {
        question: "You're in Brooklyn and someone says 'The L train is down'. What does it mean?",
        choices: ["The train is underground.", "The train is not working."],
        correct: 1,
        difficulty: "Hard"
    },
    {
        question: "A street vendor says 'That'll be ten bucks'. What does 'bucks' mean?",
        choices: ["Dollars", "Cents"],
        correct: 0,
        difficulty: "Hard"
    },
    {
        question: "Someone says 'Let's grab a slice'. What are they talking about?",
        choices: ["Pizza", "Cake"],
        correct: 0,
        difficulty: "Hard"
    }
    ];
   // Easing function for smoother movement
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Smooth movement and rotation logic for the character


    let dialogues = {
        'npc1-hitbox': questionsNPC1.map(q => ({ ...q, correct: q.correct + 1 })), // Transforme l'indice 0-based en 1-based
        'npc2-hitbox': questionsNPC2.map(q => ({ ...q, correct: q.correct + 1 })),
        'npc3-hitbox': questionsNPC3.map(q => ({ ...q, correct: q.correct + 1 }))
    };
    let remainingQuestions = {
        'npc1-hitbox': questionsNPC1.length,
        'npc2-hitbox': questionsNPC2.length,
        'npc3-hitbox': questionsNPC3.length
    };

    let score = 0;
    function getRandomQuestion(npcId) {
        let questionsList;
        if (npcId === 'npc1-hitbox') questionsList = questionsNPC1;
        if (npcId === 'npc2-hitbox') questionsList = questionsNPC2;
        if (npcId === 'npc3-hitbox') questionsList = questionsNPC3;
        
        if (!questionsList || questionsList.length === 0) {
            return null; // Plus de questions or invalid npcId
        }
    
        const randomIndex = Math.floor(Math.random() * questionsList.length);
        const question = questionsList.splice(randomIndex, 1)[0]; // Retire et retourne la question
        remainingQuestions[npcId] = questionsList.length; // Mise à jour du nombre de questions restantes
         return question;
        }
     // Ajoutez une variable pour vérifier si un dialogue est ouvert
let isDialogueOpen = false;

function openDialogue(npcId) {
if (isDialogueOpen) return; // Empêche l'ouverture d'un nouveau dialogue si déjà un dialogue est ouvert

isDialogueOpen = true; // Marquer que le dialogue est ouvert

console.log("Ouverture du dialogue pour :", npcId);

const randomQuestion = getRandomQuestion(npcId);
const dialogueBox = document.getElementById('dialogue-box');
dialogueBox.setAttribute('visible', 'true');

if (!randomQuestion) {
    document.getElementById('dialogue-text').setAttribute('value', "You have answered all questions");
    // Clear answer choices when there are no questions left
    document.getElementById('choice1').setAttribute('value', "");
    document.getElementById('choice1').removeAttribute('onclick');
    document.getElementById('choice2').setAttribute('value', "");
    document.getElementById('choice2').removeAttribute('onclick');
    // Optionally hide the dialogue after 3 seconds
    isDialogueOpen = false; // Réactive l'interaction   
    return;
}

document.getElementById('dialogue-text').setAttribute('value', randomQuestion.question);
document.getElementById('difficulty-text').setAttribute('value', `Difficulty: ${randomQuestion.difficulty}`);
document.getElementById('remaining-text').setAttribute('value', `Remaining: ${remainingQuestions[npcId]}`);

document.getElementById('choice1').setAttribute('value', randomQuestion.choices[0]);
document.getElementById('choice1').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 0)`);

document.getElementById('choice2').setAttribute('value', randomQuestion.choices[1]);
document.getElementById('choice2').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 1)`);
}


// Event listener pour désactiver les clics pendant un dialogue ouvert
document.querySelectorAll('.clickable').forEach(hitbox => {
hitbox.addEventListener('click', function () {
    if (isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    openDialogue(this.id);
});
});


    function showFeedbackMessage(text, isCorrect) {
        const feedback = document.getElementById('feedback-message');
        feedback.innerText = text;

        // Add the correct or wrong class to the feedback message
        if (isCorrect) {
            feedback.classList.remove("feedback-wrong");
            feedback.classList.add("feedback-correct");
        } else {
            feedback.classList.remove("feedback-correct");
            feedback.classList.add("feedback-wrong");
        }

        feedback.style.display = "block";

        // Made the feedback message disappear after 2 seconds
        setTimeout(() => {
            feedback.style.animation = "fadeOut 0.5s ease-out";
            setTimeout(() => {
                feedback.style.display = "none";
                feedback.style.animation = "fadeIn 0.3s ease-out"; // Reset the animation
            }, 500);
        }, 2000);
    }

    // Animation Css for the feedback message
    const fadeOutCSS = document.createElement("style");
    fadeOutCSS.innerHTML = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -55%); }
    }`;
    document.head.appendChild(fadeOutCSS);

    // Function to check the answer and display the feedback message
    function checkAnswer(question, selectedIndex) {
            if (selectedIndex === question.correct) {
                (question.difficulty == "easy") ? score++ : (question.difficulty == "medium") ? score += 2 : score += 3;
                showFeedbackMessage("✅ Correct! +1 Point", true);
            } else {
                showFeedbackMessage("❌ Wrong! Try again.", false);
            }
            updateScore();
            closeDialogue();
    }
    
    function updateScore() {
        document.getElementById('score').setAttribute("value", `Score: ${score}`);
        closeDialogue();
    }

    function closeDialogue() {
        savePlayerThings();
        console.log("Fermeture du dialogue...");
        
        const dialogueBox = document.getElementById('dialogue-box');
        const overlay = document.getElementById('overlay');
        
        dialogueBox.setAttribute('visible', 'false');
        overlay.setAttribute('visible', 'false');
    
        isDialogueOpen = false; // Réactive l'interaction
    }
    const dialogueBox = document.getElementById('dialogue-box');
        dialogueBox.addEventListener('click', function(event) {
            if (event.target.className == 'close') {
                console.log("Fermeture du dialogue"); // Debug
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

    /*async function moveNPCRandomly(npcId, min, max) {
        const npc = document.querySelector(`#${npcId}`);
        
        // Generate a new random position
        const targetX = Math.random() * (max - min) + min;
        const targetZ = Math.random() * (max - min) + min;

        // Get the current position
        const currentPosition = npc.getAttribute('position');
        const currentX = currentPosition.x;
        const currentZ = currentPosition.z;

        // Calculate the movement direction
        const dx = targetX - currentX;
        const dz = targetZ - currentZ;
        const targetAngle = Math.atan2(dz, dx) * (180 / Math.PI); // Convert angle to degrees

        // Duration of the movement in milliseconds
        const duration = 3000; // 3 seconds

        // Smooth animation for rotation and movement
        let startTime;
        function animateMovement(time) {
            if (!startTime) startTime = time;
            const elapsedTime = time - startTime;

            // Calculate the progress percentage of the movement
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOutQuad(progress);

            // Linear interpolation between the current position and the new position
            const newX = currentX + dx * easedProgress;
            const newZ = currentZ + dz * easedProgress;

            // Update the position
            npc.setAttribute('position', { x: newX, y: currentPosition.y, z: newZ });

            // Retrieve the current angle of the NPC
            const currentRotation = npc.getAttribute('rotation');
            const currentAngle = currentRotation.y;

            // Linear interpolation of the rotation for a smooth transition
            const newRotationY = currentAngle + (targetAngle - currentAngle) * easedProgress;

            npc.setAttribute('rotation', { x: 0, y: newRotationY, z: 0 });

            // Continue the animation until the movement is complete
            if (progress < 1) {
                requestAnimationFrame(animateMovement);
            }
        }

        // Start the animation
        requestAnimationFrame(animateMovement);
        updateHitboxPosition(); // Update the hitbox position to match the NPC
    }

    //arrow that point the next npc to interract
    // const arrow = document.getElementById('arrow');
    // const arrowPosition = arrow.getAttribute('position');
    // let arrowVisible = true;

    // function toggleArrowVisibility() {
    //     arrowVisible = !arrowVisible;
    //     arrow.setAttribute('visible', arrowVisible);
    // }

    // Move the arrow to the next NPC

    // function moveArrowToNPC(npcId) {
    //     const npc = document.querySelector(`#${npcId}`);
    //     const npcPosition = npc.getAttribute('position');
    //     arrow.setAttribute('position', { x: npcPosition.x, y: npcPosition.y + 2, z: npcPosition.z });
    // }

    // Move the arrow to the first NPC
    // moveArrowToNPC('npc1-container');

    // // Event listener for the arrow click
    // arrow.addEventListener('click', function () {
    //     toggleArrowVisibility();
    //     if (arrowVisible) {
    //         moveArrowToNPC('npc1-container');
    //     } else {
    //         moveArrowToNPC('npc2-container');
    //     }
    // });

    // Move the character randomly every 10 seconds
    setInterval(() => {
        moveNPCRandomly('npc1-container', -10, 10);
        moveNPCRandomly('npc2-container', -10, 10);
        moveNPCRandomly('npc3-container', -10, 10);
    }, 10000);*/

    async function loadPlayerThings() {
        const storedData = localStorage.getItem('playerData');
        if (!storedData) return;

        const data = JSON.parse(storedData);
        score = data.score;
        document.getElementById('rig').setAttribute('position', data.position);

        console.log(data.rotation._x, data.rotation._y, data.rotation._z);

        document.querySelector('[camera]').object3D.rotation.set(
            data.rotation._x,
            data.rotation._y,
            data.rotation._z
        );

        remainingQuestions = data.remainingQuestions;
        dialogues = data.dialogues;
        questionsNPC1 = data.questionsNPC1;
        questionsNPC2 = data.questionsNPC2;
        questionsNPC3 = data.questionsNPC3;

        updateScore();
        savePlayerThings();
    }

    async function savePlayerThings() {
        const rotation = document.querySelector('[camera]').object3D.rotation;
        const playerData = {
            score: score,
            position: document.getElementById('rig').getAttribute('position'),
            rotation: {
                _order: rotation._order,
                _x: rotation._x,
                _y: rotation._y,
                _z: rotation._z
            },
            remainingQuestions: remainingQuestions,
            dialogues: dialogues,
            questionsNPC1: questionsNPC1,
            questionsNPC2: questionsNPC2,
            questionsNPC3: questionsNPC3
        };

        localStorage.setItem('playerData', JSON.stringify(playerData));
    }

    setInterval(() => {
        savePlayerThings();
    }, 2000);

    loadPlayerThings();