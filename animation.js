import clikable from './clikable.js';

AFRAME.registerComponent('stop-animation-on-click', {
    init: function () {
      let entity = this.el;
      
      this.el.addEventListener('click', function () {
        entity.setAttribute('animation-mixer', 'clip: none'); // Stoppe l'animation
        
      });
    }
  });

AFRAME.registerComponent('start-animation-on-correct-answer', {
    schema: {
      correctAnswer: {type: 'string'}
    },
    init: function () {
      let entity = this.el;
      let correctAnswer = this.data.correctAnswer;
      
      this.el.addEventListener('click', function (evt) {
        if (evt.target.getAttribute('id') === correctAnswer) {
          entity.setAttribute('animation-mixer', 'clip: *'); // Reprend l'animation
          console.log("Bonne réponse ! Animation relancée !");
        }
      });
    }
  });

  
  // Appliquer le composant au NPC
  document.querySelector("#npc2-entity").setAttribute("stop-animation-on-click", "");
  document.querySelector("#npc3-entity").setAttribute("stop-animation-on-click", "");
// document.querySelector("#npc3-entity").setAttribute("start-animation-on-correct-answer", "correctAnswer: npc2");


document.querySelector("#npc3-entity").addEventListener("model-loaded", function (event) {
    let model = event.detail.model;
    let animations = model.animations.map(a => a.name); // Récupère les noms des animations
    console.log("Animations disponibles :", animations);
  });