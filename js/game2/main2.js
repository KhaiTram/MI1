//author Khai

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

window.addEventListener("load", function (event) {


  document.getElementById("game1Button").onclick = function () { startEngine() };
  document.getElementById("game2Button").onclick = function () { startEngine2() };

  let health = document.getElementById("health");
  let hunger = document.getElementById("hunger");
  let hygiene = document.getElementById("hygiene");
  let happiness = document.getElementById("happiness");

  

  let healthValue = 100;
  let hungerValue = 0;
  let hygieneValue = 0;
  let happinessValue = 0;
  let canvas1 = document.getElementById("canvas1");
  let canvas2 = document.getElementById("canvas2");

  let engineActive=false;
  let engine2Active = false;

  health.style.width = healthValue + '%';
  hunger.style.width = hungerValue + '%';
  hygiene.style.width = hygieneValue + '%';
  happiness.style.width = happinessValue + '%';


  function startEngine() {
    game1Button = document.getElementById("game1Button")
    game1Button.remove();
    canvas1= document.createElement("CANVAS")
    document.body.appendChild(canvas1);
    
    display = new Display(canvas1);
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width
    engineActive=true;
    resize();
    engine.start();
  }


  function startEngine2() {
    game2Button = document.getElementById("game2Button")
    game2Button.remove();
    canvas2= document.createElement("CANVAS")
    document.body.appendChild(canvas2);

    engine.stop();
    controller = new Controller();
    display2 = new Display2(canvas2);
    console.log(healthValue+"" +hungerValue+""+ hygieneValue+""+ happinessValue)
    game2 = new Game2(healthValue, hungerValue, hygieneValue, happinessValue);
    engine2 = new Engine(1000 / 30, render2, update2);
    engine2.start();
    engine2Active = true;
    resize();
    display2.buffer.canvas.height = game2.world.height;
    display2.buffer.canvas.width = game2.world.width;

  }



  "use strict";

  var keyDownUp = function (event) {

    controller.keyDownUp(event.type, event.keyCode);

  };


  var resize = function (event) {
    if (engineActive){
    display.resize(document.documentElement.clientWidth - 100, document.documentElement.clientHeight - 100, game.world.height / game.world.width);
    display.render();
    }
    if (engine2Active) {
      display2.resize(document.documentElement.clientWidth - 100, document.documentElement.clientHeight - 200, game2.world.height / game2.world.width);
      display2.render();
    }

  };

  var render = function () {

    display.fill(game.world.bgImg);

    display.drawObject(game.world.player.spriteSheet, game.world.player.animationFrame * game.world.player.width, 0, game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height);

    display.drawObject(game.world.virus.spriteSheet, 0, 0, game.world.virus.x, game.world.virus.y, game.world.virus.width, game.world.virus.height);

    display.render();
  };

  var render2 = function () {
    if (engine2Active) {
      display2.drawBg(game2.world.background)

      display2.drawObject(game2.world.player.spriteSheet, game2.world.player.animationFrame * game2.world.player.width, 0, game2.world.player.x, game2.world.player.y, game2.world.player.width, game2.world.player.height);

      game2.world.viruses.forEach((virus) => {
        display2.drawObject(virus.spriteSheet, 0, 0, virus.x, virus.y, virus.width, virus.height);
      })

      game2.world.sushis.forEach((sushi) => {
        display2.drawObject(sushi.spriteSheet, 0, 0, sushi.x, sushi.y, sushi.width, sushi.height);
      })

      game2.world.sweets.forEach((sweet) => {
        display2.drawObject(sweet.spriteSheet, 0, 0, sweet.x, sweet.y, sweet.width, sweet.height);
      })

      game2.world.papers.forEach((paper) => {
        display2.drawObject(paper.spriteSheet, 0, 0, paper.x, paper.y, paper.width, paper.height);
      })

      display2.render();
    }
  };

  var update = function () {
    if (GAME_END){canvas1.remove();game2Button.style.visibility = "visible"; soundWindblow.stop};
    healthValue = game.world.player.health;
    hungerValue = game.world.player.hunger;
    hygieneValue = game.world.player.hygiene;
    happinessValue = game.world.player.happiness;
    health.style.width = game.world.player.health + '%';
    hunger.style.width = game.world.player.hunger + '%';
    hygiene.style.width = game.world.player.hygiene + '%';
    happiness.style.width = game.world.player.happiness + '%';
    if (controller.left.active) { game.world.player.moveLeft(); }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
    if (controller.left.down && !controller.left.blocked) { game.world.player.animationFrame = 0; controller.left.blocked = true; }
    if (controller.right.down && !controller.left.blocked) { game.world.player.animationFrame = 4; controller.left.blocked = true; }
   

    game.update();

    

  };

  var update2 = function () {
    if (engine2Active) {
      if (game2.world.stop) { canvas2.remove();createStats();};
      healthValue = game2.world.player.health;
      hungerValue = game2.world.player.hunger;
      hygieneValue = game2.world.player.hygiene;
      happinessValue = game2.world.player.happiness;
      health.style.width = game2.world.player.health + '%';
      hunger.style.width = game2.world.player.hunger + '%';
      hygiene.style.width = game2.world.player.hygiene + '%';
      happiness.style.width = game2.world.player.happiness + '%';
      if (controller.left.active) { game2.world.player.moveLeft(); }
      if (controller.right.active) { game2.world.player.moveRight(); }
      if (controller.up.active) { game2.world.player.jump(); controller.up.active = false; }
      if (controller.left.down && !controller.left.blocked) { game2.world.player.animationFrame = 0; controller.left.blocked = true; }
      if (controller.right.down && !controller.left.blocked) { game2.world.player.animationFrame = 4; controller.left.blocked = true; }
      game2.update();
    }
  };

  var display;
  var game = new Game(healthValue, hungerValue, hygieneValue, happinessValue);
  var engine = new Engine(1000 / 30, render, update);
  var controller = new Controller();

  var display2;
  var game2;
  var engine2;



  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup", keyDownUp);
  window.addEventListener("resize", resize);


  function createStats(){ 
 
    var score = ((healthValue*2) + (hygieneValue*1.5) + hungerValue + happinessValue);
    
      if( score >= 550) {
      
          var statsText = document.getElementById("stats");
          statsText.innerText =( "SEHR GUT" + 
          "\n" + 
          "\n" + 
          "Du hast Dein Me erfolgreich durch die Pandemie gebracht und es hat kein Risiko krank zu werden!") 
    
          var statsBg = document.getElementById("statscard");
          statsBg.style.backgroundColor ="green";
          statsText.style.backgroundColor ="green";
          
     
      }
      
      if( score >= 500 && score < 550) {
      
      var statsText = document.getElementById("stats");
      statsText.innerText =( "GUT" +
      "\n" + 
      "\n" + 
      "Du hast Dein Me gut durch die Pandemie gebracht und es hat nur ein geringes Risiko krank zu werden! Das schaffst Du bestimmt noch besser!") 
    
    
      var statsBg = document.getElementById("statscard");
      statsBg.style.backgroundColor ="lightgreen";
      statsText.style.backgroundColor ="lightgreen";
      
    
    }
    
    if( score >= 450 && score < 500) {
      
      var statsText = document.getElementById("stats");
      statsText.innerText =( "Mittelmäßig" +
      "\n" + 
      "\n" + 
      "Du hast Dein Me mittelmäßig durch die Pandemie gebracht und es hat ein hohes Risiko krank zu werden! Versuch lieber mehr auf seine Gesundheit zu achten!") 
    
      var statsBg = document.getElementById("statscard");
      statsBg.style.backgroundColor ="yellow";
      statsText.style.backgroundColor ="yellow";
      
    
    }
    
    if( score >= 350 && score < 450) {
      
      var statsText = document.getElementById("stats");
      statsText.innerText =( "Schlecht" + 
      "\n" + 
      "\n" + 
      "Du hast Dein Me schlecht durch die Pandemie gebracht und es hat ein sehr hohes Risiko krank zu werden! Achte bitte mehr auf seine Gesundheit!") 
    
      var statsBg = document.getElementById("statscard");
      statsBg.style.backgroundColor ="darkorange";
      statsText.style.backgroundColor ="darkorange";
    
    
      
    
    }
    
    if( score < 350) {
      
      var statsText = document.getElementById("stats");
      statsText.innerText =( "Sehr Schlecht" +
       "\n" + 
       "\n" + 
      "Oh nein! Du hast Dein Me sehr schlecht durch die Pandemie gebracht. Es hat sich mit dem Corona-Virus" +
      " infiziert und ist nun sehr krank! Versuch bitte mehr auf seine Gesundheit und Hygiene zu achten." +
      "Hat es genug gegessen?") 
    
      var statsBg = document.getElementById("statscard");
      statsBg.style.backgroundColor ="red";
      statsText.style.backgroundColor ="red";
    
      
      statsBg.style.color ="white";
      statsText.style.color ="white";
      
      
    
    }
     
    var cardholderStats = document.getElementById("cardholderStats");
    cardholderStats.style.visibility='visible';
     
    var playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.style.visibility='visible'; 
     
     
    
    
    }
    

});

