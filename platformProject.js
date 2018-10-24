import {game, Sprite} from "./sgc/sgc.js";

// game.setBackground();

class Wall extends Sprite {
    constructor(x, y, name, image) {
        super();
        this.x = x;
        this.y = y;
        this.name = name;
        this.setImage(image);
        this.accelerateOnBounce = false;
    }
}

new Wall(0, 0, "Wall", "horizontalWall.png");
new Wall(0, 599, "Wall", "horizontalWall.png");

class Support extends Sprite {
    constructor(x, y, image) {
        super();
        this.x = x;
        this.y = y;
        this.setImage(image);
    }
}

class Platform extends Support {
    constructor(x, y, image) {
        super(x, y, image);
        this.name = "A Platform";
        this.accelerateOnBounce = false;
    }
}

let startPlatform = new Platform(0, 500, "start.png");
let finishPlatform = new Platform(704, 200, "finish.png");


class Slider extends Support {
    constructor(x, y, speed) {
        super(x, y);
        this.setImage("start.png");
        this.speed = speed;
        this.accelerateOnBounce = false;
    }
    handleGameLoop() {
        if (this.y <= 50) {
            this.angle = 270;
        }
        if (this.y >= 500) {
            this.angle = 90;
        }
    }
}

new Slider(101, 500, 50);
new Slider(202, 500, 100);
new Slider(302, 500, 150);
new Slider(403, 500, 200);
new Slider(503, 500, 250);
new Slider(604, 500, 300);

class Princess extends Sprite {
    constructor(x, y, image) {
        super(x, y);
        this.setImage("ann.png");
        this.speed = 0;
        this.speedWhenWalking = 125;
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
        this.isFalling = false;
    }
    handleLeftArrowKey() {
        this.angle = 180;
        this.speed = this.speedWhenWalking;
    }
    handleRightArrowKey() {
        this.angle = 0;
        this.speed = this.speedWhenWalking;
    }
    handleGameLoop() {
        if (this.angle == 0 && this.speed >= 0) {
            this.playAnimation = this.handleRightArrowKey();
        }
        if (this.angle == 180 && this.speed >= 0) {
            this.playAnimation = this.handleLeftArrowKey();
        }
        this.x = Math.max(5, this.x);
        this.isFalling = false; 
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 5, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true; 
            this.y = this.y + 4; 
        }
    }
    handleSpacebar() {
        if (!this.isFalling) {
            this.y = this.y - 1.25 * this.height;
        }
    }
    handleBoundaryContact() {
        game.end('Princess Ann has drowned.\n\nBetter luck next time.');
        this.true;
    }
}

let ann = new Princess(5, 450, "ann.png");

class Door extends Sprite {
    constructor() {
        super();
        this.setImage("door.png");
        this.x = 732;
        this.y = 104;
        this.accelerateOnBounce = false;
    }
    handleCollision(otherSprite) {
    if(otherSprite === ann) {
        game.end( 'Congratulations!\n\nPrincess Ann can now pursue ' 
        + 'the\nstranger deeper into the castle!');
        }    
    }
}

let exit = new Door();
exit.name = "The exit door";