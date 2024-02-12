class Food extends Sprite{
    constructor(x, y){
        super(x, y, 5);
        this.img.src = "src\\img\\food.png";
    }
    
};
var foods = [];

var createFood = function () {
    console.log('create food');
    for(var i = 0;i < canvasHeight;i++){
        for(var j = 0;j < canvasWidth;j++){
            foods.push(new Food(j * blockSize, i * blockSize));
        }
    }
}
