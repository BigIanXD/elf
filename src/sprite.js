class Sprite{
    constructor(x, y, size){
        this.costume = [new Image()];
        this.img = this.costume[0];
        this.x = x;
        this.y = y;
        this.size = size;
        this.display = true;
        this.enablePadding = true;
    }
    static toBoardPos(x, y, size){
        return new Position(
            playBoard.padding.x+  x + ((blockSize - size) / 2),
            playBoard.padding.y+  y + ((blockSize - size) / 2)
        )
    }
    toBoardPos(){
        if(this.enablePadding){
            return new Position(
                playBoard.padding.x+  this.x + ((blockSize - this.size) / 2),
                playBoard.padding.y+  this.y + ((blockSize - this.size) / 2)
            )
        }
        else{
            return new Position(
                this.x + ((blockSize - this.size) / 2),
                this.y + ((blockSize - this.size) / 2)
            )
        }
    }
    draw(){
        if(this.display===true){
            ctx.save();
            ctx.scale(zoom, zoom);
            let pos = new Position(this.x, this.y);
            if(this.enablePadding) pos = this.toBoardPos();
            ctx.drawImage(this.img, pos.x, pos.y, this.size, this.size);
            ctx.restore();
        }
    }
    clear(){
        ctx.save();
        ctx.scale(zoom, zoom);
        let pos = this.toBoardPos();
        ctx.clearRect(pos.x, pos.y, this.size, this.size);
        ctx.restore();
    }
    show(){
        this.display = true;
    }
    hide(){
        this.display = false;
    }
    switch_costume(index){
        if(index >= 0 && index < this.costume.length){
            this.img = this.costume[index];
            return true;
        }
        return false;
    }
    touched(sprite){
        if(!sprite instanceof Sprite) throw new Error('parameter is not the type "Sprite"');
        if(!this.display || !sprite.display) return false;
        let minX1 = this.x-this.size/2;
        let maxX1 = this.x+this.size/2;
        let minY1 = this.y-this.size/2;
        let maxY1 = this.y+this.size/2;
        
        let minX2 = sprite.x-sprite.size/2;
        let maxX2 = sprite.x+sprite.size/2;
        let minY2 = sprite.y-sprite.size/2;
        let maxY2 = sprite.y+sprite.size/2;
        
        if(maxX1>minX2 && maxX2>minX1 && maxY1>minY2 && maxY2>minY1){
            return true;
        }else return false;
    }
};

class SnappedSprite extends Sprite{
    constructor(x, y, size){
        super(x, y, size)
        this.GridSize = blockSize;
        this.Direction = Dir.right;
        this.speed = 5;
        this.obstacle = [Block.wall];
    }
    isGrid(pos){
        if(pos.x%blockSize===0 && pos.y%blockSize===0){
            return true;
        }return false;
    }
    isObstacle(blockPos){
        let block = current_maze.getBlock(blockPos);
        if(block===undefined) return true;
        for(let i = 0; i < this.obstacle.length; i++){
            if(block === this.obstacle[i]) return true;
        }
        return false;
    }
    _get_newly_touched_block(pos, dir){
        let x = pos.x/blockSize, y = pos.y/blockSize;
        if(this.isGrid(pos)){
            ////console.log('isGrid');
            if(dir === Dir.right) x+=1;
            else if(dir === Dir.left) x-=1;
            else if(dir === Dir.up) y-=1;
            else if(dir === Dir.down) y +=1;
        }else{
            if(dir === Dir.right) x = Math.ceil(x);
            else if(dir === Dir.left) x = Math.floor(x);
            else if(dir === Dir.up) y = Math.floor(y);
            else if(dir === Dir.down)y = Math.ceil(y);
        }
        ////console.log("_get_newly_touched_block", x, y);
        return new Position(x, y);
        //get_2nd_closest_block(x, y);
    }
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(new Position(this.x, this.y), dir);
        ////console.log("touchWall",pos);
        ////console.log(pos);
        if(this.isObstacle(pos)){
            return true;
        }return false;
    }
    Maze_to_GroundPos(pos){
        return new Position(pos.x*blockSize, pos.y*blockSize);
    }
    try_move(dir, step){
        ////console.log('try_move', this.x, this.y);
        let pos = new Position(this.x, this.y);
        let canMove = true;
        let reachGrid = false;
        let new_grid = this._get_newly_touched_block(pos, dir);
        let new_pos = this.Maze_to_GroundPos(new_grid);
        let steps_remaining = step;

        if(step=== 0 || this.isObstacle(new_grid)) {
            canMove = false;
        }else{
            if(dir === Dir.right){
                pos.x+= step;
                steps_remaining = pos.x-new_pos.x;
                if(steps_remaining >= 0){
                    reachGrid = true;
                }
            }else if(this.Direction === Dir.left){
                pos.x-= step;
                steps_remaining = -(pos.x-new_pos.x);
                if(steps_remaining >= 0){
                    reachGrid = true;
                }
            }else if(dir === Dir.down){
                pos.y+= step;
                steps_remaining = pos.y-new_pos.y;
                if(steps_remaining >= 0){
                    reachGrid = true;
                }
            }else if(this.Direction === Dir.up){
                pos.y-= step;
                steps_remaining = -(pos.y-new_pos.y);
                if(steps_remaining >= 0){
                    reachGrid = true;
                }
            }
            if(!reachGrid){
                if(dir === Dir.right) new_pos.x+=steps_remaining;
                else if(dir === Dir.left) new_pos.x-=steps_remaining;
                else if(dir === Dir.up) new_pos.y-=steps_remaining;
                else if(dir === Dir.down) new_pos.y+=steps_remaining;
            }
        }
        return {
            canMove: canMove, //若為false, 則後面訊息不得參考
            reachGrid: reachGrid,
            steps_remaining: steps_remaining,
            new_grid: new_grid,
            new_pos: new_pos
        }
    }
    determine_dir(grid_pos){

    }
    interval(){
        //console.log('SnappedSprite.interval()');
        this.sensor();
        this.move();
        
    }
    sensor(){
        //console.log('SnappedSprite.sensor()');
    }
    move(){
        //console.log('SnappedSprite.move()');
        let steps_remaining = this.speed;
        
        if(this.Direction == Dir.stop){
            return;
        }
        let result = this.try_move(this.Direction, steps_remaining);
        if(!result.canMove && this.isGrid(new Position(this.x, this.y))) {
            //if(this === ghost[0]) //console.log('ghost.move()!!', this.x, this.y, this.Direction)
            this.determine_dir(new Position(this.x/blockSize, this.y/blockSize));
        }
        while(result.canMove && result.reachGrid){
            //console.log(result);
            //console.log(result.new_grid);
            //console.log("new_pos", result.new_pos);
            steps_remaining = result.steps_remaining;
            this.x = result.new_pos.x;
            this.y = result.new_pos.y;
            //if(this === ghost[0]) console.log('ghost.move()', this.x, this.y, this.Direction)
            this.determine_dir(result.new_grid);
            result = this.try_move(this.Direction, steps_remaining);
        }
        if(result.canMove){
            
            this.x = result.new_pos.x;
            this.y = result.new_pos.y;
            //console.log('moveGhost', this.Direction, "to", this.x, this.y)
        }
    }
};