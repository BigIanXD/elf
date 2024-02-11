class Food extends Sprite{
    constructor(x, y){
        super(x, y, 30);
        this.img.src = "src\\img\\food.png";
    }
    
};
var foods = [];
//foods.display = 0;
/*Food.prototype.touch = function(){
    if(touch(this.x, this.y, 40)){
        console.log(this.interval)
        clearInterval(this.interval);
        this.clear();
        doodle.score+=10;
    }
    //foods.display--;
};*/


var createFood = function () {
    console.log('create food');
    for(var i = 0;i < canvasHeight;i++){
        for(var j = 0;j < canvasWidth;j++){
            foods.push(new Food(j * blockSize, i * blockSize));
        }
    }
}
