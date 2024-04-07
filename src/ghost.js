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