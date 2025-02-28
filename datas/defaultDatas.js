
let questionsNPC1 = [
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
let sentenceNPCSpawn= {
    question: "Welcome to New York! Take your time to explore. Meet every people and speak with them to learn more about the city. The first one is waiting for you at the busness district and name Mickael. Good luck!",
}
let questionsNPC2 = [
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


let questionsNPC3 = [
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

let questionsNPC4 = [
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
    let missions = [
        { id: 1, text: "Talk to Steve (Spawn NPC)", completed: false },
        { id: 2, text: "Talk to Greg", completed: false },
        { id: 3, text: "Ask Greg food", completed: false },
        { id: 4, text: "Talk to Mickael", completed: false },
        { id: 5, text: "Speak about Business with Mickael", completed: false },
        { id: 6, text: "Talk to Luke", completed: false },
        { id: 7, text: "Ask about New York Hobbies to Luke", completed: false },
        { id: 8, text: "Talk to Jack", completed: false },
        { id: 9, text: "Speak about tourism with Jack", completed: false }
    ];

export const defaultData = {
    score: score,
    position:   {"x": 0, "y": 0 , "z": 0},
    remainingQuestions: remainingQuestions,
    dialogues: dialogues,
    questionsNPC1: questionsNPC1,
    questionsNPC2: questionsNPC2,
    questionsNPC3: questionsNPC3,
    questionsNPC4: questionsNPC4,
    missions: missions,
    time: 600
};