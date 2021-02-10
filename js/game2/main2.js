//author Khai


window.addEventListener("load", function (event) {

  document.getElementById("game1Button").onclick = function() {startEngine()};

  let health = document.getElementById("health");
  let hunger = document.getElementById("hunger");
  let hygiene = document.getElementById("hygiene");
  let happiness = document.getElementById("happiness");

  let healthValue = 100;
  let hungerValue = 0;
  let hygieneValue = 0;
  let happinessValue = 0;
  let canvas2 = document.getElementById("canvas2");

  health.style.width= healthValue+ '%';
  hunger.style.width= hungerValue+'%';
  hygiene.style.width= hygieneValue+'%';
  happiness.style.width= happinessValue+'%';
  

  function startEngine(){
    canvas2.style.visibility = "visible";
    engine.start();
   }
   
   function stopEngine(){
    engine.stop();
   }


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

    if (game.world.stop) {canvas2.style.visibility = "hidden";};

    health.style.width= game.world.player.health+'%';
    hunger.style.width= game.world.player.hunger+'%';
    hygiene.style.width= game.world.player.hygiene+'%';
    happiness.style.width= game.world.player.happiness+'%';
    if (controller.left.active) { game.world.player.moveLeft(); }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
    if (controller.left.down && !controller.left.blocked ) { game.world.player.animationFrame=0 ; controller.left.blocked=true; }
    if (controller.right.down && !controller.left.blocked) { game.world.player.animationFrame=4; controller.left.blocked=true; }
    game.update();
  };



  var controller = new Controller();
  var display = new Display(canvas2);
  var game = new Game(healthValue,hungerValue,hygieneValue,happinessValue);
  var engine = new Engine(1000 / 30, render, update);


  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;

  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);

  resize();


});
