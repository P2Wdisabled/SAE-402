        // Fonction d'easing pour un mouvement plus fluide
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Logique de déplacement fluide et de rotation pour le personnage
        function moveNPCRandomly(npcId, min, max) {
            const npc = document.querySelector(`#${npcId}`);
            
            // Nouvelle position aléatoire
            const targetX = Math.random() * (max - min) + min;
            const targetZ = Math.random() * (max - min) + min;

            // Initialiser la position actuelle
            const currentPosition = npc.getAttribute('position');
            const currentX = currentPosition.x;
            const currentZ = currentPosition.z;

            // Calculer la direction du mouvement
            const dx = targetX - currentX;
            const dz = targetZ - currentZ;
            const targetAngle = Math.atan2(dz, dx) * (180 / Math.PI); // Convertir l'angle en degrés

            // Durée du mouvement en millisecondes
            const duration = 3000; // 3 secondes

            // Animation fluide de la rotation et du déplacement
            let startTime;
            function animateMovement(time) {
                if (!startTime) startTime = time;
                const elapsedTime = time - startTime;

                // Calcul du pourcentage du mouvement
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = easeInOutQuad(progress);

                // Interpolation linéaire entre la position actuelle et la nouvelle position
                const newX = currentX + dx * easedProgress;
                const newZ = currentZ + dz * easedProgress;

                // Mettre à jour la position
                npc.setAttribute('position', { x: newX, y: currentPosition.y, z: newZ });

                // Récupérer l'angle actuel du NPC
                const currentRotation = npc.getAttribute('rotation');
                const currentAngle = currentRotation.y;

                // Interpolation de la rotation pour une transition fluide
                const newRotationY = currentAngle + (targetAngle - currentAngle) * easedProgress;

                npc.setAttribute('rotation', { x: 0, y: newRotationY, z: 0 });

                // Continuer l'animation tant que le mouvement n'est pas terminé
                if (progress < 1) {
                    requestAnimationFrame(animateMovement);
                }
            }

            // Lancer l'animation
            requestAnimationFrame(animateMovement);
        }

        // Déplacer le personnage de manière aléatoire toutes les 10 secondes
        setInterval(() => {
            moveNPCRandomly('npc1-container', -10, 10);
            moveNPCRandomly('npc2-container', -10, 10);
            moveNPCRandomly('npc3-container', -10, 10);
        }, 10000);
        
        // Fonction pour ouvrir la pop-up de dialogue avec le bon message
        function openDialogue(pnjId) {
            let dialogue = dialogues[pnjId];
        
            if (dialogue) {
                document.getElementById('dialogue-text').innerText = dialogue.text;
                document.getElementById('choice1').innerText = dialogue.choices[0];
                document.getElementById('choice2').innerText = dialogue.choices[1];
        
                // Sauvegarder les réponses pour la sélection
                document.getElementById('choice1').setAttribute('data-response', dialogue.responses[0]);
                document.getElementById('choice2').setAttribute('data-response', dialogue.responses[1]);
        
                document.getElementById('dialogue-box').style.display = 'block';
                document.getElementById('overlay').style.display = 'block';
            }
        }
        
        // Fonction pour gérer la sélection d'un choix
        function handleChoice(choiceNumber) {
            let responseText = document.getElementById(`choice${choiceNumber}`).getAttribute('data-response');
            document.getElementById('dialogue-text').innerText = responseText;
        
            // Masquer les boutons après la réponse
            document.getElementById('choice1').style.display = 'none';
            document.getElementById('choice2').style.display = 'none';
        }
        
        // Fonction pour fermer la pop-up et réinitialiser les boutons
        function closeDialogue() {
            document.getElementById('dialogue-box').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        
            // Réafficher les choix pour le prochain dialogue
            document.getElementById('choice1').style.display = 'inline-block';
            document.getElementById('choice2').style.display = 'inline-block';
        }
        
        // Ajouter un événement de clic pour chaque hitbox
        document.querySelectorAll('.clickable').forEach(hitbox => {
            hitbox.addEventListener('click', function () {
                openDialogue(this.id);
            });
        });
        // Fonction pour mettre à jour la position des hitbox selon les déplacements des NPC
        function updateHitboxPosition() {
            document.querySelectorAll('.clickable').forEach(hitbox => {
                let parent = hitbox.parentElement;
                let position = parent.getAttribute('position');

                if (position) {
                    hitbox.setAttribute('position', { x: 0, y: 1, z: 0 });
                }
            });
        }
        const dialogues = {
            'npc1-hitbox': {
                text: "Hi, I'm NPC 1! What do you want to do?",
                choices: ["Talk", "Ignore"],
                responses: ["Great! Let's chat.", "Alright, see you later."]
            },
            'npc2-hitbox': {
                text: "Hello, I'm NPC 2! What do you choose?",
                choices: ["Ask for advice", "Walk away"],
                responses: ["Of course! Here's my advice...", "Alright, have a great day."]
            },
            'npc3-hitbox': {
                text: "Hey! I'm NPC 3!",
                choices: ["Shake hands", "Nod"],
                responses: ["A warm handshake!", "A respectful nod in return."]
            }
        };
        
        // Rafraîchir la position des hitbox toutes les 50ms
        setInterval(updateHitboxPosition, 50);