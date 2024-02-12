$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

setInterval(doodleInterval, 20);
createFood();
let score = new Label(1000, 60, "Score: 0");
score.align = "right";

var onloadFunction = function () {  
    console.log('onload')
    setInterval(function(){
        for(let i=0; i<foods.length; i++){
            if(doodle.touched(foods[i])){
                foods[i].hide();
                doodle.score+=10;
            }
        }
    }, 20)
    requestAnimationFrame(redraw)
}

function redraw(){
    ctx.save();
    ctx.fillStyle = "rgba(4, 1, 51, 0.995)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    score.text = `Score: ${doodle.score}`;
    score.draw();
    for(var i=0; i < foods.length; i++){
        foods[i].draw();
    }
    doodle.draw();
    requestAnimationFrame(redraw);
}

