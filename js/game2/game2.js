//Author: Khai Tram

class Game {

    constructor() {
        this.world = new World();
    }

    update() {
        this.world.update();

    }
};

class World {
    constructor() {
        this.background_color = "rgba(40,48,56,0.25)";
        this.friction = 0.9;
        this.gravity = 3;

        this.player = new Player();

        this.height = 72;
        this.width = 128;

    }

    collideObject(object) {

        if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
        else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
        if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
        else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

    }

    update() {

        this.player.velocity_y += this.gravity;
        this.player.update();

        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;

        this.collideObject(this.player);

    }
}

class Player {
    constructor() {
        this.color = "#ff0000";
        this.height = 16;
        this.jumping = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width = 16;
        this.x = 100;
        this.y = 50;
    }

    jump() {
        if (!this.jumping) {

            this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);// Change to random color
            /* toString(16) will not add a leading 0 to a hex value, so this: #0fffff, for example,
            isn't valid. toString would cut off the first 0. The code below inserts it. */
            if (this.color.length != 7) {

                this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);

            }

            this.jumping = true;
            this.velocity_y -= 20;

        }
    }

    moveLeft() {
        this.velocity_x -= 0.5;
    }
    moveRight() {
        this.velocity_x += 0.5;
    }

    update() {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

}


