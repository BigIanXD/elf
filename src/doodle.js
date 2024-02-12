class Doodle extends Sprite{
    constructor(x, y){
        super(x, y, 35);
        this.Direction = "right";
        this.speed = 4;
        this.hp = 3;
        this.score = 0;
    }
    move(dir, distance){
        if (dir == "up" && this.y - distance >= 0) {
            //this.clear();
            this.y -= distance;
            this.draw();
        } else if (dir == "down" && this.y + distance + blockSize <= playBoard.height) {
            //this.clear();
            this.y += distance;
            this.draw();
        }
        else if (dir == "right" && this.x + distance + blockSize <= playBoard.width) {
            //this.clear();
            this.x += distance;
            this.draw();
        }
        else if (dir == "left" && this.x - distance >= 0) {
            //this.clear();
            this.x -= distance;
            this.draw();
        }
    }
};
var doodle = new Doodle(0, 0);

var tmpdirection = doodle.Direction;
const doodleInterval = function () {
    if(doodle.x % blockSize === 0 && doodle.y % blockSize === 0){
        doodle.Direction = tmpdirection;
        doodle.img.src = "src\\img\\doodle_" + doodle.Direction + ".png";
    }
    doodle.move(doodle.Direction, doodle.speed);
}
