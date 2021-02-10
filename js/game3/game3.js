//Author: Robert Nor

//Welt Konstanten
var GAME_END = false;
var timer = 0;
var soundWindblow;

//Spieler Konstanten


//Virus Konstanten

const VIRUS_START_X = 1900;
const VIRUS_START_Y = 50;
const INITIAL_VIRUS_VELOCITY_X = -10;




class Game {

    constructor(health, hunger, hygiene, happiness) {
        this.world = new World(INIT_GRAVITY_VALUE, INIT_FRICTION_VALUE, GAME_WORLD_HEIGHT, GAME_WORLD_WIDTH, health, hunger, hygiene, happiness);
    }

    update() {
        this.world.update();

    }
};

class World {
    constructor(gravity, friction, height, width, health, hunger, hygiene, happiness) {
        this.bgImg = getImg("pictures/game/game3_bg.png");
        this.friction = friction;
        this.gravity = gravity;

        this.virus = new Virus(VIRUS_IMAGE_URL, VIRUS_HEIGHT, VIRUS_WIDTH, INITIAL_VIRUS_VELOCITY_X);
        this.player = new Player(PLAYER_IMAGE_URL, PLAYER_HEIGHT, PLAYER_WIDTH, health, hunger, hygiene, happiness);

        this.height = height;
        this.width = width;

        this.soundWindblow = new Sound("sounds/sound_windblow.mp3");
        this.soundHit = new Sound("sounds/sound_corona_hit.mp3");

    }

    collideObject(object) {

        if (object.x < 0) { object.x = 0; object.velocityX = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocityX = 0; }
        if (object.y < 0) { object.y = 0; object.velocityY = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocityY = 0; }

    }

    collideObjectFloor(object) {
        if (object.x < -100) {
            object.x = this.width + 20;
        }
        if (object.y < 0) {
            object.y = 0; object.velocityY = 0;
        }
        else if (object.y + object.height > this.height) {
            object.y = this.height - object.height; object.velocityY = 0;
        }

    }

    collideObjectObject(object1, object2) {
        if (object2.x > object1.width + object1.x || object1.x > object2.width + object2.x || object2.y > object1.height + object1.y || object1.y > object2.height + object2.y) {
          

        }
        else {
            this.soundHit.play();
            
            this.player.health -= DAMAGE;
            this.player.happiness -= 5;
            if (this.player.health > 0 ) {
                this.virus.x = this.width + 20;
            }

            if (this.player.health <1) {
                this.soundWindblow.stop();
                GAME_END = true
            }
        }
    }


    update() {
        timer++;

        if (timer == 1800) {
            GAME_END = true;

        }

        if (timer % 100 == 0 && !GAME_END) {
            this.player.happiness += 2.5;
        }

        if (!GAME_END) {
            this.soundWindblow.play();
            this.collideObjectObject(this.player, this.virus);
            this.player.velocityY += this.gravity;
            this.player.updatePlayerPos();
            this.player.velocityX *= this.friction;

            this.collideObject(this.player);

            this.virus.velocityY += this.gravity;
            this.virus.updatePos();

            this.collideObjectFloor(this.virus);
        }



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


class Virus extends GameObject {
    constructor(spriteSheet, height, width, velocityX) {
        super(spriteSheet, height, width);
        this.x = VIRUS_START_X;
        this.y = VIRUS_START_Y;
        this.velocityX = velocityX;


    };

    updatePos() {

        if (!GAME_END) {
            this.velocityX -= 0.03;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;

    }


}


