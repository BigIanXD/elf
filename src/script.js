var doodle = new Doodle(0, 0);
var tmpdirection = doodle.Direction;
var score = new Label(1000, 60, "Score: 0");
score.align = "right";
var hpView = new ViewHP(10, 5);
var new_maze = new Maze();
let read_success = false;

var GhostInterval = new Array(ghost.length);
var GhostTimeout = new Array(ghost.length);
var DoodleInterval = 0;
var FoodInterval = 0;

new_maze.open("src/json/board.json")
    .then(()=>{
        setMaze(new_maze)
        score.x = playBoard.width;
        score.y = playBoard.padding.y;
        getDoodleStartPos();
        getGhostStartPos();
        read_success = true;
    });

$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

$(window).on('resize', resetResolution);

var onloadFunction = function () {
    //while(!read_success){}
    retry();
    
    console.log('onload')
    FoodInterval = setInterval(function(){
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
    hpView.draw();
    current_maze.draw();
    for(var i=0; i < current_maze.foodList.length; i++){
        current_maze.foodList[i].draw();
    }
    doodle.draw();
    for(let i = 0; i < 4; i++){
        ghost[i].draw();
        ghost[i].drawroute();
    }
    requestAnimationFrame(redraw);
}

function die(){
    console.log("die");
    doodle.Direction = "stop";
    for(let i = 0; i < 4; i++){
        clearInterval(GhostInterval[i]);
        clearTimeout(GhostTimeout[i])
    }
    clearInterval(DoodleInterval);
    setTimeout(function(){
        doodle.hp--;
        if(doodle.hp <= 0) reset();
        else retry();
    }, 2000);
}
function retry(){
    console.log("retry");
    for(let i = 0; i < ghost.length; i++){
        GhostInterval[i] = 0;
        ghost[i].x = ghostStartPos[i].x;
        ghost[i].y = ghostStartPos[i].y;
        ghost[i].route = []
        GhostTimeout[i] = setTimeout(function(){
            GhostInterval[i] = setGhostInterval(i);
        }, ghostOutTime[i]*1000);
    }
    doodle.x = doodleStartPos.x;
    doodle.y = doodleStartPos.y;
    DoodleInterval = setInterval('doodle.interval()', doodleStepDelay);
}
function reset(){
    doodle.score = 0;
    doodle.hp = MaxHP;
    for(let i=0; i<current_maze.foodList.length; i++){
        current_maze.foodList[i].show();
    }
    retry();
}