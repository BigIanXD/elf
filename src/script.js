$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

$(window).on('resize', resetResolution);

setInterval(doodleInterval, 20);
let score = new Label(1000, 60, "Score: 0");
score.align = "right";

var onloadFunction = function () {  
    console.log('onload')
    setInterval(function(){
        for(let i=0; i<maze.foodList.length; i++){
            if(doodle.touched(maze.foodList[i])){
                maze.foodList[i].hide();
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
    maze.draw();
    for(var i=0; i < maze.foodList.length; i++){
        maze.foodList[i].draw();
    }
    doodle.draw();
    requestAnimationFrame(redraw);
}

