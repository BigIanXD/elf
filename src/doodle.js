class Doodle extends Sprite{
    constructor(x, y){
        super(x, y, doodleSize);
        this.Direction = "right";
        this.img.src = "src\\img\\doodle_" + this.Direction + ".png";
        this.speed = 4;
        this.hp = 3;
        this.score = 0;
    }
    move(){
        if(this.Direction === "right") this.x+= this.speed;
        else if(this.Direction === "left") this.x-= this.speed;
        else if(this.Direction === "up") this.y-= this.speed;
        else this.y+= this.speed;
        this.draw();
    }
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(dir);
        console.log(pos);
        let blockProperty = current_maze.arr[pos.y][pos.x];
        if(blockProperty === Block.food){
            return false;
        }else{
            return true;
        }
    }
    _get_newly_touched_block(dir){
        let x = this.x/blockSize, y = this.y/blockSize;
        if(dir === "right") x+= 1;
        else if(dir === "left") x-= 1;
        else if(dir === "up") y-= 1;
        else y+= 1;
        return new Position(x, y);
        //get_2nd_closest_block(x, y);
    }
    /*get_2nd_closest_block(x, y){
        if(x%blockSize===0){
            return new Position(x/blockSize, y/blockSize)
        }else{ // y %blockSize === 0

        }
    }*/
    /*2nd_closest(num){
        let floor = Math.floor(num);
        let round = Math.round(num);
        let ce
    }*/
};

const doodleInterval = function () {
    if(doodle.x % blockSize === 0 && doodle.y % blockSize === 0){
        if(doodle.Direction !== tmpdirection){
            if(!doodle.touchWall(tmpdirection)){
                doodle.Direction = tmpdirection;
                doodle.img.src = "src\\img\\doodle_" + doodle.Direction + ".png";
            }
        }
        if(!doodle.touchWall(doodle.Direction)){
            doodle.move();
        }
    }
    else{
        doodle.move();
    }
    
}
