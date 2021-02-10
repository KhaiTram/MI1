//author Khai


window.addEventListener("load", function (event) {


  "use strict";

  var keyDownUp = function (event) {

    controller.keyDownUp(event.type, event.keyCode);

  };

  var resize = ()=> {

    display.resize(document.documentElement.clientWidth - 100, document.documentElement.clientHeight - 200, game.world.height / game.world.width);
    display.render();

  };

  var render = function () {

    display.drawBg(game.world.background)

    display.drawObject(game.world.player.spriteSheet, game.world.player.animationFrame* game.world.player.width, 0, game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height);

    game.world.viruses.forEach((virus) => {
      display.drawObject(virus.spriteSheet, 0, 0, virus.x, virus.y, virus.width, virus.height);
    })

    game.world.sushis.forEach((sushi) => {
      display.drawObject(sushi.spriteSheet, 0, 0, sushi.x, sushi.y, sushi.width, sushi.height);
    })

    game.world.sweets.forEach((sweet) => {
      display.drawObject(sweet.spriteSheet, 0, 0, sweet.x, sweet.y, sweet.width, sweet.height);
    })

    game.world.papers.forEach((paper) => {
      display.drawObject(paper.spriteSheet, 0, 0, paper.x, paper.y, paper.width, paper.height);
    })
  
    display.render();
  };

  var update = function () {

    if (controller.left.active) { game.world.player.moveLeft(); }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
    if (controller.left.down && !controller.left.blocked ) { game.world.player.animationFrame=0 ; controller.left.blocked=true; }
    if (controller.right.down && !controller.left.blocked) { game.world.player.animationFrame=4; controller.left.blocked=true; }

    game.update();

  };



  var controller = new Controller();
  var display = new Display(document.querySelector("canvas"));
  var game = new Game();
  var engine = new Engine(1000 / 30, render, update);


  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

  resize();

  engine.start();

});
