function Food (x, y){
    this.img =  new Image();
    this.img.src = "src\\img\\food.png";
    this.x = x;
    this.y = y;
    this.size = 5;
    this.interval = null;
};
var foods = [];
//foods.display = 0;
Food.prototype.draw = draw;
Food.prototype.clear = clear;
Food.prototype.touch = function(){
    if(touch(this.x, this.y, 40)){
        console.log(this.interval)
        clearInterval(this.interval);
        this.clear();
        doodle.score+=10;
    }
    //foods.display--;
};


var createFood = function () {
    console.log('create food');
    for(var i = 0;i < canvasHeight;i++){
        for(var j = 0;j < canvasWidth;j++){
            foods.push(new Food(j * blockSize, i * blockSize));
        }
    }
}
