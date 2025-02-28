/**
 * Play a sound from a given source.
 *
 * This function creates an audio element, starts playing it immediately,
 * and stops it after a specified duration if provided.
 *
 * @param {string} src - The source URL of the audio file.
 * @param {number|null} [duration=null] - The duration in milliseconds after which the sound will be stopped.
 */
export function playSound(src, duration = null) {
    let audio = new Audio(src);  // Create an audio element
    audio.play();  // Play the sound immediately

    console.log(`🎵 Playing sound: ${src}`);

    // If a duration is provided, stop the sound after the specified time
    if (duration) {
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;  // Reset the sound to the beginning for future playback
            console.log(`⏹️ Sound stopped after ${duration} ms`);
        }, duration);
    }
}
