//author Khai


window.addEventListener("load", function(event) {

  
  "use strict";
  
  var keyDownUp = function(event) {
    
    controller.keyDownUp(event.type, event.keyCode);
    
  };
  
  var resize = function(event) {
    
    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
    display.render();
    
  };
  
  var render = function() {
    
    display.fill(game.world.bgImg);
    //display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, "red");
    display.drawObject(game.world.player.spriteSheet, game.world.player.animationFrame*game.world.player.width, 0, game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height);
    
    display.drawObject(game.world.virus.spriteSheet, 0, 0, game.world.virus.x, game.world.virus.y, game.world.virus.width, game.world.virus.height);  
      /* display.drawObject(assets_manager.tile_set_image,
        frame.x, frame.y,
        game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
        game.world.player.y + frame.offset_y, frame.width, frame.height); */
      display.render();
  };
  
  var update = function() {

    if (controller.left.active)  { game.world.player.moveLeft();  }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }
    if (controller.left.down && !controller.left.blocked ) { game.world.player.animationFrame=0 ; controller.left.blocked=true; }
    if (controller.right.down && !controller.left.blocked) { game.world.player.animationFrame=4; controller.left.blocked=true; }
    
    game.update();
   

  };



  var controller = new Controller();
  var display    = new Display(document.querySelector("canvas"));
  var game       = new Game();
  var engine     = new Engine(1000/30, render, update);


  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup",   keyDownUp);
  window.addEventListener("resize",  resize);

  resize();

  engine.start();

});
