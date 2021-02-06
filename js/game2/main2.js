//Author: Khai

/*Jede Funktion die Elemente aus 2 Funktionen nutzt sollte in der Main.js definiert werden.
Wir wollen sowenig zwischen den einzelnen Komponenten referenzierehn wie möglich
*/ 
window.addEventListener("load", function(event) {

    "use strict";
  
    


    /* Folgend auf Inputevents könnten Änderungen auf dem Display erfolgen, 
    deshalb werden Input Event Listener in der Main Methode behalten 
    Diese Funtkion überprüft das Event und verarbeitet es wenn es sich um eine Tasteneingabe handelt
    (Siehe KeyDownUp in der Controller Klasse)*/
    var keyDownUp = function(event) {
  
      controller.keyDownUp(event.type, event.keyCode);
  
    };
  
    /* Diese Funktion passt die Größe des Spielefensters an die Größe des browserfensters an mit nem geringen offset von 32 pixel*/
    var resize = function(event) {
      display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
      display.render();
    };
  
    /* Zeichnet unsere Spielewelt neu mer details siehe display klasse */
    var render = function() {
  
      display.fill(game.world.background_color);
      display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
      display.render();
  
    };
  

    /* Updated information in unserer Spielewelt die meist Abhängig von eingaben ist */
    var update = function() {
      if (controller.left.active)  { game.world.player.moveLeft();  }
      if (controller.right.active) { game.world.player.moveRight(); }
      if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }
  
      game.update();
    };
  
  /* Initialisierung aller Komponenten */
    var controller = new Controller();
    var display    = new Display(document.querySelector("canvas"));
    var game       = new Game();
    var engine     = new Engine(1000/30, render, update);
  
    /* Das buffer canvas bekommt die gleichen Dimensionen wie die Spielewelt damit das Spiel sich der Fenstergröße anpassen kann
    ohne diesen Schritt würde der Buffer die Größe des Fensters annehmen und das Spiel die fix definierten Werte des Game Objektes übernehmen übenehmen*/
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
  
    /* Eventlistener werden eingeführt um entsprechend auf Änderungen zu horchen */
    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);
  
    //resize wird zum Anfang einmal ausgeführt damit das spiel sich der Größe des Fensters anpasst
    resize();
  
    engine.start();
  
  });
  