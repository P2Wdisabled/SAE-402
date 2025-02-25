document.addEventListener("DOMContentLoaded", () => {
    let isDay = true;
    const sky = document.getElementById("sky");
    const sun = document.getElementById("sun");
    const moon = document.getElementById("moon");
    
    setInterval(() => {
      isDay = !isDay;
      if (isDay) {
        sky.setAttribute("color", "#87CEEB"); // Bleu ciel
        sun.setAttribute("visible", "true");
        moon.setAttribute("visible", "false");
      } else {
        sky.setAttribute("color", "#1a1a2e"); // Bleu nuit
        sun.setAttribute("visible", "false");
        moon.setAttribute("visible", "true");
      }
    }, 500000); // Change toutes les 5 secondes
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
        difficulty: "medium"
    },
    {
        question: "You need to go to Manhattan. What do you ask the taxi driver?",
        choices: ["Take me to Manhattan, please.", "Go Manhattan now!"],
        correct: 0,
        difficulty: "easy"
    },
    

    ];

    let sentenceNPCSpawn= {
        question: "Welcome to New York! Take your time to explore. Meet every people and speak with them to learn more about the city. The first one is waiting for you at the end of the street and name Mickael. Good luck!",
    }
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
        difficulty: "easy"
    },
    {
        question: "Which subway line takes you to Central Park?",
        choices: ["Q", "A"],
        correct: 0,
        difficulty: "hard"
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
        difficulty: "easy"
    }
    ];
    let questionsNPC4 = [
        { 
            question: "What is a typical dessert associated with New York?", 
            choices: ["Cheesecake", "Churros"], 
            correct: 1, 
            difficulty: "easy" 
        },
        { 
            question: "Which museum is famous for its modern art collection?", 
            choices: ["MOMA", "Musee d'Orsay"], 
            correct: 1, 
            difficulty: "medium" 
        },
        { 
            question: "Where would you find the famous Apollo Theater?", 
            choices: ["Harlem", "Wall Street"], 
            correct: 1, 
            difficulty: "hard" 
        },
        { 
            question: "What do many New Yorkers call the public transit system?", 
            choices: ["Underground", "Subway"], 
            correct: 2, 
            difficulty: "easy" 
        }
    ];
    const translations = {
        "You just arrived in New York. How do you greet the customs officer?": "Vous venez d'arriver à New York. Comment saluez-vous l'agent des douanes ?",
        "What is the English word for 'aéroport'?": "Quel est le mot anglais pour 'aeroport' ?",
        "At JFK Airport, what do you say to get a taxi?": "À l'aeroport JFK, que dites-vous pour obtenir un taxi ?",
        "You need to go to Manhattan. What do you ask the taxi driver?": "Vous devez aller à Manhattan. Que demandez-vous au chauffeur de taxi ?",
        "At a coffee shop, how do you order a coffee politely?": "Dans un cafe, comment commandez-vous un café poliment ?",
        "You are lost in the subway. What do you ask?": "Vous êtes perdu dans le metro. Que demandez-vous ?",
        "You enter a restaurant. What does 'Takeout or dine-in?' mean?": "Vous entrez dans un restaurant. Que signifie 'À emporter ou sur place ?'",
        "Which one is a typical New York food?": "Lequel est un aliment typique de New York ?",
        "Which subway line takes you to Central Park?": "Quelle ligne de metro vous emmène à Central Park ?",
        "A New Yorker tells you 'It's a piece of cake!'. What does it mean?": "Un New-Yorkais vous dit 'It's a piece of cake!'. Que signifie cette phrase ?",
        "Someone says 'I'm in a rush'. What does it mean?": "Quelqu'un dit 'I'm in a rush'. Que signifie cette phrase ?",
        "You're in Brooklyn and someone says 'The L train is down'. What does it mean?": "Vous etes à Brooklyn et quelqu'un dit 'The L train is down'. Que signifie cette phrase ?",
        "A street vendor says 'That'll be ten bucks'. What does 'bucks' mean?": "Un vendeur de rue dit 'That'll be ten bucks'. Que signifie 'bucks' ?",
        "Someone says 'Let's grab a slice'. What are they talking about?": "Quelqu'un dit 'Let's grab a slice'. De quoi parle-t-il ?"
    };



   // Easing function for smoother movement
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // Smooth movement and rotation logic for the character


    let dialogues = {
        'npc1-hitbox': questionsNPC1.map(q => ({ ...q, correct: q.correct + 1 })), // Transforme l'indice 0-based en 1-based
        'npc2-hitbox': questionsNPC2.map(q => ({ ...q, correct: q.correct + 1 })),
        'npc3-hitbox': questionsNPC3.map(q => ({ ...q, correct: q.correct + 1 })),
        'npc4-hitbox': questionsNPC4.map(q => ({ ...q, correct: q.correct + 1 }))
    };
    let remainingQuestions = {
        'npc1-hitbox': questionsNPC1.length,
        'npc2-hitbox': questionsNPC2.length,
        'npc3-hitbox': questionsNPC3.length,
        'npc4-hitbox': questionsNPC4.length
    };

    let score = 0;
    function getRandomQuestion(npcId) {
        let questionsList;
        if (npcId === 'npc1-hitbox') questionsList = questionsNPC1;
        if (npcId === 'npc2-hitbox') questionsList = questionsNPC2;
        if (npcId === 'npc3-hitbox') questionsList = questionsNPC3;
        if (npcId === 'npc4-hitbox') questionsList = questionsNPC4;
        
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
let chronostarted = false;
function openDialogue(npcId) {
    if (isDialogueOpen) return;
    isDialogueOpen = true;
    if (!chronostarted) {
        startChrono();
        chronostarted = true;
    }

    console.log("Opening of the dialog box:", npcId);

    const dialogueBox = document.getElementById('dialogue-box');
    dialogueBox.setAttribute('visible', 'true');

    if (npcId === 'npcSpawn-hitbox') {
        // Display only the spawn message
        document.getElementById('dialogue-text').setAttribute('value', sentenceNPCSpawn.question);

        // Hide choices
        document.getElementById('choice1').setAttribute('visible', 'false');
        document.getElementById('choice2').setAttribute('visible', 'false');
        document.getElementById('remaining-text').setAttribute('visible', 'false');
        document.getElementById('difficulty-text').setAttribute('visible', 'false');
        return;
    }

    // If it's a regular NPC, continue with normal question handling
    const randomQuestion = getRandomQuestion(npcId);
    if (!randomQuestion) {

        let nextNPCName = '';
        switch (npcId) {
            case 'npc1-hitbox':
                nextNPCName = 'Luke at the park';
                break;
            // case 'npc2-hitbox':
            //     nextNPCName = 'Greg';
            //     break;
            case 'npc2-hitbox':
                nextNPCName = 'Greg in front of the greatest tower of NY';
                break;
                case 'npc3-hitbox':
                    nextNPCName = 'Jack at the biggest statue of NY';
                    break;
            // default:
            //     nextNPCName = '';
        }
        if(nextNPCName){
        document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Please go see " + nextNPCName);}
        else{
            document.getElementById('dialogue-text').setAttribute('value', "You have answered all the questions. Good Job you are a real New Yorker.");
        }
        
        // Masquer les choix lorsque plus aucune question n'est disponible
        document.getElementById('choice1').setAttribute('visible', 'false');
        document.getElementById('choice2').setAttribute('visible', 'false');
        document.getElementById('remaining-text').setAttribute('visible', 'true');
        document.getElementById('difficulty-text').setAttribute('visible', 'false');

        isDialogueOpen = false;
        return;
    }
    document.getElementById('remaining-text').setAttribute('visible', 'true');
    document.getElementById('difficulty-text').setAttribute('visible', 'true');
    document.getElementById('choice1').setAttribute('visible', 'true');
    document.getElementById('choice2').setAttribute('visible', 'true');
    document.getElementById('dialogue-text').setAttribute('value', randomQuestion.question);
    document.getElementById('difficulty-text').setAttribute('value', `Difficulty: ${randomQuestion.difficulty}`);
    document.getElementById('remaining-text').setAttribute('value', `Remaining: ${remainingQuestions[npcId]}`);

    document.getElementById('choice1').style.display = "block";
    document.getElementById('choice1').setAttribute('text', `value: ${randomQuestion.choices[0]}; color: lightblue;`);
    document.getElementById('choice1').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 0)`);

    document.getElementById('choice2').style.display = "block";
    document.getElementById('choice2').setAttribute('text', `value: ${randomQuestion.choices[1]}; color: lightgreen;`);
    document.getElementById('choice2').setAttribute('onclick', `checkAnswer(${JSON.stringify(randomQuestion)}, 1)`);
}
// Make sure “choice1” has a click event listener:
// document.getElementById('choice1').addEventListener('click', () => {
//     checkAnswer(randomQuestion, 0);
// });



function showTranslation() {
    const dialogueText = document.getElementById('dialogue-text');
    const currentText = dialogueText.getAttribute('value');

    // Vérifier si la phrase a une traduction disponible
    if (translations[currentText]) {
        dialogueText.setAttribute('value', translations[currentText]);
    } else {
        dialogueText.setAttribute('value', "Traduction non disponible.");
    }
}

document.getElementById('help').addEventListener('click', showTranslation);


// Event listener pour désactiver les clics pendant un dialogue ouvert
document.querySelectorAll('.clickable').forEach(hitbox => {
hitbox.addEventListener('click', function () {
    if (isDialogueOpen) return; // Empêche les clics si un dialogue est ouvert
    openDialogue(this.id);
});
});


function showFeedbackMessage(text, isCorrect) {
    const feedback = document.getElementById('feedback-message');
    const textFeedback = document.getElementById('feedback-text');
    // Rendre visible immédiatement
    feedback.setAttribute('position','0, 0.5, -1');
    feedback.setAttribute('visible', 'true');
    console.log(feedback);
    // S'assurer que le texte et la couleur s'affichent correctement
    // feedback.setAttribute('text', `value: ${text}; color: white; align: center; font: mozillavr; wrapCount: 25;`);
    
    // Couleur et effet lumineux selon correct/faux
    if(isCorrect){
        feedback.setAttribute('material', `color: rgb(41, 45, 41); opacity: 0.5; shader: standard;`);
        textFeedback.setAttribute('value', ` ${text}; `);
        textFeedback.setAttribute('color', 'green');
        textFeedback.setAttribute('font', 'mozillavr');
        

    }else{
        feedback.setAttribute('material', `color: rgb(41, 45, 41); opacity: 0.5; shader: standard;`);
        textFeedback.setAttribute('value', ` ${text}; `);
        textFeedback.setAttribute('color', '#ff0000');
        textFeedback.setAttribute('font', 'mozillavr');
    }

    // Déclencher l'animation d'apparition
    // feedback.emit('showFeedback');

    // Cacher après 2 secondes (avec sécurité pour éviter qu'il reste bloqué)
    setTimeout(() => {
        feedback.setAttribute('material', 'opacity: 0'); // Réduction progressive
        setTimeout(() => {
            feedback.setAttribute('visible', 'false');
        }, 500); // Donne le temps au fade de s'appliquer
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
                score++;
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



    let timeRemaining = 600;
    async function loadPlayerThings() {
        const storedData = localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId')));
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
        timeRemaining = data.time;

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
            questionsNPC3: questionsNPC3,
            time: timeRemaining
        };

        localStorage.setItem('Save' + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(playerData));
    }

    function endGame(endType) {
        if (endType === 'timeout') {
            alert('Time is up! Game over!');
        } else if (endType === 'questions') {
            alert('You have answered all questions!');
        }
    }

    let chronoString = '';
    let intervalId = null;

    async function updateChrono() {
        if (timeRemaining <= 0) {
            timeRemaining = 0;
            clearInterval(intervalId);
            await endGame('timeout');
            return;
        }
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        chronoString = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        document.getElementById('time').setAttribute("value", `time left: ${chronoString}`);
    }

    async function startChrono() {
        if (!intervalId) {
            intervalId = setInterval(async () => {
                await updateChrono();
            }, 1000);
        }
    }

    setInterval(() => {
        savePlayerThings();
    }, 500);

    loadPlayerThings();