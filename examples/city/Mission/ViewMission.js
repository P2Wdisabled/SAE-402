

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
