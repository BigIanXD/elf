function bfs(startPos){
    let doodlePos = new Position(21, 14);
    let queue = [];
    let prev = new Array(current_maze.height);
    let visited = new Array(current_maze.height);
    for(let i=0; i<current_maze.height; i++){
        prev[i] = new Array(current_maze.width);
        visited[i] = new Array(current_maze.width)
        for(let j=0; j<current_maze.width; j++){
            visited[i][j] = false;
        }
    }
    queue.push(startPos);
    visited[startPos.y][startPos.x] = true;
    let c = current_maze;
    let p = startPos;
    while(queue.length != 0 && !(p.x === doodlePos.x && p.y === doodlePos.y)){
        p = queue.shift();
        if(p.y+1<c.height && !isWall(c.arr[p.y+1][p.x]) && !visited[p.y+1][p.x]){
            queue.push(new Position(p.x, p.y+1));
            visited[p.y+1][p.x] = true;
            prev[p.y+1][p.x] = p;
        }if(p.y-1>=0 && !isWall(c.arr[p.y-1][p.x]) && !visited[p.y-1][p.x]){
            queue.push(new Position(p.x, p.y-1));
            visited[p.y-1][p.x] = true;
            prev[p.y-1][p.x] = p;
        }if(p.x+1<c.width && !isWall(c.arr[p.y][p.x+1]) && !visited[p.y][p.x+1]){
            queue.push(new Position(p.x+1, p.y));
            visited[p.y][p.x+1] = true;
            prev[p.y][p.x+1] = p;
        }if(p.x-1>=0 && !isWall(c.arr[p.y][p.x-1]) && !visited[p.y][p.x-1]){
            queue.push(new Position(p.x-1, p.y));
            visited[p.y][p.x-1] = true;
            prev[p.y][p.x-1] = p;
        }
    }
    p = doodlePos;
    let route = [];
    route.push(p);
    while(!(p.x === startPos.x && p.y === startPos.y)){
        p = prev[p.y][p.x];
        route.push(p);
    }
    route.reverse();
    return route;
}
function drawroute(route){
    route.forEach(p=>{
        ctx.save();
        ctx.scale(zoom, zoom);
        
        let pos = Sprite.toBoardPos(p.x*blockSize, p.y*blockSize, 10);
        ctx.beginPath();
        ctx.arc(pos.x+5, pos.y+5, 10, 0, 2*Math.PI);
        ctx.fillStyle = "#ff00ff";
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
        ctx.restore();
    })
}
class Ghost extends Sprite{
    constructor(x, y){
        super(x, y, 35);
        this.Direction = "right";
        this.img.src = "src\\img\\ghost.png";
        this.speed = 2.5;
        this.route = [];
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
            if(blockProperty === Block.food){
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
    bfs(){
        this.route = []
        let mazeheight = current_maze.height;
        let mazewidth = current_maze.width;
        let ghostPos = new Position(this.x / blockSize, this.y / blockSize);
        let doodlePos = new Position(Math.floor(doodle.x/blockSize), Math.floor(doodle.y/blockSize));
        if(ghostPos.x === doodlePos.x && ghostPos.y === doodlePos.y){
            if(ghost.x === doodle.x && ghost.y === doodle.y) return "stop";
            return ghost.Direction;
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
                if(!visited[p.y][p.x+1] && !isWall(c.arr[p.y][p.x+1])){
                    prev[p.y][p.x+1] = p;
                    visited[p.y][p.x+1] = true;
                    q.enqueue(p.x+1, p.y);
                }
            }
            if(p.x-1 >= 0){ // left
                if(!visited[p.y][p.x-1] && !isWall(c.arr[p.y][p.x-1])){
                    prev[p.y][p.x-1] = p;
                    visited[p.y][p.x-1] = true;
                    q.enqueue(p.x-1, p.y);
                }
            }
            if(p.y+1 < mazeheight){ // down
                if(!visited[p.y+1][p.x] && !isWall(c.arr[p.y+1][p.x])){
                    prev[p.y+1][p.x] = p;
                    visited[p.y+1][p.x] = true;
                    q.enqueue(p.x, p.y+1);
                }
            }
            if(p.y-1 >= 0){ // up
                if(!visited[p.y-1][p.x] && !isWall(c.arr[p.y-1][p.x])){
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
            console.log("ghost.route", this.route);
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
}



const ghostInterval = function () {
    if(ghost.x % blockSize === 0 && ghost.y % blockSize === 0){
        ghost.Direction = ghost.bfs();
        console.log(ghost.Direction);
        if(!ghost.touchWall(ghost.Direction)){
            ghost.move();
        }
    }else{
        ghost.move();
    }
}
var ghost = new Ghost();
ghost.x = 360; ghost.y = 280