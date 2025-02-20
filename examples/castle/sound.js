// // Fonction pour démarrer le son ambiant.
// function playCitySound() {
//     // Remplacez 'audio/ambient.mp3' par le chemin vers votre fichier audio.
//     const ambientSound = new Audio('audio/NY.mp3');
    
//     // Configurer le son pour qu'il se répète.
//     ambientSound.loop = true;
    
//     // Ajuster le volume si nécessaire (valeur entre 0.0 et 1.0).
//     ambientSound.volume = 0.5;
    
//     // Démarrer la lecture.
//     ambientSound.play().catch(error => {
//         console.error("Erreur lors de la lecture du son ambiant:", error);
//     });
// }

// const nyParkElement = document.getElementById("NYPark");

// if (nyParkElement) {
//     // On utilise un IntersectionObserver pour détecter quand l'élément NYPark est visible
//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // Arrêter le son par défaut s'il est en cours (il faut que le son par défaut soit stocké dans une variable globale, par exemple window.ambientSoundDefault)
//                 if (window.ambientSoundDefault) {
//                     window.ambientSoundDefault.pause();
//                 }
//                 // Lancer le son spécifique à NYPark
//                 const nyAmbientSound = new Audio('audio/NYPark.mp3');
//                 nyAmbientSound.loop = true;
//                 nyAmbientSound.volume = 0.1;
//                 nyAmbientSound.play().catch(error => {
//                     console.error("Erreur lors de la lecture du son près du parc :", error);
//                 });
//                 // Une fois le son lancé, on n'a plus besoin de l'observer
//                 observer.disconnect();
//             }
//         });
//     }, { threshold: 0.5 }); // Ajustez le seuil selon vos besoins

//     observer.observe(nyParkElement);
// }
// // Assurez-vous que le DOM est chargé avant de démarrer le son
// document.addEventListener('DOMContentLoaded', playCitySound);