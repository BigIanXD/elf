class Ghost extends Sprite{
    constructor(id, x, y){
        super(x, y, 35);
        this.Direction = "right";
        this.img.src = "src\\img\\ghost.png";
        this.speed = 2.5;
        this.route = [];
        this.id = id;
    }
    move(){
        if(this.Direction === "right") this.x+= this.speed;
        else if(this.Direction === "left") this.x-= this.speed;
        else if(this.Direction === "up") this.y-= this.speed;
        else if(this.Direction === "down") this.y+= this.speed;
    }
    touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(dir);
        if(pos.y >= 0 && pos.y < current_maze.height && pos.x >= 0 && pos.x < current_maze.width){
            let blockProperty = current_maze.arr[pos.y][pos.x];
            if(blockProperty !== Block.wall){
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
        else if(dir === "down") y+= 1;
        return new Position(x, y);
    }
    isWall(block){
        if(block === Block.wall) return true;
        else return false;
    }
    bfs(){
        this.route = []
        let mazeheight = current_maze.height;
        let mazewidth = current_maze.width;
        let ghostPos = new Position(this.x / blockSize, this.y / blockSize);
        let doodlePos = new Position(Math.floor(doodle.x/blockSize), Math.floor(doodle.y/blockSize));
        if(ghostPos.x === doodlePos.x && ghostPos.y === doodlePos.y){
            if(this.x === doodle.x && this.y === doodle.y) return "stop";
            return this.Direction;
        }
        
        let q = new Queue();
        let p = ghostPos;
        
        let visited = [];
        for(let i = 0;i < mazeheight;i++){
            visited[i] = [];
            for(let j = 0;j < mazewidth;j++){
                visited[i][j] = false;
            }
        }
        let prev = [];
        for(let i = 0;i < mazeheight;i++){
            prev[i] = new Array(mazewidth);
        }
        q.enqueue(p.x, p.y);
        visited[ghostPos.y][ghostPos.x] = true;
        prev[p.y][p.x] = p;
        let c = current_maze;
        while(!q.empty() && !(p.x === doodlePos.x && p.y === doodlePos.y)){
            p = q.dequeue();
            
            if(p.x+1 < mazewidth){ // right
                if(!visited[p.y][p.x+1] && !this.isWall(c.arr[p.y][p.x+1])){
                    prev[p.y][p.x+1] = p;
                    visited[p.y][p.x+1] = true;
                    q.enqueue(p.x+1, p.y);
                }
            }
            if(p.x-1 >= 0){ // left
                if(!visited[p.y][p.x-1] && !this.isWall(c.arr[p.y][p.x-1])){
                    prev[p.y][p.x-1] = p;
                    visited[p.y][p.x-1] = true;
                    q.enqueue(p.x-1, p.y);
                }
            }
            if(p.y+1 < mazeheight){ // down
                if(!visited[p.y+1][p.x] && !this.isWall(c.arr[p.y+1][p.x])){
                    prev[p.y+1][p.x] = p;
                    visited[p.y+1][p.x] = true;
                    q.enqueue(p.x, p.y+1);
                }
            }
            if(p.y-1 >= 0){ // up
                if(!visited[p.y-1][p.x] && !this.isWall(c.arr[p.y-1][p.x])){
                    prev[p.y-1][p.x] = p;
                    visited[p.y-1][p.x] = true;
                    q.enqueue(p.x, p.y-1);
                }
            }
        }
        if(p.x === doodlePos.x && p.y === doodlePos.y){
            let pp = p;
            this.route.push(pp);
            while(!(pp.x === ghostPos.x && pp.y === ghostPos.y)){
                pp = prev[pp.y][pp.x];
                this.route.push(pp);
            }
            this.route.reverse();
            //console.log("ghost.route", this.route);
            while(prev[p.y][p.x].x != ghostPos.x || prev[p.y][p.x].y != ghostPos.y){
                p = prev[p.y][p.x];
            }
            let next = p;
            if(ghostPos.x === next.x){
                if(ghostPos.y > next.y){
                    return "up";
                }else{
                    return "down";
                }
            }else{
                if(ghostPos.x > next.x){
                    return "left";
                }else{
                    return "right";
                }
            }

        }
    }
    drawroute(){
        this.route.forEach(p=>{
            ctx.save();
            ctx.scale(zoom, zoom);
            
            let pos = Sprite.toBoardPos(p.x*blockSize, p.y*blockSize, 10);
            ctx.beginPath();
            ctx.arc(pos.x+5, pos.y+5, 10, 0, 2*Math.PI);
            ctx.fillStyle = ghostColor[this.id];
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#114411';
            ctx.stroke();
            ctx.restore();
        })
    }
    interval(){
        if(this.x % blockSize === 0 && this.y % blockSize === 0){
            this.Direction = this.bfs();
            //console.log(this.Direction);
            if(!this.touchWall(this.Direction)){
                this.move();
            }
        }else{
            this.move();
        }
    }
}

var setGhostInterval = function(i){
    console.log(`startGhost ${i}`);
    setInterval(function(){
        ghost[i].interval()
    }, 25);
}

var getGhostStartPos = function(){
    let count = 0;
    let i = 0, j = 0;
    for(;i<current_maze.height; i++){
        for(j=0;j<current_maze.width; j++){
            if(current_maze.arr[i][j] === Block.space){
                ghostStartPos[count] = new Position(j*blockSize, i*blockSize);
                count++;
                if(count >= 4) return;
            }
        }
    }
    while(count >= 1 && count < 4){
        ghostStartPos[count] = ghostStartPos[count-1];
        count++;
    }
}

var ghost = [];
for(let i = 0; i < 4; i++){
    ghost.push(new Ghost(i, 0, 0));
}
var ghostOutTime = [0, 8, 16, 24];
var ghostColor = [
    "#ff0000",
    "#ff99cc",
    "#33ffff",
    "#ffcc33"
];
var ghostStartPos = new Array(ghost.length);
for(let i = 0; i < ghost.length; i++){
    ghostStartPos[i] = new Position(0, 0);
}
//ghost.x = 360; ghost.y = 280