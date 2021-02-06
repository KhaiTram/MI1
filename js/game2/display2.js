//Author: Khai

const Display = function (canvas) {

  // Buffer Canvas wird erstellt
  this.buffer = document.createElement("canvas").getContext("2d"),
  //Referenz zum Context des Hauptcanvas
  this.context = canvas.getContext("2d");

  // Im Buffer wird hier das Rechteck gezeichnet
  this.drawRectangle = function (x, y, width, height, color) {

    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

  };

  // Zeichnet ein Großes Rechteck als Hintergrund um die Spuren zu löschen
  this.fill = function (color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  };

  //Zeichnet den gebufferten Canvas auf den Hauptcanvas
  this.render = function () { 
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); 
  };

  // Die Größe des Canvas wird hier der Größe der Spielewelt angepasst
  this.resize = function (width, height, height_width_ratio) {

    // Das Höhe-Breitenverhältnis des Canvas und seine Größe wird hier angepasst 
    if (height / width > height_width_ratio) {

      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {

      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;

    }

    this.context.imageSmoothingEnabled = false;

  };

};

Display.prototype = {

  constructor: Display

};
