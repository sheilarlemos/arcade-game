const TILE_WIDTH = 101;
const TILE_HEIGHT = 83;
const PLAYER_WIDTH = 101;
const PLAYER_HEIGHT = 171;
const CANVAS_WIDTH = 505;
const CANVAS_HEIGHT = 606;
const VELOCITY = [20, 200];

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.direction = random(0, 1) === 0 ? 'left' : 'right';
    if (this.direction === 'left') {
        this.sprite = 'images/enemy-bug.png';
    } else {
        this.sprite = 'images/enemy-bug.png'; // TODO: trocar pela correta
    }
    this.velocity = random(VELOCITY[0], VELOCITY[1]);
    this.y = random(TILE_HEIGHT, TILE_HEIGHT * 3);
        
    if (this.direction === 'left') {
        this.x = -TILE_WIDTH;
    } else {
        this.x = CANVAS_WIDTH;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.direction === 'left') {
        this.x += this.velocity * dt;
    } else {
        this.x -= this.velocity * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.velocity = 100;
    this.x = 205;
    this.y = 400;
};

Player.prototype.update = function(dt) {

    // validate
    // if y < 0 || y > h - hb then return
    
    

    if (this.direction === 'left') {
        const x = this.x - this.velocity * dt;
        if (x < 0) {
            return;
        }
        this.x = x;
    } else if (this.direction === 'right') {
        const x = this.x + this.velocity * dt;
        if (x > CANVAS_WIDTH - PLAYER_WIDTH) {
            return;
        }
        this.x = x;
    } else if (this.direction === 'up') {
        const y = this.y - this.velocity * dt;
        if (y < 0) {
            return;
        }
        this.y = y;
    } else if (this.direction === 'down') {
        const y = this.y + this.velocity * dt;
        if (y > CANVAS_HEIGHT - PLAYER_HEIGHT) {
            return;
        }
        this.y = y;
    }

    //console.log(this.x, this.y, this.velocity, dt)
    // which will ensure the game runs at the same speed for
    // all computers.
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    this.direction = direction;
};

const allEnemies = [new Enemy(), new Enemy(), new Enemy()];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    player.handleInput(null);
});


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
