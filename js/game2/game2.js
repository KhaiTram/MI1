//Author: Khai Tram

const Game = function () {

    this.world = new Game.World();

    this.update = function () {

        this.world.update();

    };

};

Game.World = function (friction = 0.8, gravity = 2) {

    this.collider = new Game.World.Collider();

    this.friction = friction;
    this.gravity = gravity;



    this.spriteSheet = new Game.World.SpriteSheet(8, 16);
    this.player = new Game.World.Object.Player(100, 100);


    this.height = 1080;
    this.width = 1920;

};

Game.prototype = {

    constructor: Game,

};

Game.World.prototype = {

    constructor: Game.World,
  
    collideObject:function(object) {
  
      if      (object.getLeft()   < 0          ) { object.setLeft(0);             object.velocity_x = 0; }
      else if (object.getRight()  > this.width ) { object.setRight(this.width);   object.velocity_x = 0; }
      if      (object.getTop()    < 0          ) { object.setTop(0);              object.velocity_y = 0; }
      else if (object.getBottom() > this.height) { object.setBottom(this.height); object.velocity_y = 0; object.jumping = false; }
  
      var bottom, left, right, top, value;
  
      top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
      value  = this.collision_map[top * this.columns + left];
      this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);
  
      top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
      value  = this.collision_map[top * this.columns + right];
      this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);
  
      bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
      value  = this.collision_map[bottom * this.columns + left];
      this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);
  
      bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
      value  = this.collision_map[bottom * this.columns + right];
      this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);
  
    },
  
    /* This function changed to update the player's position and then do collision,
    and then update the animation based on the player's final condition. */
    update:function() {
  
      this.player.updatePosition(this.gravity, this.friction);
  
      this.collideObject(this.player);
  
      this.player.updateAnimation();
  
    }
  
  };

// Erstellung der Gamewelt
this.world = {


    background_color: "black",

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
