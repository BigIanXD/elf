const doodleMove = function (dir, distance) {
    if (dir == "up" && this.y - distance >= 0 && !hasWall(this.x, this.y - blockSize) ) {
        this.clear();
        this.y -= distance;
        this.draw();
    } else if (dir == "down" && this.y + distance + blockSize <= canvas.height && !hasWall(this.x, this.y + blockSize)) {
        this.clear();
        this.y += distance;
        this.draw();
    }
    else if (dir == "right" && this.x + distance + blockSize <= canvas.width && !hasWall(this.x + blockSize, this.y)) {
        this.clear();
        this.x += distance;
        this.draw();
    }
    else if (dir == "left" && this.x - distance >= 0 && !hasWall(this.x - blockSize, this.y)) {
        this.clear();
        this.x -= distance;
        this.draw();
    }
}


var doodle = {
    img : new Image(),
    size : 35,
    Direction : "right",
    speed : 4,
    x : 0,
    y : 0,
    draw : draw,
    clear : clear,
    move : doodleMove,
};

var tmpdirection = doodle.Direction;
const doodleInterval = function () {
    if(doodle.x % blockSize === 0 && doodle.y % blockSize === 0){
        doodle.Direction = tmpdirection;
        doodle.img.src = "src\\img\\doodle_" + doodle.Direction + ".png";
    }
    doodle.move(doodle.Direction, doodle.speed);
}
