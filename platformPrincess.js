import {game, Sprite} from "./sgc/sgc.js";

game.setBackground("water.png", 500, 0);

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

new Wall(0, 175, "Wall", "wall.png");

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

let startPlatform = new Platform(0, 400, "start.png");
let finishPlatform = new Platform(704, 400, "finish.png");

class Slider extends Support {
    constructor(x, y, angle) {
        super(x, y);
        this.setImage("slider.png");
        this.angle = angle;
        this.name = "A sliding support";
        this.speed = 48;
    }
}

new Slider(startPlatform.x + 48 * 3, startPlatform.y + 48, 0);
new Slider(finishPlatform.x - 48 * 5, finishPlatform.y + 48, 180);

class Princess extends Sprite {
    constructor(x, y, image) {
        super(48, 300);
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

let ann = new Princess(48, 300, "ann.png");

class Door extends Sprite {
    constructor() {
        super();
        this.setImage("door.png");
        this.x = game.displayWidth - 48;
        this.y = finishPlatform - 2 * 48;
        this.accelerateOnBounce = false;
    }
    handleCollision(otherSprite) {
    if(otherSprite === ann) {
        game.end( 'Congratulations!\n\nPrincess Ann can now pursue' 
        + 'the\nstranger deeper into the castle!');
        }    
    }
}

let exit = new Door();
exit.name = "The exit door";

class Spider {
    constructor(x, y) {
        super();
        this.setImage("spider.png");
        this.x = x;
        this.y = y;
        this.speed = 48;
        this.accelerateOnBounce = false;
        this.defineAnimation("creep", 0, 2);
        this.playAnimation("creep", true);
    }
    handleGameLoop() {
        
    }
}

new Spider(220, 225);
new Spider(550, 200);