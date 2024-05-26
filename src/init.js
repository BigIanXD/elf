const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
class Position{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
};


const blockSize = 40; //35
const doodleSize = 35; //53
const wallWidth = 25;
//const wallWidth = blockSize-(doodleSize-blockSize)-2;
const doodleStep = 5;
const doodleStepDelay = 30;
const MaxHP = 4;

const Dir = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    stop: 4
};
var dir_to_string = function(i){
    return ["left", "right", "up", "down", "stop"][i]
}
var reverse_dir = function(dir){
    if(dir === Dir.left) return Dir.right;
    if(dir === Dir.right) return Dir.left;
    if(dir === Dir.up) return Dir.down;
    if(dir === Dir.down) return Dir.up;
}
var keycode = {
    38: Dir.up,
	40: Dir.down,
	37: Dir.left,
	39: Dir.right
};
const draw = function () {  
    ctx.drawImage(this.img, this.x + ((blockSize - this.size) / 2), this.y + ((blockSize - this.size) / 2), this.size, this.size);
}
const clear = function () {
    ctx.clearRect(this.x, this.y + ((blockSize - this.size) / 2), this.size + ((blockSize - this.size) / 2), this.size);
}

var getRandomInt = function(max){
    return Math.floor(Math.random()*max)
}

/*var wall = [];
for(var i = 0;i <= canvasWidth;i++){
    wall[i] = [];
    for(var j = 0;j <= canvasHeight;j++){
        wall[i][j] = 0;
    }
}

const hasWall = function (trueX, trueY) {
    var x = parseInt(trueX / blockSize);
    var y = parseInt(trueY / blockSize);
    if(trueX % blockSize === 0){
        x++;
    }
    if(trueY % blockSize === 0){
        y++;
    }
    if(wall[x][y] === 1) {
        return true;
    }
    else {
        return false;
    }
}*/
//nothing