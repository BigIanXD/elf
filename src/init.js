const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
class Position{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
};
const playBoard = {
	height: 600,
	width: 1000,
	padding: new Position(0, 60)
};
const canvas_before_zoom = {
	height: playBoard.height+playBoard.padding.y,
	width: playBoard.width+playBoard.padding.x
};
const dpr = window.devicePixelRatio;
var zoom; // canvas/playBoard
function resetResolution(){
	let canvas_aspect = canvas_before_zoom.width/canvas_before_zoom.height;
	let window_aspect = window.innerWidth/window.innerHeight;
	if(window_aspect > canvas_aspect){
		canvas.height = Math.round(window.innerHeight*dpr);
		zoom = canvas.height/canvas_before_zoom.height;
		canvas.width = Math.round(canvas_before_zoom.width*zoom);
		canvas.style.height = window.innerHeight+'px';
		canvas.style.width = Math.round(canvas.width/dpr)+'px';
	}else{
		canvas.width = Math.round(window.innerWidth*dpr);
		zoom = canvas.width/canvas_before_zoom.width;
		canvas.height = Math.round(canvas_before_zoom.height*zoom);
		canvas.style.width = window.innerWidth+'px';
		canvas.style.height = Math.round(canvas.height/dpr)+'px';
	}
}
resetResolution();

const blockSize = 40;
const canvasHeight = canvas.height / blockSize;
const canvasWidth = canvas.width / blockSize;

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};
const draw = function () {  
    ctx.drawImage(this.img, this.x + ((blockSize - this.size) / 2), this.y + ((blockSize - this.size) / 2), this.size, this.size);
}
const clear = function () {
    ctx.clearRect(this.x, this.y + ((blockSize - this.size) / 2), this.size + ((blockSize - this.size) / 2), this.size);
}

var wall = [];
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
}
//nothing