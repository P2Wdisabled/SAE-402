
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

const defaultData = {
    score: score,
    position:   {"x": 0, "y": 0 , "z": 0},
    rotation: {
        _order: "YXZ",
        _x: 0,
        _y: 0,
        _z: 0
    },
    remainingQuestions: remainingQuestions,
    dialogues: dialogues,
    questionsNPC1: questionsNPC1,
    questionsNPC2: questionsNPC2,
    questionsNPC3: questionsNPC3,
    time: 600
};
if(localStorage.getItem("Save1") == null) {
    localStorage.setItem("Save1", JSON.stringify(defaultData));
}

if(localStorage.getItem("Save2") == null) {
    localStorage.setItem("Save2", JSON.stringify(defaultData));
}

if(localStorage.getItem("Save3") == null) {
    localStorage.setItem("Save3", JSON.stringify(defaultData));
}

if(localStorage.getItem("Save4") == null) {
    localStorage.setItem("Save4", JSON.stringify(defaultData));
}

if(localStorage.getItem("Save5") == null) {
    localStorage.setItem("Save5", JSON.stringify(defaultData));
}

useSave("1")
function useSave(id) {
    localStorage.setItem("SaveId", JSON.stringify(id));
    let saves = document.querySelectorAll(".clickableChoice");
    saves.forEach(save => {
        save.setAttribute("text", "color: lightgreen; wrapCount: 20; font: mozillavr; width: 1.5");
        save.setAttribute("event-set__mouseenter", "_event: mouseenter; text.color: lime");
        save.setAttribute("event-set__mouseleave", "_event: mouseleave; text.color: lightgreen");
    });
    document.getElementById(id).setAttribute("text", "color: lightblue; wrapCount: 20; font: mozillavr; width: 1.5");
    document.getElementById(id).setAttribute("event-set__mouseenter", "_event: mouseenter; text.color: blue");
    document.getElementById(id).setAttribute("event-set__mouseleave", "_event: mouseleave; text.color: lightblue");
}

const dialogueBox = document.getElementById('dialogue-box');
dialogueBox.addEventListener('click', function(event) {
    if (event.target.className === 'start') window.location.href = './examples/city/';
    if (event.target.className === 'delete') {
        localStorage.setItem("Save" + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(defaultData));
        console.log(localStorage.getItem('SaveId'));
        console.log(localStorage.getItem('Save' + JSON.parse(localStorage.getItem('SaveId'))));
        location.href = location;
        return;
    }
});

document.querySelectorAll('.clickableChoice').forEach(hitbox => {
    hitbox.addEventListener('click', function () {
        console.log(this.id);
        useSave(this.id);
    });
    });