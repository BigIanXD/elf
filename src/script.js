var hasTouchScreen = false;
var devMode = false;

var doodle = new Doodle(0, 0);
var tmpdirection = doodle.Direction;
var score = new Label(1000, 60, "Score: 0");
score.align = "right";
var level_view = new Label(140, 60, "Level: 1");
level_view.align = "left";
var hpView = new ViewHP(10, 30);
var level = 1;
var food_eaten_cnt = 0;
var new_maze = new Maze();
let read_success = false;

var GhostInterval = new Array(ghost.length);
var GhostTimeout = new Array(ghost.length);
var DoodleInterval = 0;
var FoodInterval = 0;
var PelletInterval = 0;
var FrightenedTimeout = 0;
var Frightened_DisablingTimeout = [0, 0, 0, 0];
var DieInterval = 0;
var previousStamp = null;
var lvl_up_timer = new Timer(null, 2000);

var Scatter_Chase_duration = [
    //[1, 2, 3, 4, 5, 6, 7], testing
    [7, 20, 7, 20, 5, 20, 5], //  level == 1
    [7, 20, 7, 20, 5, 1033, 1/60], // 2 <= level  < 5
    [5, 20, 5, 20, 5, 1037, 1/60] // level >= 5
]; // unit: (sec)
var scd = Scatter_Chase_duration;
for(let i = 0; i < scd.length; i++){
    for(let j = 0; j < scd[i].length; j++){
        scd[i][j]*=1000;
    }
}
var Scatter_Chase_timer = new ArrayTimer(function(){
    if(Ghost.globalMode === GhostMode.Chase) Ghost.switch_mode(GhostMode.Scatter);
    else if(Ghost.globalMode === GhostMode.Scatter) Ghost.switch_mode(GhostMode.Chase);
}, Scatter_Chase_duration[0]);



new_maze.open(maze_arr)
setMaze(new_maze)
score.x = playBoard.width;
score.y = playBoard.padding.y;
getDoodleStartPos();
getGhostStartPos();
getGhostScatterPos();
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
    if(hasTouchScreen){
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    }
});
$("body").on("touchmove",function(e){
    e.preventDefault();
    if(hasTouchScreen){
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
    if(('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)){
        hasTouchScreen = true;
    }else{
        hasTouchScreen = false;
    }
    //while(!read_success){}
    retry();
    
    //console.log('onload')
    FoodInterval = setInterval(function(){
        let cm = current_maze;
        for(let i=0; i<cm.foodList.length; i++){
            if(doodle.touched(cm.foodList[i])){
                cm.foodList[i].hide();
                doodle.score+=Food.score;
                food_eaten_cnt++;
                if(food_eaten_cnt >= cm.foodList.length+cm.pelletList.length)
                    level_up();
            }
        }
    }, 20)
    PelletInterval = setInterval(function(){
        let cm = current_maze;
        for(let i=0; i<current_maze.pelletList.length; i++){
            if(doodle.touched(current_maze.pelletList[i])){
                current_maze.pelletList[i].hide();
                doodle.score+=Pellet.score;
                Scatter_Chase_timer.pause();
                Ghost.switch_mode(GhostMode.Frightened);
                food_eaten_cnt++;
                if(food_eaten_cnt >= cm.foodList.length+cm.pelletList.length)
                    level_up();
            }
        }
    }, 20)
    requestAnimationFrame(redraw)
}

function redraw(timeStamp){
    if(!previousStamp) previousStamp = timeStamp;
    else{
        let duration = (timeStamp - previousStamp)/1000;
        previousStamp = timeStamp;
        /*console.log(`duration:${duration}`);
        console.log(`fps:${1/duration}`);*/
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.fillStyle = "rgba(4, 1, 51, 0.995)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    score.text = `Score: ${doodle.score}`;
    score.draw();
    level_view.text = `Level: ${level}`;
    level_view.draw();
    hpView.draw();
    current_maze.draw();
    doodle.draw();
    for(let i = 0; i < 4; i++){
        ghost[i].draw();
        if(devMode){
            ghost[i].drawGrid();
            ghost[i].drawTarget();
        }
        
        if(ghost[i].showRoute)
            ghost[i].drawroute();
    }
    if(devMode)
        doodle.drawGrid();
    requestAnimationFrame(redraw);
}
function reset_timer(){
    console.log('reset_timer');
    doodle.Direction = Dir.stop;
    for(let i = 0; i < 4; i++){
        clearInterval(GhostInterval[i]);
        GhostInterval[i] = 0;
        clearTimeout(GhostTimeout[i]);
        GhostTimeout[i] = 0;
    }
    clearInterval(DoodleInterval);
    clearInterval(DieInterval); // Prevent calling die continuously and crashing the game
    clearTimeout(FrightenedTimeout);
    for(let i = 0; i < Frightened_DisablingTimeout.length; i++)
        clearTimeout(Frightened_DisablingTimeout[i]);
    Scatter_Chase_timer.reset();
    lvl_up_timer.reset();
}
function die(){
    console.log("die");
    reset_timer();
    DieInterval = setTimeout(function(){
        doodle.hp--;
        if(doodle.hp <= 0) reset();
        else retry();
    }, 2000);
}
function retry(){
    console.log("retry");
    Ghost.switch_mode(GhostMode.Scatter);
    for(let i = 0; i < ghost.length; i++){
        GhostInterval[i] = 0;
        ghost[i].switch_mode(GhostMode.Scatter);
        ghost[i].x = ghostStartPos[i].x*blockSize;
        ghost[i].y = ghostStartPos[i].y*blockSize;
        ghost[i].updateGrid();
        ghost[i].route = [];
        GhostTimeout[i] = setTimeout(function(){
            GhostInterval[i] = setGhostInterval(i);
        }, ghostOutTime[i]*1000);
    }
    Scatter_Chase_timer.start();

    doodle.x = doodleStartPos.x;
    doodle.y = doodleStartPos.y;
    doodle.Direction = Dir.left;
    tmpdirection = Dir.left;
    doodle.switch_costume(doodle.Direction);
    doodle.determine_dir();
    DoodleInterval = setInterval('doodle.interval()', doodleStepDelay);
}
function reset(){
    food_eaten_cnt = 0;
    doodle.score = 0;
    doodle.hp = MaxHP;
    level = 1;
    for(let i=0; i<current_maze.foodList.length; i++){
        current_maze.foodList[i].show();
    }
    for(let i=0; i<current_maze.pelletList.length; i++){
        current_maze.pelletList[i].show();
    }
    retry();
}
function level_up(){
    console.log('level up');
    reset_timer();
    lvl_up_timer.callback = function(){
        food_eaten_cnt = 0;
        set_level(level+1);
        for(let i=0; i<current_maze.foodList.length; i++){
            current_maze.foodList[i].show();
        }
        for(let i=0; i<current_maze.pelletList.length; i++){
            current_maze.pelletList[i].show();
        }
        retry();
    }
    lvl_up_timer.start();
}
function set_level(lvl){
    level = lvl;
    if(lvl === 1) Scatter_Chase_timer.reset(Scatter_Chase_duration[0]);
    else if(lvl >= 2 && lvl < 5) Scatter_Chase_timer.reset(Scatter_Chase_duration[1]);
    else Scatter_Chase_timer.reset(Scatter_Chase_duration[2]);
}