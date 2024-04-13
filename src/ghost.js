function bfs(startPos){
    let doodlePos = new Position(21, 14);
    let stack = [];
    let prev = new Array(current_maze.height);
    let visited = new Array(current_maze.height);
    for(let i=0; i<current_maze.height; i++){
        prev[i] = new Array(current_maze.width);
        visited[i] = new Array(current_maze.width)
        for(let j=0; j<current_maze.width; j++){
            visited[i][j] = false;
        }
    }
    stack.push(startPos);
    visited[startPos.y][startPos.x] = true;
    let c = current_maze;
    let p = startPos;
    while(stack.length != 0 && !(p.x === doodlePos.x && p.y === doodlePos.y)){
        p = stack.shift();
        if(p.y+1<c.height && !isWall(c.arr[p.y+1][p.x]) && !visited[p.y+1][p.x]){
            stack.push(new Position(p.x, p.y+1));
            visited[p.y+1][p.x] = true;
            prev[p.y+1][p.x] = p;
        }if(p.y-1>=0 && !isWall(c.arr[p.y-1][p.x]) && !visited[p.y-1][p.x]){
            stack.push(new Position(p.x, p.y-1));
            visited[p.y-1][p.x] = true;
            prev[p.y-1][p.x] = p;
        }if(p.x+1<c.width && !isWall(c.arr[p.y][p.x+1]) && !visited[p.y][p.x+1]){
            stack.push(new Position(p.x+1, p.y));
            visited[p.y][p.x+1] = true;
            prev[p.y][p.x+1] = p;
        }if(p.x-1>=0 && !isWall(c.arr[p.y][p.x-1]) && !visited[p.y][p.x-1]){
            stack.push(new Position(p.x-1, p.y));
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
        this.speed = 4;
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
    }
    bfs(){
        let x = this.x / blockSize, y = this.y / blockSize;
        let end = new Position(Math.floor(doodle.x/blockSize), Math.floor(doodle.y/blockSize));
        let q = new Queue();
        let tmppos = new Position(x, y);
        q.enqueue(tmppos.x, tmppos.y);
        let visited = [];
        for(let i = 0;i < mazeheight;i++){
            visited[i] = [];
            for(let j = 0;j < mazewidth;j++){
                visited[i][j] = false;
            }
        }
        let prev = [];
        for(let i = 0;i < mazeheight;i++){
            prev[i] = [];
        }
        while(!q.empty()){
            tmppos = q.front();
            if(tmppos.x === end.x && tmppos.y === end.y){
                while(prev[tmppos.y][tmppos.x].x != end.x && prev[tmppos.y][tmppos.x].y != end.y){
                    tmppos.x = prev[tmppos.y][tmppos.x].x;
                    tmppos.y = prev[tmppos.y][tmppos.x].y;
                }
                if(tmppos.x === this.x){
                    if(tmppos.y > this.y){
                        return "up";
                    }else{
                        return "down";
                    }
                }else{
                    if(tmppos.x > this.x){
                        return "right";
                    }else{
                        return "left";
                    }
                }

            }
            if(tmppos.x+1 < mazewidth){
                if(!visited[tmppos.y][tmppos.x+1] && (current_maze.arr[tmppos.y][tmppos.x+1] === Block.food || current_maze.arr[tmppos.y][tmppos.x+1] === Block.space)){
                    prev[tmppos.y][tmppos.x+1] = tmppos;
                    visited[tmppos.y][tmppos.x+1] = true;
                    q.enqueue(tmppos.x+1, tmppos.y);
                }
            }
            if(tmppos.x-1 >= 0){
                if(!visited[tmppos.y][tmppos.x-1] && (current_maze.arr[tmppos.y][tmppos.x-1] === Block.food || current_maze.arr[tmppos.y][tmppos.x-1] === Block.space)){
                    prev[tmppos.y][tmppos.x-1] = tmppos;
                    visited[tmppos.y][tmppos.x-1] = true;
                    q.enqueue(tmppos.x-1, tmppos.y);
                }
            }
            if(tmppos.y+1 < mazeheight){
                if(!visited[tmppos.y+1][tmppos.x] && (current_maze.arr[tmppos.y+1][tmppos.x] === Block.food || current_maze.arr[tmppos.y+1][tmppos.x] === Block.space)){
                    prev[tmppos.y+1][tmppos.x] = tmppos;
                    visited[tmppos.y+1][tmppos.x] = true;
                    q.enqueue(tmppos.x, tmppos.y+1);
                }
            }
            if(tmppos.y-1 >= 0){
                if(!visited[tmppos.y-1][tmppos.x] && (current_maze.arr[tmppos.y-1][tmppos.x] === Block.food || current_maze.arr[tmppos.y-1][tmppos.x] === Block.space)){
                    prev[tmppos.y-1][tmppos.x] = tmppos;
                    visited[tmppos.y-1][tmppos.x] = true;
                    q.enqueue(tmppos.x, tmppos.y-1);
                }
            }
        }
    }
}



const ghostInterval = function () {
    if(ghost.x % blockSize === 0 && ghost.y % blockSize === 0){
        ghost.Direction = ghost.bfs();
        ghost.move();
    }else{
        ghost.move();
    }
}