const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 1000;
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