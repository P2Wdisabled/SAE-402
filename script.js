


        // Fonction d'easing pour un mouvement plus fluide
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Logique de déplacement fluide et de rotation pour le personnage
        function movePNJRandomly(pnjId, min, max) {
            const pnj = document.querySelector(`#${pnjId}`);
            
            // Nouvelle position aléatoire
            const targetX = Math.random() * (max - min) + min;
            const targetZ = Math.random() * (max - min) + min;

            // Initialiser la position actuelle
            const currentPosition = pnj.getAttribute('position');
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
                pnj.setAttribute('position', { x: newX, y: currentPosition.y, z: newZ });

                // Récupérer l'angle actuel du PNJ
                const currentRotation = pnj.getAttribute('rotation');
                const currentAngle = currentRotation.y;

                // Interpolation de la rotation pour une transition fluide
                const newRotationY = currentAngle + (targetAngle - currentAngle) * easedProgress;
                pnj.setAttribute('rotation', { x: 0, y: newRotationY, z: 0 });

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
            movePNJRandomly('pnj1-entity', -10, 10);
            movePNJRandomly('pnj2-entity', -10, 10);
            movePNJRandomly('pnj3-entity', -10, 10);
        }, 1000);