

/**
 * Updates the mission display panel with the given missions.
 * 
 * This function removes all existing mission text elements from the mission panel
 * and then creates and appends new mission text elements based on the provided missions.
 * Each mission text element displays a checkmark if the mission is completed, 
 * otherwise, it displays a cross mark.
 * 
 * @param {Array} mission - An array of mission objects. Each mission object should have the following properties:
 *   @param {boolean} mission.completed - Indicates whether the mission is completed.
 *   @param {string} mission.text - The text description of the mission.
 */
export function updateMissionDisplay(mission) {
    const missionPanel = document.getElementById('mission-panel');
    missionPanel.querySelectorAll('.mission-text').forEach(el => el.remove());
    console.log(mission);
    let missions = mission; 

    missions.forEach((mission, index) => {
        console.log(mission.completed);
        const missionText = document.createElement('a-text');
        missionText.setAttribute('value', (mission.completed ? "✅ " : "❌ ") + mission.text);
        missionText.setAttribute('color', mission.completed ? 'green' : 'white');
        missionText.setAttribute('align', 'center');
   
        missionText.setAttribute('font', 'mozillavr');
        missionText.setAttribute('width', '1.7');
        missionText.setAttribute('position', `0 ${0.8 - index * 0.2} 0.01`);
        missionText.classList.add('mission-text');
        missionPanel.appendChild(missionText);
    });
}
