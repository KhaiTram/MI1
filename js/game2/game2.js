//Author: Khai Tram

//Welt Konstanten
const INIT_GRAVITY_VALUE = 4;
const INIT_FRICTION_VALUE = 0.1;
const GAME_WORLD_BG = "pictures/game/game2Bg.png";
const GAME_WORLD_HEIGHT = 1080;
const GAME_WORLD_WIDTH = 1920;

//Spieler Konstanten
const PLAYER_IMAGE_URL = "pictures/game/Player.png";
const PLAYER_IMAGE_COLS = 9;
const PLAYER_START_X = 10;
const PLAYER_START_Y = 50;
const PLAYER_HEIGHT = 250;
const PLAYER_WIDTH = 130;
const PLAYER_VELOCITY_X = 20;
const PLAYER_JUMP = 50;
const ANIMATION_DELAY = 10;
var soundWalk;
var soundJump;
var soundYay;
var soundEat;


//Virus Konstanten
const VIRUS_IMAGE_URL = "pictures/game/corona_pic.png";
const VIRUS_HEIGHT = 100;
const VIRUS_WIDTH = 100;
const INITIAL_VIRUS_VELOCITY = 4;
const VIRUS_VELOCITY_MULTIPLIER = 0.5;
const INITIAL_SPAWN_DELAY = 100;
const DAMAGE = 10;
var soundHit;

//Food Konstanten
const SUSHI_IMAGE_URL = "pictures/game/sushi.png";
const SWEET_IMAGE_URL = "pictures/game/sweet.png";
const SUSHI_HEIGHT = 128;
const SUSHI_WIDTH = 238;
const SWEET_HEIGHT = 112;
const SWEET_WIDTH = 206;
const INITIAL_FOODS_VELOCITY = 3;
const FOOD_VELOCITY_MULTIPLIER = 0.5;
const INITIAL_OBJECTSPAWN_DELAY = 50;
const FOODVALUE = 5;

//Papier Konstanten
const PAPER_IMAGE_URL = "pictures/game/paper.png";
const PAPER_HEIGHT = 143;
const PAPER_WIDTH = 150;
const INITIAL_PAPER_VELOCITY = 3;
const PAPER_VELOCITY_MULTIPLIER = 0.5;
const CLEAN = 5;






class Game {

    constructor(health,hunger,hygiene,happiness) {
        this.world = new World(INIT_GRAVITY_VALUE, INIT_FRICTION_VALUE, GAME_WORLD_HEIGHT, GAME_WORLD_WIDTH,health,hunger,hygiene,happiness);
    }

    update() {
        this.world.update();
    }
};

class World {
    constructor(gravity, friction, height, width,health,hunger,hygiene,happiness) {
        this.background_color = "black";
        this.friction = friction;
        this.gravity = gravity;
        this.background = getImg(GAME_WORLD_BG);
        this.viruses = [];
        this.sushis = [];
        this.sweets = [];
        this.papers = [];

        this.player = new Player(PLAYER_IMAGE_URL, PLAYER_HEIGHT, PLAYER_WIDTH,health,hunger,hygiene,happiness);

        this.height = height;
        this.width = width;

        this.virusSpawnDelay = INITIAL_SPAWN_DELAY;
        this.objectSpawnDelay = INITIAL_OBJECTSPAWN_DELAY;
        this.loopcounter = 0;
        this.virusSpeed = INITIAL_VIRUS_VELOCITY;
        this.foodSpeed = INITIAL_FOODS_VELOCITY;
        this.paperSpeed = INITIAL_PAPER_VELOCITY;

        this.stop=false;
        this.gameDuration= 0;

        soundWalk = new sound("sounds/sound_walk.mp3")
        soundJump = new sound("sounds/sound_jump.mp3")
        soundYay = new sound("sounds/sound_yay.mp3")
        soundEat = new sound("sounds/sound_ham.mp3")
        soundHit = new sound("sounds/sound_corona_hit.mp3")



    }

    collidePlayer(object) {
        if (object.x < 0) { object.x = 0; object.velocityX = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocityX = 0; }
        if (object.y < 0) { object.y = 0; object.velocityY = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocityY = 0; }
    }

    collideObject(player, object, callback) {

        if(object.x > player.width + player.x || player.x > object.width + object.x || object.y > player.height + player.y || player.y > object.height + object.y){
            
        }
        else {
            callback(player,object);
            console.log(""+player.health+" "+ player.hunger +" " + player.hygiene )
        }
    }



