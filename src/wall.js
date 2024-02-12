var createWall = function (x1, y1, x2, y2) { 
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate(0, padding);
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
    ctx.restore();
}
function drawWall(){
    createWall(1, 1, 8, 1);
    createWall(9, 1, 11, 1);
    createWall(12, 1, 13, 1);
    createWall(14, 1, 16, 1);
    createWall(17, 1, 24, 1);
    createWall(7, 2, 8, 2);
    createWall(10, 2, 11, 2);
    createWall(12, 2, 13, 2);
    createWall(14, 2, 15, 2);
    createWall(17, 2, 18, 2);
    createWall(1, 3, 6, 3);
    createWall(12, 3, 13, 3);
    createWall(19, 3, 24, 3);
    createWall(1, 4, 1, 7);
    createWall(23, 4, 23, 7);
    createWall(5, 4, 6, 4);
    createWall(8, 4, 10, 4);
    createWall(15, 4, 17, 4);
    createWall(19, 4, 20, 4);
    createWall(3, 5, 4, 5);
    createWall(8, 5, 9, 5);
    createWall(11, 5, 14, 5);
    createWall(16, 5, 17, 5);
    createWall(21, 5, 22, 5);
    createWall(3, 6, 6, 6);
    createWall(7, 6, 9, 6);
    createWall(10, 6, 10, 9);
    createWall(14, 6, 14, 9);
    createWall(16, 6, 18, 6);
    createWall(19, 6, 22, 6);
    createWall(0, 8, 9, 8);
    createWall(16, 8, 25, 8);
    createWall(8, 9, 9, 9);
    createWall(10, 9, 15, 9);
    createWall(16, 9, 17, 9);
    createWall(0, 10, 1, 10);
    createWall(2, 10, 2, 12);
    createWall(22, 10, 22, 12);
    createWall(4, 10, 7, 10);
    createWall(18, 10, 21, 10);
    createWall(24, 10, 25, 10);
    createWall(8, 11, 17, 11);
}

drawWall();