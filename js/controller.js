// Author: Khai

class Controller {

  constructor() {
    //Es werden für alle Tastatureingaben Ein Objekt der Klasse Buttoninput erzeugt 
    this.left = new ButtonInput();
    this.right = new ButtonInput();
    this.up = new ButtonInput();
  }

  keyDownUp(type, key_code) {

    // durch ? wird down auf false gestzt sobald die Taste losgelassen wird
    var down = (type == "keydown") ? true : false;

    switch (key_code) {

      case 37: this.left.getInput(down,type); break;
      case 38: this.up.getInput(down,type); break;
      case 39: this.right.getInput(down,type);

    }
  }

}

class ButtonInput {
  constructor() {

    this.active = this.down = false;
    this.blocked = false;
  }


  //Überprüft ob die Taste gedrückt ist und speichert entsprechend den Zustand
  getInput(down,type) {

    if (this.down != down) this.active = down;
    this.down = down; 

    if (type == "keyup"){
      this.blocked= false;
    }

  }
}

