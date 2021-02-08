//Author: Khai Tram

//Welt Konstanten
const INIT_GRAVITY_VALUE = 4;
const INIT_FRICTION_VALUE = 0.9;
const GAME_WORLD_HEIGHT = 1080;
const GAME_WORLD_WIDTH = 1920;

//Spieler Konstanten
const PLAYER_IMAGE_URL = "pictures/Ninja.png";
const PLAYER_IMAGE_COLS = 9;
const PLAYER_START_X = 10;
const PLAYER_START_Y = 50;
const PLAYER_HEIGHT = 224;
const PLAYER_WIDTH = 120;
const PLAYER_VELOCITY_X = 4;
const PLAYER_JUMP = 50;

//Virus Konstanten
const VIRUS_IMAGE_URL = "pictures/game3/Corona.png";
const VIRUS_IMAGE_COLS = 1;
const VIRUS_HEIGHT = 100;
const VIRUS_WIDTH = 100;
const INITIAL_VIRUS_VELOCITY = 3;
const VIRUS_VELOCITY_MULTIPLIER = 1.1;
const INITIAL_SPAWN_DELAY = 50;




class Game {

    constructor() {
        this.world = new World(INIT_GRAVITY_VALUE, INIT_FRICTION_VALUE, GAME_WORLD_HEIGHT, GAME_WORLD_WIDTH);
    }

    update() {
        this.world.update();

    }
};

class World {
    constructor(gravity, friction, height, width) {
        this.background_color = "black";
        this.friction = friction;
        this.gravity = gravity;

        this.viruses = [];
        this.player = new Player(PLAYER_IMAGE_URL, PLAYER_HEIGHT, PLAYER_WIDTH);

        this.height = height;
        this.width = width;

        this.spawnDelay=INITIAL_SPAWN_DELAY;
        this.loopcounter=0;
        this.virusSpeed=INITIAL_VIRUS_VELOCITY;

    }

    collideObject(object) {
        if (object.x < 0) { object.x = 0; object.velocityX = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocityX = 0; }
        if (object.y < 0) { object.y = 0; object.velocityY = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocityY = 0; }

    }

    spawnVirus() {
        this.loopcounter++ 
        if (this.loopcounter%this.spawnDelay == 0  ){
            this.viruses.push(new Virus(VIRUS_IMAGE_URL,VIRUS_HEIGHT,VIRUS_WIDTH,this.virusSpeed))
            this.virusSpeed *= VIRUS_VELOCITY_MULTIPLIER
            console.log(this.viruses)
        }

    
    }

    update() {


        this.player.velocityY += this.gravity;
        this.player.updatePos();
        this.player.updateAn();
        this.player.velocityX *= this.friction;

        this.collideObject(this.player);

        this.spawnVirus();

        this.viruses.forEach((virus) => {
            virus.updatePos();
            this.collideObject(virus);
        }
        )

    }



}

class GameObject {
    constructor(spriteSheet, height, width) {
        this.spriteSheet = getImg(spriteSheet);
        this.height = height;
        this.width = width;
        this.velocityX = 0;
        this.velocityY = 0;
    }

}

class Player extends GameObject {

    constructor(spriteSheet, height, width) {
        super(spriteSheet, height, width);
        this.jumping = true;
        this.direction = -1;
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
        /* frameSets = {
            "idle": [4],
            "jump-left": [3],
            "move-left": [2,3],
            "jump-right": [5],
            "move-right": [5,6]
        } */
    }

    jump() {
        if (!this.jumping) {

            this.jumping = true;
            this.velocityY -= PLAYER_JUMP;

        }
    }

    moveLeft() {
        this.velocityX -= PLAYER_VELOCITY_X;
        this.direction = -1;
    }
    moveRight() {
        this.velocityX += PLAYER_VELOCITY_X;
        this.direction = 1;
    }

    updatePos() {

        this.x += this.velocityX;
        this.y += this.velocityY;

    }

    updateAn() {

    }

}

class spriteSheet {
    constructor() {

    }
}

class Animator {
    constructor(frameSet, Delay) {

        this.count = 0;
        this.delay = (delay >= 1) ? delay : 1;
        this.frame_set = frame_set;
        this.frame_index = 0;
        this.frame_value = frame_set[0];
        this.mode = "pause";

    };

    animate() {
        switch (this.mode) {

            case "loop": this.loop(); break;
            case "pause": break;

        }
    };

    changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {
        if (this.frame_set === frame_set) { return; }

        this.count = 0;
        this.delay = delay;
        this.frame_set = frame_set;
        this.frame_index = frame_index;
        this.frame_value = frame_set[frame_index];
        this.mode = mode;

    }

    loop() {
        this.count++;
        while (this.count > this.delay) {
            this.count -= this.delay;
            this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
            this.frame_value = this.frame_set[this.frame_index];

        }

    }
}

class Virus extends GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        super(spriteSheet, height, width);
        this.velocityY = velocityY;
        this.x=Math.floor(Math.random() * GAME_WORLD_WIDTH - 100);
        this.y=0;
    };

    updatePos() {

        this.y+=this.velocityY

    }


}


function getImg(spriteSheetURL) {
    let spriteSheet = new Image();
    spriteSheet.src = spriteSheetURL;
    return spriteSheet;
}



