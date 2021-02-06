// Author: Khai

const Controller = function() {

    //Es werden für alle Tastatureingaben Ein Objekt der Klasse Buttoninput erzeugt 
    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();
  
    // holt sich den Eventtype von der Eingabe. Wenn der Button gedrückt ist ändert sich der Status der Taste
    this.keyDownUp = function(type, key_code) {
  
      // durch ? wird down auf false gestzt sobald die Taste losgelassen wird
      var down = (type == "keydown") ? true : false;
  
      switch(key_code) {
  
        case 37: this.left.getInput(down);  break;
        case 38: this.up.getInput(down);    break;
        case 39: this.right.getInput(down);
  
      }
  
    };
  
  };
  

  Controller.prototype = {
  
    constructor : Controller
  
  };
  
  Controller.ButtonInput = function() {
  
    this.active = this.down = false;
  
  };
  
  Controller.ButtonInput.prototype = {
  
    constructor : Controller.ButtonInput,
  
    //Überprüft ob die Taste gedrückt ist und speichert entsprechend den Zustand
    getInput : function(down) {
  
      if (this.down != down) this.active = down;
      this.down = down;
  
    }
  
  };
  