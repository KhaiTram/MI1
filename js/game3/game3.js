//Author: Robert Nor

//Welt Konstanten
const INIT_GRAVITY_VALUE = 3;
const INIT_FRICTION_VALUE = 0.9;
const GAME_WORLD_HEIGHT = 1080;
const GAME_WORLD_WIDTH = 1920;
var GAME_END = false;
var timer = 0;
var soundWindblow;
//Spieler Konstanten
const PLAYER_IMAGE_URL = "pictures/game/Player.png";
const PLAYER_IMAGE_COLS = 9;
const PLAYER_START_X = 0;
const PLAYER_START_Y = 50;
const PLAYER_HEIGHT = 250;
const PLAYER_WIDTH = 130;
const PLAYER_VELOCITY_X = 2;
const PLAYER_JUMP = 50;
const ANIMATION_DELAY = 10;
var soundJump;
var soundWalk;
var happiness = 0;
var health = 100;

//Virus Konstanten
const VIRUS_IMAGE_URL = "pictures/game/corona_pic.png";
const VIRUS_IMAGE_COLS = 1;
const VIRUS_HEIGHT = 100;
const VIRUS_WIDTH = 100;
const VIRUS_START_X = 1900;
const VIRUS_START_Y = 50;
const INITIAL_VIRUS_VELOCITY = -10;
var virusHit = 0;
var soundHit;


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
        this.bgImg = getImg("pictures/game/game3_bg.png");
        //this.background_color = "blue";
        this.friction = friction;
        this.gravity = gravity;

        this.virus = new Virus(VIRUS_IMAGE_URL,VIRUS_HEIGHT,VIRUS_WIDTH,INITIAL_VIRUS_VELOCITY);
        this.player = new Player(PLAYER_IMAGE_URL, PLAYER_HEIGHT, PLAYER_WIDTH);

        this.height = height;
        this.width = width;

        soundWalk = new sound("sounds/sound_walk.mp3")
        soundHit = new sound("sounds/sound_oh.mp3");
        soundJump = new sound("sounds/sound_jump.mp3");
        soundWindblow = new sound("sounds/sound_windblow.mp3");
        
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
            soundHit.play();
            console.log("TRUE") 
            virusHit++;
            health -= 30;
            happiness -= 5;
            if(virusHit != 3 ){   
                this.virus.x = this.width+20;
            }
                
            if(virusHit == 3){
                soundWindblow.stop();
                GAME_END = true
                
            
            }
        /*if (object2.x >= 0 && object2.x <=120 && object1.y > 100) {
            console.log("Kollidiert!!!!")
            object2.velocityX = 0;
            
        }*/
        
       

        }
    }


    update() {
        timer++;
           
        if (timer == 1800) {
            GAME_END = true;  
             
        }
    
        if(timer % 100 == 0 && !GAME_END) {
            happiness += 2.5;
        }

        if (!GAME_END){
            soundWindblow.play(); 
            this.collideObjectObject(this.player,this.virus);
            this.player.velocityY += this.gravity;
            this.player.updatePos();
            this.player.velocityX *= this.friction;
            this.player.velocityY *= this.friction;

            this.collideObject(this.player);
            
            this.virus.velocityY += this.gravity;
            this.virus.updatePos();
        
            this.collideObjectFloor(this.virus);
        }

        console.log(happiness + " happy ");
        console.log(health + " health");
        console.log (virusHit);
      
       
    
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
        this.animationFrame = 8;
        this.loopcounter = 0;
    }

    jump() {
        if (!this.jumping) {
            soundJump.play();
            this.jumping = true;
            this.velocityY -= PLAYER_JUMP;
            this.animationFrame = 8;
        }
    }

    moveLeft() {
        
        this.loopcounter++;
        this.velocityX -= PLAYER_VELOCITY_X;
        this.direction = -1;

        if (this.loopcounter % ANIMATION_DELAY == 0 && this.jumping == false) {
            this.animationFrame++;
            soundWalk.play();
            if (this.animationFrame >= 4) {
                this.animationFrame = 0;
            }
        }

    }
    moveRight() {
        
        this.velocityX += PLAYER_VELOCITY_X;
        this.direction = 1;
        this.loopcounter++;
        if (this.loopcounter % ANIMATION_DELAY == 0 && this.jumping == false) {
            this.animationFrame++;
            soundWalk.play();
            if (this.animationFrame >= 8) {
                this.animationFrame = 5;
            }
        }
    }

    updatePos() {

        this.x += this.velocityX;
        this.y += this.velocityY;

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
            this.velocityX -= 0.03;
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

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.play = function(){
    this.sound.play();

    this.stop = function(){
        this.sound.pause();
      }
}
function disableKeyScroll(){
    window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

}

}
