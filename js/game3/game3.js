//Author: Khai Tram

//Welt Konstanten
const INIT_GRAVITY_VALUE = 3;
const INIT_FRICTION_VALUE = 0.9;
const GAME_WORLD_HEIGHT = 1080;
const GAME_WORLD_WIDTH = 1920;
var GAME_END = false;
//Spieler Konstanten
const PLAYER_IMAGE_URL = "pictures/Ninja.png";
const PLAYER_IMAGE_COLS = 9;
const PLAYER_START_X = 0;
const PLAYER_START_Y = 50;
const PLAYER_HEIGHT = 224;
const PLAYER_WIDTH = 120;

//Virus Konstanten
const VIRUS_IMAGE_URL = "pictures/game3/corona.png";
const VIRUS_IMAGE_COLS = 1;
const VIRUS_HEIGHT = 100;
const VIRUS_WIDTH = 100;
const VIRUS_START_X = 1900;
const VIRUS_START_Y = 50;
const INITIAL_VIRUS_VELOCITY = -10;




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
        this.background_color = "blue";
        this.friction = friction;
        this.gravity = gravity;

        this.virus = new Virus(VIRUS_IMAGE_URL,VIRUS_HEIGHT,VIRUS_WIDTH,INITIAL_VIRUS_VELOCITY);
        this.player = new Player(PLAYER_IMAGE_URL, PLAYER_HEIGHT, PLAYER_WIDTH);

        this.height = height;
        this.width = width;


     
       
        

    }

    collideObject(object) {

        if (object.x < 0) { object.x = 0; object.velocityX = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocityX = 0; }
        if (object.y < 0) { object.y = 0; object.velocityY = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocityY = 0; }

    }

    collideObjectFloor(object) {

        if (object.x < -100) {
            object.x = this.width+20;
        }
        
        if (object.y < 0) {
            object.y = 0; object.velocityY = 0;
        }
        else if (object.y + object.height > this.height) {
            object.y = this.height - object.height; object.velocityY = 0;
        }

    }

    collideObjectObject(object1,object2) {

       
        if(object2.x > object1.width + object1.x || object1.x > object2.width + object2.x || object2.y > object1.height + object1.y || object1.y > object2.height + object2.y){
            console.log("fALSE")

        }
        else {
            console.log("TRUE")   
            GAME_END = true
            object2.velocityX = 0;
        }
        
        /*if (object2.x >= 0 && object2.x <=120 && object1.y > 100) {
            console.log("Kollidiert!!!!")
            object2.velocityX = 0;
            
        }*/
        
       

    }


    update() {

        if (!GAME_END){
            this.collideObjectObject(this.player,this.virus);
        }

        this.player.velocityY += this.gravity;
        this.player.updatePos();
        this.player.updateAn();
        this.player.velocityX *= this.friction;
        this.player.velocityY *= this.friction;

        this.collideObject(this.player);

        
        this.virus.velocityY += this.gravity;
        this.virus.updatePos();

       
       
        this.collideObjectFloor(this.virus);

       /* console.log(this.player.y + " Y");
        console.log(this.player.x + " X");

        console.log(this.virus.y + " Y Virus");*/
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
            this.velocityY -= 100;

        }
    }

    moveLeft() {
        this.velocityX -= 3;
        this.direction = -1;
    }
    moveRight() {
        this.velocityX += 3;
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
    constructor(spriteSheet, height, width, velocityX) {
        super(spriteSheet, height, width);
        this.x = VIRUS_START_X;
        this.y = VIRUS_START_Y;
        this.velocityX = velocityX;
        

    };

    updatePos() {
      
        if(!GAME_END) {
            this.velocityX -= 0.003;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;

    }


}


function getImg(spriteSheetURL) {
    let spriteSheet = new Image();
    spriteSheet.src = spriteSheetURL;
    return spriteSheet;
}



