// import { updateScore } from "./viewScore.js";
let score = 0;
export function addScore() { 
    score++;
    return score;
 }
export function getScore() {  
    return score;
    
}

export function setscore(value) {
    score = value;
}
// export { score, addScore };