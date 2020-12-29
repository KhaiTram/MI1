let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

ctx.clearRect (0,0,800,600);

ctx.fillsStyle = '#f00';

ctx.fillRect(20,20,100,100);

ctx.fillsStyle ='#00f';

ctx.fillRect(340, 200, 50, 50);