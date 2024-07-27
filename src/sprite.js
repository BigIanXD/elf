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
            pos = this.toBoardPos();
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
        // grid
        this.grid = new Position();
        this.gridColor = "#ffffff"; // Optional: the color of grid pos drawn in canvas
        this.updateGrid();
        this.gridPosIcon = new Sprite(this.grid.x, this.grid.y, 30);
        this.gridPosIcon.costume[0].src = "src\\img\\grid_pos.png";
        this.GridSize = blockSize;
        // target grid
        this.enableTarget = false;
        this.targetGridPos = new Position(0, 0);
        this.targetPosIcon = new Sprite(this.targetGridPos.x, this.targetGridPos.y, 30);
        this.targetPosIcon.costume[0].src = "src\\img\\target_pos.png";
        
        this.Direction = Dir.right;
        this.speed = 5;
        this.obstacle = [Block.wall];
    }
    isGrid(pos){
        if(pos.x %this.GridSize===0 && pos.y %this.GridSize===0){
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
    /**
     * Draw Current Grid of the Sprite
     */
    drawGrid(){
        let pos = this.Grid_to_GroundPos(this.grid);
        this.gridPosIcon.x = pos.x;
        this.gridPosIcon.y = pos.y;
        this.gridPosIcon.draw();
    }
    drawTarget(){
        let pos = this.Grid_to_GroundPos(this.targetGridPos);
        this.targetPosIcon.x = pos.x;
        this.targetPosIcon.y = pos.y;
        this.targetPosIcon.draw();
    }
    updateTarget(){
        
    }
    /**
     * if pos is just in Grid -> set to this grid (diff with updateGrid & _get_newly_touched_block)
     * if not -> set to the grid position forward
     */
    updateGrid(){
        let pos = new Position(this.x, this.y);
        let dir = this.Direction;
        if(this.isGrid(pos)) this.grid = this.Ground_to_GridPos(pos);
        else this.grid = this._get_newly_touched_block(pos, dir);
    }
    /**
     * @param {Position} pos current position
     * @param {Dir} dir current direction
     * @returns {Position} if pos is just in Grid -> return adjoining grid position based on dir
     * @returns if not -> return the grid position forward
     */
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
    _get_relative_grid(gridPos, dir, step=1){
        let x=gridPos.x, y=gridPos.y;
        if(dir === Dir.right) x+=step;
        else if(dir === Dir.left) x-=step;
        else if(dir === Dir.up) y-=step;
        else if(dir === Dir.down) y +=step;
        return new Position(x, y);
    }
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(new Position(this.x, this.y), dir);
        ////console.log("touchWall",pos);
        ////console.log(pos);
        if(this.isObstacle(pos)){
            return true;
        }return false;
    }
    Ground_to_GridPos(pos){
        return new Position(Math.floor(pos.x/this.GridSize), Math.floor(pos.y/this.GridSize));
    }
    Grid_to_GroundPos(pos){
        return new Position(pos.x*this.GridSize, pos.y*this.GridSize);
    }
    try_move(dir, step){
        ////console.log('try_move', this.x, this.y);
        let pos = new Position(this.x, this.y);
        let canMove = true;
        let reachGrid = false;
        let new_grid = this._get_newly_touched_block(pos, dir);
        let new_pos = this.Grid_to_GroundPos(new_grid);
        let steps_remaining = step;

        if(step=== 0 || this.isObstacle(new_grid)) {
            canMove = false;
            new_pos = pos;
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
                steps_remaining = 0;
            }
        }
        return {
            canMove: canMove, //若為false, 則new_grid 不得參考
            reachGrid: reachGrid, //若為false, 則new_grid 不得參考
            steps_remaining: steps_remaining,
            new_grid: new_grid,
            new_pos: new_pos
        }
    }
    determine_dir(){

    }
    touch_grid(){
        this.updateGrid();
        this.updateTarget();
        if(this.enableTarget && this.grid.x===this.targetGridPos.x && this.grid.y===this.targetGridPos.y){
            this.touch_target();
        }
        this.determine_dir();
    }
    touch_target(){

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
        let time_remaining = 1;
        if(this.Direction == Dir.stop){
            return;
        }
        /*let result = this.try_move(this.Direction, steps_remaining);
        if(!result.canMove && this.isGrid(new Position(this.x, this.y))) {
            //if(this === ghost[0]) //console.log('ghost.move()!!', this.x, this.y, this.Direction)
            this.touch_grid();
        }
        
        while(result.canMove && result.reachGrid){
            //console.log(result);
            //console.log(result.new_grid);
            //console.log("new_pos", result.new_pos);
            steps_remaining = result.steps_remaining;
            this.x = result.new_pos.x;
            this.y = result.new_pos.y;
            //if(this === ghost[0]) console.log('ghost.move()', this.x, this.y, this.Direction)
            this.touch_grid();
            result = this.try_move(this.Direction, steps_remaining);
        }*/
        let result = this.try_move(this.Direction, steps_remaining);
        do{
            //result = this.try_move(this.Direction, steps_remaining);
            //if(!result.canMove) console.log("can't move");
            this.x = result.new_pos.x;
            this.y = result.new_pos.y;
            if(this.isGrid(result.new_pos)){
                this.touch_grid();
            }
            steps_remaining = result.steps_remaining;
            result = this.try_move(this.Direction, steps_remaining);
        }while(result.canMove && result.reachGrid);
        if(result.canMove){
            
            this.x = result.new_pos.x;
            this.y = result.new_pos.y;
            //console.log('moveGhost', this.Direction, "to", this.x, this.y)
        }
        this.updateGrid();
    }
};