import * as data from "./datas/defaultDatas.js";
if(localStorage.getItem("Save1") == null) {
    localStorage.setItem("Save1", JSON.stringify(data.defaultData));
}

if(localStorage.getItem("Save2") == null) {
    localStorage.setItem("Save2", JSON.stringify(data.defaultData));
}

if(localStorage.getItem("Save3") == null) {
    localStorage.setItem("Save3", JSON.stringify(data.defaultData));
}

if(localStorage.getItem("Save4") == null) {
    localStorage.setItem("Save4", JSON.stringify(data.defaultData));
}

if(localStorage.getItem("Save5") == null) {
    localStorage.setItem("Save5", JSON.stringify(data.defaultData));
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
        localStorage.setItem("Save" + JSON.parse(localStorage.getItem('SaveId')), JSON.stringify(data.defaultData));
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