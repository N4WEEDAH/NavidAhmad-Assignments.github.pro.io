// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// Shape class (base class)
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball)) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// EvilCircle class (inherits from Shape)
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20); // velocity for EvilCircle
    this.color = "white";
    this.size = 10;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  checkBounds() {
    if (this.x < this.size) this.x = this.size;
    if (this.x > width - this.size) this.x = width - this.size;
    if (this.y < this.size) this.y = this.size;
    if (this.y > height - this.size) this.y = height - this.size;
  }
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // Ball is eaten by the evil circle
        }
      }
    }
  }
}

const balls = [];
const evilCircle = new EvilCircle(100, 100);

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  count++;
  para.textContent = 'BBall count:'+count;
}
// Score tracking
let ballCount = balls.length;
const ballCountElement = document.createElement('p');
ballCountElement.id = 'ballCount';
document.body.appendChild(ballCountElement);

// Update the score display
function updateBallCount() {
  ballCount = balls.filter(ball => ball.exists).length;
  ballCountElement.textContent = `Ball count: ${ballCount}`;
}

// Handle user input to move EvilCircle
window.addEventListener("keydown", (e) => {
  const vel = 20;
  switch (e.key) {
    case "a":
      evilCircle.x -= vel;
      break;
    case "d":
      evilCircle.x += vel;
      break;
    case "w":
      evilCircle.y -= vel;
      break;
    case "s":
      evilCircle.y += vel;
      break;
    case "ArrowLeft":
      evilCircle.x -= vel;
      break;
    case "ArrowRight":
      evilCircle.x += vel;
      break;
    case "ArrowUp":
      evilCircle.y -= vel;
      break;
    case "ArrowDown":
      evilCircle.y += vel;
      break;
  }
});

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();


  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
  updateBallCount();
  requestAnimationFrame(loop);
}

loop();