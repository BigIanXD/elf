var wall = [];
for(var i = 0;i < canvasWidth;i++){
    wall[i] = [];
    for(var j = 0;j < canvasHeight;j++){
        wall[i][j] = 0;
    }
}

for(var i = 0;i < canvasWidth;i++){
    for(var j = 0;j < canvasHeight;j++){
        console.log(wall[i][j]);
    }
}

var createWall = function (x1, y1, x2, y2) {  
    if(x1 == x2){
        for(var i = y1;i <= y2;i++){
            wall[x1][i] = 1;
        }
        x1 *= blockSize;
        y1 *= blockSize;
        x2 *= blockSize;
        y2 *= blockSize;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1+40, y1);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2+40, y2);
        ctx.moveTo(x1+40, y1);
        ctx.lineTo(x2+40, y2);
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();
    }else if(y1 == y2){
        for(var i = y1;i <= y2;i++){
            wall[x1][i] = 1;
        }
        x1 *= blockSize;
        y1 *= blockSize;
        x2 *= blockSize;
        y2 *= blockSize;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y1+40);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, y2+40);
        ctx.moveTo(x1, y1+40);
        ctx.lineTo(x2, y2+40);
        ctx.strokeStyle = "#0000ff";
        ctx.stroke();
    }
    
}

