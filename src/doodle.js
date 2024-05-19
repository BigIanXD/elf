class Doodle extends Sprite{
    constructor(x, y){
        super(x, y, doodleSize);
        this.Direction = "right";
        this.img.src = "src\\img\\doodle_" + this.Direction + ".png";
        this.speed = doodleStep;
        this.hp = MaxHP;
        this.score = 0;
        this.noclip = false;
    }
    move(){
        if(this.Direction === "right") this.x+= this.speed;
        else if(this.Direction === "left") this.x-= this.speed;
        else if(this.Direction === "up") this.y-= this.speed;
        else if(this.Direction === "down") this.y+= this.speed;
        this.draw();
    }
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(dir);
        //console.log(pos);
        if(pos.y >= 0 && pos.y < current_maze.height && pos.x >= 0 && pos.x < current_maze.width){
            let blockProperty = current_maze.arr[pos.y][pos.x];
            if(blockProperty === Block.food || blockProperty === Block.doodleStart){
                return false;
            }
        }
        return true;
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
    interval(){
        if(!doodle.noclip){
            for(let i = 0; i < 4; i++){
                if(doodle.touched(ghost[i])){
                    doodle.Direction = "stop";
                    die();
                }
            }
        }
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

var doodleStartPos = new Position(0, 0);
var getDoodleStartPos = function(){
    let i, j;
    for(i=0;i<current_maze.height; i++){
        for(j=0;j<current_maze.width; j++){
            if(current_maze.arr[i][j] === Block.doodleStart){
                doodleStartPos = new Position(j*blockSize, i*blockSize);
                return;
            }
        }
    }
}

class ViewHP{
    constructor(x, y){
        this.hp = new Array(MaxHP-1);
        for(let i = 0; i < this.hp.length; i++){
            let p = new Sprite(x+30*i, y, 25);
            p.img.src = "src/img/doodle_right.png";
            p.enablePadding = false;
            this.hp[i] = p;
        }
    }
    draw(){
        for(let i = 0; i < doodle.hp-1; i++){
            this.hp[i].draw();
        }
    }
};