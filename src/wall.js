var wall = new Array(canvasWidth);
for(var i = 0;i < canvasWidth;i++)
    wall[i] = new Array(canvasHeight);

for(var i = 0;i < canvasWidth;i++){
    for(var j = 0;j < canvasHeight;j++){
        wall[i][j] = false;
    }
}

var createWall = function (x1, y1, x2, y2) {  
    x1 *= blockSize;
    y1 *= blockSize;
    x2 *= blockSize;
    y2 *= blockSize;
    if(x1 == x2){
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x1+38, y1);
        ctx.lineTo(x2+38, y2);
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();
    }else if(y1 == y2){
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x1, y1+38);
        ctx.lineTo(x2, y2+38);
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();
    }
    
}

createWall(0, 7, 25, 7);