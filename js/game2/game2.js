//Author: Khai Tram

const Game = function () {

    // Erstellung der Gamewelt
    this.world = {


        background_color:"rgba(40,48,56,0.25)",

        //Physikattribute
        friction: 0.9,
        gravity: 3,

        //Initialisierung eines Spielers
        player: new Game.Player(),

        player: new Game.Player(),
        
        height: 1080,
        width: 1920,

        //Kollisionskontrolle: Die Position des  übermittelten Objektes wird auf Kollision mit der Spelewelt überprüft 
        collideObject: function (object) {

            // Position des Objektes wird auf den linken Rand der Welt zurückgesetzt sobald er diesen überschreitet
            if (object.x < 0) {
                object.x = 0; 
                object.velocity_x = 0;
            }

            //Position des Objektes wird mit seiner Breite addiert damit man die Position der rechten Seite des Objektes bekommt
            else if (object.x + object.width > this.width) {
                object.x = this.width - object.width; object.velocity_x = 0;
            }

            //Selbes spiel auf vertikaler Ebene Hier kann er nicht durch die decke
            if (object.y < 0) {
                object.y = 0; object.velocity_y = 0;
            }

            //wenn der Spieler auf dem Boden ist wird sein jumping attribut auf false gesetzt damit er springen kann
            else if (object.y + object.height > this.height) {
                object.jumping = false;
                object.y = this.height - object.height; object.velocity_y = 0;
            }

        },

        // Spielerpositionen werden upgedated mit Kollisionskontrolle und berücksichtigung der Spielephysik
        update: function () {


            this.player.velocity_y += this.gravity;
            this.player.update();

            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            this.collideObject(this.player);

        }

    };

    
    this.update = function () {

        this.world.update();

    };

};

Game.prototype = { constructor: Game };

//Klasse für den Spieler
Game.Player = function (x, y) {

    this.color = "#ff0000";
    this.height = 50;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.width = 50;
    this.x = 100;
    this.y = 50;

};

Game.Player.prototype = {

    constructor: Game.Player,

    jump: function () {

        // Springen soll nur möglcih sein wenn der Spieler auf dem Boden ist
        if (!this.jumping) {


            this.jumping = true;
            this.velocity_y -= 50;

        }

    },

    // Funktionen für die Anpassungen der position des Spielers
    moveLeft: function () { this.velocity_x -= 1; },
    moveRight: function () { this.velocity_x += 1; },


    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};
