var food = {
    img : new Image(),
    x : 0,
    y : 0,
    size : 5,
    draw : draw,
    clear : clear,
    setup : function () { 
        for(var i = 0;i < canvasHeight;i++){
            for(var j = 0;j < canvasWidth;j++){
                food.x = j * blockSize;
                food.y = i * blockSize;
                food.draw();
            }
        }
    }
};
food.img.src = "src\\img\\food.png";
