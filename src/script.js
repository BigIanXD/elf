var isMobile = false;

var doodle = new Doodle(0, 0);
var tmpdirection = doodle.Direction;
var score = new Label(1000, 60, "Score: 0");
score.align = Dir.right;
var hpView = new ViewHP(10, 5);
var new_maze = new Maze();
let read_success = false;

var GhostInterval = new Array(ghost.length);
var GhostTimeout = new Array(ghost.length);
var DoodleInterval = 0;
var FoodInterval = 0;
var PelletInterval = 0;

new_maze.open(arrwewe)
setMaze(new_maze)
score.x = playBoard.width;
score.y = playBoard.padding.y;
getDoodleStartPos();
getGhostStartPos();
read_success = true;
    /*.then(()=>{
        setMaze(new_maze)
        score.x = playBoard.width;
        score.y = playBoard.padding.y;
        getDoodleStartPos();
        getGhostStartPos();
        read_success = true;
    });*/

$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

$("body").on("touchstart",function(e){
    e.preventDefault();
    if(isMobile){
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    }
});
$("body").on("touchmove",function(e){
    e.preventDefault();
    if(isMobile){
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
        X = moveEndX - startX,
        Y = moveEndY - startY;
        if(Math.abs(X) > Math.abs(Y) && X > 0){
            tmpdirection = Dir.right;
        }
        else if(Math.abs(X) > Math.abs(Y) && X < 0){
            tmpdirection = Dir.left;
        }
        else if(Math.abs(Y) > Math.abs(X) && Y > 0){
            tmpdirection = Dir.down;
        }
        else if(Math.abs(Y) > Math.abs(X) && Y < 0){
            tmpdirection = Dir.up;
        }
    }
});

$(window).on('resize', resetResolution);

var onloadFunction = function () {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        isMobile = true;
    }else{
        // false for not mobile device
        isMobile = false;
    }
    //while(!read_success){}
    retry();
    
    //console.log('onload')
    FoodInterval = setInterval(function(){
        for(let i=0; i<current_maze.foodList.length; i++){
            if(doodle.touched(current_maze.foodList[i])){
                current_maze.foodList[i].hide();
                doodle.score+=Food.score;
            }
        }
    }, 20)
    PelletInterval = setInterval(function(){
        for(let i=0; i<current_maze.pelletList.length; i++){
            if(doodle.touched(current_maze.pelletList[i])){
                current_maze.pelletList[i].hide();
                doodle.score+=Pellet.score;
                Ghost.switch_mode(GhostMode.Frightened);
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
    for(var i=0; i < current_maze.pelletList.length; i++){
        current_maze.pelletList[i].draw();
    }
    doodle.draw();
    for(let i = 0; i < 4; i++){
        ghost[i].draw();
        if(ghost[i].showRoute)
            ghost[i].drawroute();
    }
    requestAnimationFrame(redraw);
}

function die(){
    //console.log("die");
    doodle.Direction = Dir.stop;
    for(let i = 0; i < 4; i++){
        clearInterval(GhostInterval[i]);
        GhostInterval[i] = 0;
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
    //console.log("retry");
    Ghost.switch_mode(GhostMode.Chase);
    for(let i = 0; i < ghost.length; i++){
        GhostInterval[i] = 0;
        ghost[i].x = ghostStartPos[i].x*blockSize;
        ghost[i].y = ghostStartPos[i].y*blockSize;
        ghost[i].route = []
        GhostTimeout[i] = setTimeout(function(){
            GhostInterval[i] = setGhostInterval(i);
        }, ghostOutTime[i]*1000);
    }
    doodle.x = doodleStartPos.x;
    doodle.y = doodleStartPos.y;
    doodle.Direction = Dir.left;
    doodle.determine_dir(doodle.x/blockSize, doodle.y/blockSize);
    DoodleInterval = setInterval('doodle.interval()', doodleStepDelay);
}
function reset(){
    doodle.score = 0;
    doodle.hp = MaxHP;
    for(let i=0; i<current_maze.foodList.length; i++){
        current_maze.foodList[i].show();
    }
    for(let i=0; i<current_maze.pelletList.length; i++){
        current_maze.pelletList[i].show();
    }
    retry();
}