    spawnObject() {
        this.loopcounter++
        if (this.loopcounter % this.objectSpawnDelay == 0) {
            this.spawnRandomObject(Math.floor(Math.random() * 100));
        }
        if (this.loopcounter % this.virusSpawnDelay == 0) {
            this.viruses.push(new Virus(VIRUS_IMAGE_URL, VIRUS_HEIGHT, VIRUS_WIDTH, this.virusSpeed))
            this.virusSpeed += VIRUS_VELOCITY_MULTIPLIER;
        }
    }

    spawnRandomObject(rnd) {
        if (rnd < 50) {
            this.papers.push(new Paper(PAPER_IMAGE_URL, PAPER_HEIGHT, PAPER_WIDTH, this.paperSpeed))
            this.paperSpeed += PAPER_VELOCITY_MULTIPLIER;
        } else if (rnd < 100) {
            if (rnd < 75) {
                this.sushis.push(new Sushi(SUSHI_IMAGE_URL, SUSHI_HEIGHT, SUSHI_WIDTH, this.foodSpeed))
                this.foodSpeed += FOOD_VELOCITY_MULTIPLIER;
            } else {
                this.sweets.push(new Sweet(SWEET_IMAGE_URL, SWEET_HEIGHT, SWEET_WIDTH, this.foodSpeed))
                this.foodSpeed += FOOD_VELOCITY_MULTIPLIER;
            }
        }
    }


    update() {
        this.gameDuration++;
        if (this.gameDuration == 100){ this.stop=true;};
        if (!this.stop){

            this.player.velocityY += this.gravity;
            this.player.updatePlayerPos();
            this.player.velocityX *= this.friction;
            this.collidePlayer(this.player);
            this.spawnObject();
            
            this.sushis.forEach((sushi) => {
                sushi.updatePos();
                this.collideObject(this.player,sushi,(player,paper)=>{
                    player.hunger += FOODVALUE;
                    paper.y=1200;
                    soundEat.play();
                });
            })
            
            this.sweets.forEach((sweet) => {
                sweet.updatePos();
                this.collideObject(this.player,sweet,(player,sweet)=>{
                    player.hunger += (FOODVALUE/2);
                    sweet.y=1200;
                    soundEat.play();
                });
            })
            
            this.viruses.forEach((virus) => {
                
                virus.updatePos();
                this.collideObject(this.player,virus,(player,virus)=>{
                    player.health-= DAMAGE;
                    virus.y=1200;
                    soundHit.play()});
            })
            
            this.papers.forEach((paper) => {
                paper.updatePos();
                this.collideObject(this.player,paper,(player,paper)=>{
                    player.hygiene+= CLEAN;
                    paper.y=1200;
                    soundYay.play();
                });
            })
        }
            
        
    }
}

class GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        this.spriteSheet = getImg(spriteSheet);
        this.height = height;
        this.width = width;
        this.velocityX = 0;
        this.velocityY = velocityY;
        this.x = Math.floor(Math.random() * (GAME_WORLD_WIDTH - 250));
        this.y = 0;
    }
    updatePos() {
        this.y += this.velocityY
    }

}

class Player extends GameObject {

    constructor(spriteSheet, height, width,health,hunger,hygiene,happiness) {
        super(spriteSheet, height, width, 0);
        this.jumping = true;
        this.direction = -1;
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
        this.animationFrame = 8;
        this.loopcounter = 0;
        this.health = health;
        this.happiness = happiness;
        this.hunger = hunger;
        this.hygiene = hygiene;
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

    updatePlayerPos() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

}



class Virus extends GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        super(spriteSheet, height, width, velocityY);
    };
}

class Paper extends GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        super(spriteSheet, height, width, velocityY);
    };
}

class Sushi extends GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        super(spriteSheet, height, width, velocityY);
    };
}

class Sweet extends GameObject {
    constructor(spriteSheet, height, width, velocityY) {
        super(spriteSheet, height, width, velocityY);
    };
}



function getImg(imageURL) {
    let img = new Image();
    img.src = imageURL;
    return img;
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

}

/*  Author: almaceleste :"Disable arrow key scrolling in users browser" 
    https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser/8916697 
    Zugriff am 09.02.2021
*/
// Deaktiviert das Scrollen auf der Website mit den Pfeiltasten 
window.addEventListener('keydown', (e) => {
    if (e.target.localName != 'input') {   // if you need to filter <input> elements
        switch (e.keyCode) {
            case 37: // left
            case 39: // right
                e.preventDefault();
                break;
            case 38: // up
            case 40: // down
                e.preventDefault();
                break;
            default:
                break;
        }
    }
}, {
    capture: true,   // this disables arrow key scrolling in modern Chrome
    passive: false   // this is optional, my code works without it
});