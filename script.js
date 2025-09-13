const playerOne = document.getElementById("player-one");
const ai = document.getElementById("ai");
const ball = document.getElementById("ball");

document.addEventListener('mousemove', (event) => {
    // Player movement
    const mouseY = event.clientY;
    const playerOneHeight = playerOne.offsetHeight;

    const topPosition = mouseY - playerOneHeight / 2;

    const clampedTop = Math.max(0, Math.min(window.innerHeight - playerOneHeight, topPosition));

    playerOne.style.top = clampedTop + 'px';

    // AI movement
    const aiClampedTop = Math.max(0, window.innerHeight);

    ai.style.top = aiClampedTop + 'px';
});

let ballX = 200;
let ballY = 200;
let dx = 3; // horizontal speed
let dy = 2; // vertical speed

function update() {
    // Move ball
    ballX += dx;
    ballY += dy;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Bounce off top/bottom
    if (ballY <= 0 || ballY + ball.offsetHeight >= window.innerHeight) {
        dy = -dy;
    }

    // Player paddle collision
    const playerRect = playerOne.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    if (
        ballRect.left <= playerRect.right &&
        ballRect.right >= playerRect.left &&
        ballRect.top <= playerRect.bottom &&
        ballRect.bottom >= playerRect.top
    ) {
        dx = Math.abs(dx); // always bounce right
    }

    // AI paddle collision
    const aiRect = ai.getBoundingClientRect();
    if (
        ballRect.left <= aiRect.right &&
        ballRect.right >= aiRect.left &&
        ballRect.top <= aiRect.bottom &&
        ballRect.bottom >= aiRect.top
    ) {
        dx = -Math.abs(dx); // always bounce left
    }

    requestAnimationFrame(update);
}

// Start game loop
update();