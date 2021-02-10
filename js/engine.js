// Author: Khai Tram


class Engine {
    
    /*
    param: 
    timeStep:Zeitabstand zwischen Updates
    update:update Funktion 
    render:render Funktion
    */
    constructor(timeStep, update, render) {

        this.timeLastUpdate = 0;// Zeit die seit dem letzten Update vergangen ist
        this.requestAnimationFrame = undefined;//referenz auf die window requestanimationFrame methode. wird unten zugeordnet
        this.time = undefined;// Letzter Zeitpunkt in der die Gameloop getriggert wird
        this.timeStep = timeStep;// in welchen Zeitabstand geupdated werden soll
        this.updated = false;// Indikator dass gerendert werden soll
        this.update = update;// update Funktion die übergeben wird
        this.render = render;// render Funktion die übergeben wird

    }
    // Ein durchgang durch die gameLoop
    loop(timeStamp) {

        /* timeLastUpdate erhöht sich um den Timestamp. Dabei wird time abgezogen weil ansonsten die bereits 
        erfasste Zeit mitaddiert wird und dadurch ein zu hoher Wert entsteht*/
        this.timeLastUpdate += timeStamp - this.time;
        this.time = timeStamp;

        /* Sicherheitsvorrichtung um zu verhindern, dass durch zu langsame Rechner die CPU Überlasted wird, weil mehrere tiles geupdated werden*/
        if (this.timeLastUpdate >= this.timeStep * 3) {

            this.timeLastUpdate = this.timeStep;
        }

        /*Wir wollen für jeden vergangenen Timestep ein Update haben, deshalb wird als Grundlage hier timeLastUpdate genutzt. timeStep wird nach jedem 
        Ablauf von timeLastUpdate abgezogen. Sollten durch Geschwindigkeitsprobleme Verzögerungen entstehen werden trotzdem alle Updates durchgeführt. 
        */
        while (this.timeLastUpdate >= this.timeStep) {

            //Substraktion um zu indizieren, dass das Update für einen Step erfolgt ist
            this.timeLastUpdate -= this.timeStep;

            this.update(timeStamp);

            // Indikator wird auf true gesetzt damit gerendert werden soll
            this.updated = true;

        }

        /* Das Spiel soll nur gerendert werden wenn, dass Spiel geupdated wurde */
        if (this.updated) {

            //Wird auf false gesetzt damit nicht sofort wieder gerendert wird
            this.updated = false;
            this.render(timeStamp);

        }

        //Window Funtktion die aufgerufen wird um eine Animation zu updaten
        this.requestAnimationFrame = window.requestAnimationFrame(this.handleLoop);

    }

    //Arrow function wird genutzt damit loop accesible ist
    handleLoop = (timeStamp) => {
        this.loop(timeStamp);
    }

    start() {

        this.timeLastUpdate = this.timeStep;
        this.time = window.performance.now();
        this.requestAnimationFrame = window.requestAnimationFrame(this.handleLoop);

    }

    stop() {
        window.cancelAnimationFrame(this.requestAnimationFrame);
    }
};

