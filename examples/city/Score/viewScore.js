
/**
 * Updates the displayed score on the webpage.
 *
 * This function sets the value attribute of the HTML element with the ID 'score'
 * to display the provided score.
 *
 * @param {number} score - The score to be displayed.
 */
function updateScore(score) {
    document.getElementById('score').setAttribute("value", `Score: `+ score);
    
}

export { updateScore};