export let questionsNPC1 = [
    {
        question: "Which dish is a New York classic often sold by street vendors?",
        choices: ["Hot dog", "Croissant"],
        correct: 0,
        difficulty: "easy"
    },
    {
        question: "Which New York deli sandwich is famous for its layers of pastrami?",
        choices: ["Pastrami on Rye", "BLT"],
        correct: 0,
        difficulty: "medium"
    },
    {
        question: "Which dessert is considered a New York specialty?",
        choices: ["New York Cheesecake", "Macarons"],
        correct: 0,
        difficulty: "easy"
    },
    {
        question: "What is the name of the iconic New York-style pizza?",
        choices: ["Thin crust, large slice", "Deep-dish pizza"],
        correct: 0,
        difficulty: "medium"
    },
    {
        question: "Which neighborhood is famous for its bagels and Jewish bakeries?",
        choices: ["Lower East Side", "Harlem"],
        correct: 0,
        difficulty: "hard"
    },
    {
        question: "Which drink is most commonly associated with New York breakfast culture?",
        choices: ["Coffee", "Green Tea"],
        correct: 0,
        difficulty: "easy"
    }
];


    export let sentenceNPCSpawn= {
        question: "Welcome to New York! Take your time to explore. Meet every people and speak with them to learn more about the city. The first one is waiting for you at the busness district and name Mickael. Good luck!",
    }
    export let questionsNPC2 = [
        {
            question: "Which area in New York is known as the financial hub of the city?",
            choices: ["Wall Street", "Broadway"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which famous stock exchange is located in New York?",
            choices: ["New York Stock Exchange (NYSE)", "London Stock Exchange"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "What is a common way to network in New York's business world?",
            choices: ["Attending industry events", "Avoiding social interactions"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Which building is known for housing many tech startups?",
            choices: ["Silicon Alley", "Empire State Building"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is the typical working culture in New York?",
            choices: ["Fast-paced and competitive", "Relaxed and slow"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "Where do many entrepreneurs and freelancers work in New York?",
            choices: ["Co-working spaces", "Central Park"],
            correct: 0,
            difficulty: "hard"
        }
    ];
    
    
    export let questionsNPC3 = [
        {
            question: "Which park is popular for outdoor activities like jogging and cycling?",
            choices: ["Central Park", "Madison Square Park"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Where can you go ice skating in winter in New York?",
            choices: ["Rockefeller Center", "Times Square"],
            correct: 0,
            difficulty: "easy"
        },
        {
            question: "Which New York borough is famous for its street art and music scene?",
            choices: ["Brooklyn", "Queens"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "What is a popular weekend activity for New Yorkers who love books?",
            choices: ["Visiting The Strand Bookstore", "Shopping at Macy's"],
            correct: 0,
            difficulty: "medium"
        },
        {
            question: "Where do people go in New York to watch basketball games?",
            choices: ["Madison Square Garden", "Yankee Stadium"],
            correct: 0,
            difficulty: "hard"
        },
        {
            question: "Which area in NYC is known for its vibrant nightlife and comedy clubs?",
            choices: ["Greenwich Village", "Wall Street"],
            correct: 0,
            difficulty: "hard"
        }
    ];
    
    export let questionsNPC4 = [
        { 
            question: "Which landmark offers the best panoramic view of New York City?", 
            choices: ["Empire State Building", "Statue of Liberty"], 
            correct: 0, 
            difficulty: "easy" 
        },
        { 
            question: "Where can you watch a Broadway show?", 
            choices: ["Times Square", "Central Park"], 
            correct: 0, 
            difficulty: "easy" 
        },
        { 
            question: "Which museum is famous for its modern art collection?", 
            choices: ["Museum of Modern Art (MoMA)", "The Louvre"], 
            correct: 0, 
            difficulty: "medium" 
        },
        { 
            question: "Which New York park is known as 'the lungs of the city'?", 
            choices: ["Central Park", "Bryant Park"], 
            correct: 0, 
            difficulty: "medium" 
        },
        { 
            question: "What is the name of the famous street known for high-end shopping?", 
            choices: ["5th Avenue", "Wall Street"], 
            correct: 0, 
            difficulty: "hard" 
        },
        { 
            question: "Where can you take a free ferry ride with a great view of the Statue of Liberty?", 
            choices: ["Staten Island Ferry", "Brooklyn Bridge"], 
            correct: 0, 
            difficulty: "hard" 
        }
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
         return question;
        }
        export let dialogues = {
            'npc1-hitbox': questionsNPC1.map(q => ({ ...q, correct: q.correct + 1 })), // Transforme l'indice 0-based en 1-based
            'npc2-hitbox': questionsNPC2.map(q => ({ ...q, correct: q.correct + 1 })),
            'npc3-hitbox': questionsNPC3.map(q => ({ ...q, correct: q.correct + 1 })),
            'npc4-hitbox': questionsNPC4.map(q => ({ ...q, correct: q.correct + 1 }))
        };
        export let remainingQuestions = {
            'npc1-hitbox': questionsNPC1.length,
            'npc2-hitbox': questionsNPC2.length,
            'npc3-hitbox': questionsNPC3.length,
            'npc4-hitbox': questionsNPC4.length
            
        };
    export let totalQuestions = remainingQuestions.length;