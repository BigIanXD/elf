const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
class Position{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
    static distance(a, b){
        return Math.pow(Math.pow((a.y-b.y), 2)+Math.pow((a.x-b.x), 2), 0.5);
    }
    static sDistance(a, b){ // square of the distance
        return Math.pow((a.y-b.y), 2)+Math.pow((a.x-b.x), 2);
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
    right: 0,
    down: 1,
    left: 2,
    up: 3,
    stop: 4
};
var dir_to_string = function(i){
    return ["right", "down", "left", "up", "stop"][i]
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
	39: Dir.right,
    87: Dir.up, // w
    65: Dir.left, // a
    83: Dir.down, // s
    68: Dir.right // d
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