//Author: Khai Tram

const Game = function () {

    this.world = {

        background_color: "#9370db",

        friction: 0.9,
        gravity: 3,

        player: new Game.Player(),
        enemy: new Game.Enemy(),
        
        height: 72,
        width: 128,

        collideObject: function (object) {

            if (object.x < 0) {
                object.x = 0; object.velocity_x = 0;
            }
            else if (object.x + object.width > this.width) {
                object.x = this.width - object.width; object.velocity_x = 0;
            }
            if (object.y < 0) {
                object.y = 0; object.velocity_y = 0;
            }
            else if (object.y + object.height > this.height) {
                object.jumping = false;
                object.y = this.height - object.height; object.velocity_y = 0;
            }

        },

        collideObjectFloor: function (object) {

            if (object.x < -10) {
                object.x = 150;
            }
            
            if (object.y < 0) {
                object.y = 0; object.velocity_y = 0;
            }
            else if (object.y + object.height > this.height) {
                object.y = this.height - object.height; object.velocity_y = 0;
            }

        },

        collideObjectObject: function (object1,object2) {

            if (object2.x >= 0 && object2.x <=10 && object1.y > 52) {
                console.log("Kollidiert!!!!")
                object2.velocity_x = 0;
                
            }
            
           

        },

        update: function () {

        
            this.collideObjectObject(this.player,this.enemy);

            this.player.velocity_y += this.gravity;
            this.player.update();

            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            this.collideObject(this.player);

            this.enemy.velocity_y += this.gravity;
            this.enemy.update();

            this.collideObjectFloor(this.enemy);
            
            
            
            /*console.log(this.player.y);
            console.log(this.player.x);

            console.log("ENEMY " + this.enemy.y);
            console.log("ENEMY " + this.enemy.x);
*/

        }

    };

    this.update = function () {

        this.world.update();
        

    };

};

Game.prototype = { constructor: Game };

Game.Player = function (x, y) {

    this.color = "#ff0000";
    this.height = 10;
    this.width = 10;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = 0;
    this.y = 0;

};

Game.Enemy = function (x, y) {

    this.color = "#059022";
    this.height = 10;
    this.width = 10;
    this.velocity_x = -1.5;
    this.velocity_y = 0;
    this.x = 100;
    this.y = 100;
    

};
Game.Enemy.prototype = {

    constructor: Game.Enemy,

    jump: function () {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 20;

        }

    },
   
    update: function () {
        this.velocity_x -= 0.003;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
       

    }
    
};

Game.Player.prototype = {

    constructor: Game.Player,

    jump: function () {

        if (!this.jumping) {

            this.jumping = true;
            this.velocity_y -= 20;

        }

    },

    
    moveLeft: function () { this.velocity_x -= 0.5; },
    moveRight: function () { this.velocity_x += 0.5; },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};
