const words = [
    'cat', 'dog', 'bat', 'hat', 'mat', 'pen', 'pig', 'bus', 'fox', 'bag',
    'rat', 'net', 'sun', 'mud', 'jam', 'cup', 'leg', 'box', 'zip', 'leg',
    'web', 'wig', 'leg', 'mud', 'hut', 'bun', 'gum', 'sit', 'pig', 'pot',
    'cut', 'hat', 'nap', 'bug', 'lap', 'job', 'run', 'dot', 'fan', 'pat',
    'box', 'sky', 'cup', 'dot', 'kit', 'win', 'nut', 'hot', 'lot', 'top'
];

const letters = document.querySelectorAll('.letter');
const wordContainer = document.getElementById('word-container');
const audioPlayer = document.getElementById('audio-player');
const confettiColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
const bgColors = ['#FFDDC1', '#C1E4FF', '#C1FFD4', '#FFB6C1', '#D5B6FF'];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord(word) {
    letters[0].textContent = word[0];
    letters[1].textContent = word[1];
    letters[2].textContent = word[2];
}

function highlightLetter(index) {
    letters.forEach((letter, i) => letter.classList.toggle('highlight', i === index));
}

function changeBackgroundColor() {
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    document.body.style.transition = 'background-color 1s';
    document.body.style.backgroundColor = randomColor;
    setTimeout(() => {
        document.body.style.backgroundColor = '#f0f0f0'; // Reset to original color
    }, 1000);
}

function startAnimation() {
    const word = getRandomWord();
    displayWord(word);

    let index = 0;

    function animateLetter() {
        highlightLetter(index);
        index = (index + 1) % 3;

        if (index === 0) {
            // After the third letter, highlight all letters
            setTimeout(() => {
                letters.forEach(letter => letter.classList.add('highlight'));
                changeBackgroundColor(); // Change background color for confetti effect
                createConfetti();
                setTimeout(() => {
                    letters.forEach(letter => letter.classList.remove('highlight')); // Remove highlight from all letters
                    wordContainer.style.color = 'black'; // Reset color to black
                    setTimeout(() => {
                        startAnimation(); // Start over with a new word
                    }, 4000); // Wait 4 seconds before restarting
                }, 1000); // Hold the word displayed for 1 second
            }, 1000); // Hold the third letter for 1 second
        } else {
            setTimeout(animateLetter, 1000); // Continue to the next letter
        }
    }

    animateLetter();
}

function createConfetti() {
    const confettiCount = 300; // Increase the number of confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`; // Random width between 5px and 15px
        confetti.style.height = confetti.style.width;
        confetti.style.left = `${Math.random() * 100}vw`; // Position across the viewport width
        confetti.style.top = `${Math.random() * 100}vh`; // Position across the viewport height
        confetti.style.animationDuration = '1s'; // Set animation duration to 1 second
        confetti.style.animationTimingFunction = 'ease-out'; // Smooth end for the animation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000); // Remove confetti after 1 second
    }
}

startAnimation();
