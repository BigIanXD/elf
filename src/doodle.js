class Doodle extends SnappedSprite{
    constructor(x, y){
        super(x, y, doodleSize);
        this.Direction = Dir.right;
        this.costume[0].src = "src\\img\\doodle_" + dir_to_string(this.Direction) + ".png";
        this.speed = doodleStep;
        this.obstacle.push(Block.door);
        this.hp = MaxHP;
        this.score = 0;
        this.noclip = false;
    }
    /*move(){
        if(this.Direction === Dir.right) this.x+= this.speed;
        else if(this.Direction === Dir.left) this.x-= this.speed;
        else if(this.Direction === Dir.up) this.y-= this.speed;
        else if(this.Direction === Dir.down) this.y+= this.speed;
        this.draw();
    }*/
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(new Position(this.x, this.y), dir);
        //console.log("touchWall",pos);
        ////console.log(pos);
        if(this.isObstacle(pos)){
            return true;
        }return false;
    }
    /*_get_newly_touched_block(dir){
        let x = this.x/blockSize, y = this.y/blockSize;
        if(dir === Dir.right) x+= 1;
        else if(dir === Dir.left) x-= 1;
        else if(dir === Dir.up) y-= 1;
        else y+= 1;
        return new Position(x, y);
        //get_2nd_closest_block(x, y);
    }*/
    sensor(){
        //console.log('doodle.sensor()');
        if(!doodle.noclip){
            for(let i = 0; i < 4; i++){
                if(doodle.touched(ghost[i])){
                    if(ghost[i].mode === GhostMode.Frightened){
                        ghost[i].switch_mode(GhostMode.Eaten);
                        this.score+= 200;
                    }else if(ghost[i].mode === GhostMode.Eaten){

                    }else{
                        doodle.Direction = Dir.stop;
                        die();
                    }
                }
            }
        }
    }
    determine_dir(grid_pos){
        //console.log("doodle.determine_dir()", tmpdirection);
        if(this.Direction !== tmpdirection){
            if(!this.touchWall(tmpdirection)){
                this.Direction = tmpdirection;
                this.img.src = "src\\img\\doodle_" + dir_to_string(this.Direction) + ".png";
            }
        }
    }

    /*interval(){
        super.interval();
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
        
    }*/
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