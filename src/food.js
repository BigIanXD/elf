function Food (x, y){
    this.img =  new Image();
    this.img.src = "src\\img\\food.png";
    this.x = x;
    this.y = y;
    this.size = 5;
};

Food.prototype.draw = draw;
Food.prototype.clear = clear;

var foods = []
var createFood = function () {
    console.log('create food');
    for(var i = 0;i < canvasHeight;i++){
        for(var j = 0;j < canvasWidth;j++){
            foods.push(new Food(j * blockSize, i * blockSize));
        }
    }
}
