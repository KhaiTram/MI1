//Author: Khai

class Display{ 
  
  constructor(canvas){
      // Buffer Canvas wird erstellt
      this.buffer = document.createElement("canvas").getContext("2d");
      //Referenz zum Context des Hauptcanvas
      this.context = canvas.getContext("2d");
  }

  // Im Buffer wird hier das Rechteck gezeichnet
  drawRectangle(x, y, width, height, color) {

    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

  };

  drawObject(image, source_x, source_y, destination_x, destination_y, width, height) {
    this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
  };

  // Zeichnet ein Bild als Hintergrund um die Spuren zu löschen
  fill(bgImg) {
    var pat = this.context.createPattern(bgImg,"no-repeat");
    this.buffer.rect(0,0,1920,1080);
    this.buffer.fillStyle = pat;
    this.buffer.fill();
    //this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);

  };

  //Zeichnet den gebufferten Canvas auf den Hauptcanvas
  render() { 
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); 
  };

  // Die Größe des Canvas wird hier der Größe der Spielewelt angepasst
  resize(width, height, height_width_ratio) {

    // Das Höhe-Breitenverhältnis des Canvas und seine Größe wird hier angepasst 
    if (height / width > height_width_ratio) {

      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {

      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;

    }

    this.context.imageSmoothingEnabled = true;
    this.context.imageSmoothingQuality = 'high';

  };

};

