var food = {
    img : new Image(),
    x : 0,
    y : 0,
    size : 15,
    draw : draw,
    clear : clear,
    setup : function () { 
        for(var i = 0;i < canvasHeight;i++){
            for(var j = 0;j < canvasWidth;j++){
                food.x = i * blockSize;
                food.y = j * blockSize;
                food.draw();
            }
        }
    }
};
