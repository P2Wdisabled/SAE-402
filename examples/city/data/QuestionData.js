export let questionsNPC1 = [
    {
        question: "How do we name the crispy, salty snack made from thin slices of potatoes?",
        choices: ["Fries","Chips"],
        correct: 1,
        difficulty: "hard"
    },
    {
        question: "How do we name the long, curved, yellow fruit that you peel before eating?",
        choices: ["Banana", "Apple"],
        correct: 0,
        difficulty: "medium"
    },
    {
        question: "How do we name the hot drink made from roasted beans?",
        choices: ["Coffee", "Tea"],
        correct: 0,
        difficulty: "medium"
    },
    {
        question: "How do we name the white liquid that comes from cows and is rich in calcium?",
        choices: [ "Water","Milk"],
        correct: 1,
        difficulty: "easy"
    },
    {
        question: "How do we name the food made from flour and water that is a staple in many meals?",
        choices: ["Bread", "Rice"],
        correct: 0,
        difficulty: "easy"
    },
];



    export let sentenceNPCSpawn= {
        question: "Welcome to New York! Take your time to explore. Meet every people and speak with them to learn more about the city. The first one is waiting for you at the busness district and name Mickael. Good luck!",
    }
    export let questionsNPC2 = [
        {
            question: "How do we name the extra cost you pay when you borrow money?",
            choices: [ "Deposit","Interest"],
            correct: 1,
            difficulty: "hard"
        },
        {
            question: "How do we name the money you earn from working?",
            choices: [ "Prize", "Salary"],
            correct: 1,
            difficulty: "medium"
        },
        {
            question: "How do we name the physical money you use to buy things?",
            choices: ["Cash", "Credit"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How do we name the money you keep aside for future use?",
            choices: [ "Spending","Savings"],
            correct: 1,
            difficulty: "easy"
        },
        {
            question: "How do we name the money that you borrow from a bank?",
            choices: ["Loan", "Gift"],
            correct: 0,
            difficulty: "medium"
        },
    ];
    
    
    
    export let questionsNPC3 = [
        {
            question: "How do we name the hobby of taking pictures?",
            choices: ["Photography", "Painting"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "How do we name the hobby of making drawings with pencils or colors?",
            choices: [ "Singing","Drawing"],
            correct: 1,
            difficulty: "medium"
        },
        {
            question: "How do we name the hobby of playing a musical instrument?",
            choices: [ "Cooking","Music"],
            correct: 1,
            difficulty: "medium"
        },
        {
            question: "How do we name the hobby of reading books?",
            choices: ["Reading", "Dancing"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "How do we name the hobby where you create things with your hands?",
            choices: [ "Running","Crafting"],
            correct: 1,
            difficulty: "easy"
        },
    ];
    


    
    export let questionsNPC4 = [
        {
            question: "How do we name the person who helps tourists find their way in a city?",
            choices: [ "Driver","Guide"],
            correct: 1,
            difficulty: "hard"
        },
        {
            question: "How do we name the book that provides information about tourist attractions?",
            choices: ["Guidebook", "Notebook"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "How do we name the activity of visiting famous sights in a city?",
            choices: [ "Sleeping", "Sightseeing"],
            correct: 1,
            difficulty: "easy"
        },
        {
            question: "How do we name the small keepsake you buy when visiting a new place?",
            choices: [ "Accessory","Souvenir"],
            correct: 1,
            difficulty: "medium"
        },
        {
            question: "How do we name the planned route or schedule for a trip?",
            choices: ["Itinerary", "Recipe"],
            correct: 0,
            difficulty: "hard"
        },

    ];
    export function getRandomQuestion(npcId) {
        let questionsList;
        if (npcId === 'npc1-hitbox') questionsList = questionsNPC1;
        if (npcId === 'npc2-hitbox') questionsList = questionsNPC2;
        if (npcId === 'npc3-hitbox') questionsList = questionsNPC3;
        if (npcId === 'npc4-hitbox') questionsList = questionsNPC4;
        
        if (!questionsList || questionsList.length === 0) {
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * questionsList.length);
        const question = questionsList.splice(randomIndex, 1)[0];
        remainingQuestions[npcId] = questionsList.length; 
        console.log(question.correct)
         return question;
        }
        export let dialogues = {
            'npc1-hitbox': questionsNPC1.map(q => ({ ...q, correct: q.correct  })), // Transforme l'indice 0-based en 1-based
            'npc2-hitbox': questionsNPC2.map(q => ({ ...q, correct: q.correct  })),
            'npc3-hitbox': questionsNPC3.map(q => ({ ...q, correct: q.correct  })),
            'npc4-hitbox': questionsNPC4.map(q => ({ ...q, correct: q.correct  }))
        };
        export let remainingQuestions = {
            'npc1-hitbox': questionsNPC1.length,
            'npc2-hitbox': questionsNPC2.length,
            'npc3-hitbox': questionsNPC3.length,
            'npc4-hitbox': questionsNPC4.length  
            
        };

    export let totalQuestions = questionsNPC1.length + questionsNPC2.length + questionsNPC3.length + questionsNPC4.length - 1;
    export function addTotalQuestions(number) {
        totalQuestions =totalQuestions - number
    }
