// import { updateScore } from "./viewScore.js";
let score = 0;
/**
 * Increments the score by 1 and returns the updated score.
 *
 * @returns {number} The updated score after incrementing.
 */
export function addScore() { 
    score++;
    return score;
 }
export function getScore() {  
    return score;
    
}
// export { score, addScore };