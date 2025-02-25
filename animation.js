AFRAME.registerComponent('stop-animation-on-click', {
  init: function () {
    let entity = this.el;
    
    this.el.addEventListener('click', function () {
      entity.setAttribute('animation-mixer', 'clip: none');
      console.log("Animation arrêtée !");
    });
  }
});

// Appliquer le composant au NPC
document.querySelector("#npc2-entity").setAttribute("stop-animation-on-click", "");

document.querySelector("#npc2-entity").setAttribute("change-animation", "");
document.querySelector("#npc3-entity").setAttribute("change-animation", "");
document.querySelector("#npc4-entity").setAttribute("change-animation", "");
  


document.querySelector("#npc1-entity").addEventListener("model-loaded", function (event) {
    let model = event.detail.model;
    let animations = model.animations.map(a => a.name);
    console.log("Animations disponibles :", animations);
  });