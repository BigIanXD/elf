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
        for(var i = x1;i <= x2;i++){
            wall[i][y1] = 1;
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
createWall(1, 1, 8, 1);
createWall(9, 1, 11, 1);
createWall(12, 1, 13, 1);
createWall(12, 1, 13, 1);
createWall(14, 1, 16, 1);
createWall(17, 1, 24, 1);
createWall(7, 2, 8, 2);
createWall(10, 2, 11, 2);
createWall(12, 2, 13, 2);
createWall(14, 2, 15, 2);
createWall(17, 2, 18, 2);
