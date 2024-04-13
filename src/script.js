var doodle = new Doodle(0, 0);
var tmpdirection = doodle.Direction;
let score = new Label(1000, 60, "Score: 0");
score.align = "right";

$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

$(window).on('resize', resetResolution);

var onloadFunction = function () { 
    setInterval(doodleInterval, 25);
    setInterval(ghostInterval, 25);
    console.log('onload')
    /*setTimeout(function(){
        bfs(new Position(0, 0));
    }, 20)*/
    setInterval(function(){
        for(let i=0; i<current_maze.foodList.length; i++){
            if(doodle.touched(current_maze.foodList[i])){
                current_maze.foodList[i].hide();
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
    current_maze.draw();
    for(var i=0; i < current_maze.foodList.length; i++){
        current_maze.foodList[i].draw();
    }
    doodle.draw();
    ghost.draw();
    drawroute(ghost.route);
    requestAnimationFrame(redraw);
}

