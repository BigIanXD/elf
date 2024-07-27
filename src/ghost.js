const GhostMode = {
    Chase: 0,
    Scatter: 1,
    Frightened: 2,
    Eaten: 3
};
const GhostLife = {
    stop: -1,
    inHouse: 0,
    goingOut: 1,
    outside: 2,
    eaten: 3
};
const GhostID = {
    Blinky: 0,
    Pinky: 1,
    Inky: 2,
    Clyde: 3
};
class Ghost extends SnappedSprite{
    static mode = Ghost.Chase;
    constructor(id, x, y){
        super(x, y, 35);
        this.Direction = Dir.right;
        this.speed = 7;
        this.obstacle = [Block.wall];
        this.route = [];
        this.mode = GhostMode.Chase;
        this.lifeState = GhostLife.stop;
        this.enableTarget = true;
        this.id = id;
        this.showRoute = false;
        this.back_index = 0;
        this.force_reverse = false;
        this.costume[0].src = "src\\img\\ghost.png";
        this.costume[1] = new Image();
        this.costume[1].src = "src\\img\\ghost4.png";
        this.costume[2] = new Image();
        this.costume[2].src = "src\\img\\ghost_eyes.png";
        this.costume[3] = new Image();
        this.costume[3].src = "src\\img\\ghost5.png";
        this.gridPosIcon.costume[0].src = `src\\img\\grid_pos${id}.png`;
        this.targetPosIcon.costume[0].src = `src\\img\\target_pos${id}.png`;
    }
    /*move(){
        if(this.Direction === Dir.right) this.x+= this.speed;
        else if(this.Direction === Dir.left) this.x-= this.speed;
        else if(this.Direction === Dir.up) this.y-= this.speed;
        else if(this.Direction === Dir.down) this.y+= this.speed;
    }*/
    /*touchWall(dir=this.Direction){
        let pos = this._get_newly_touched_block(dir);
        if(pos.y >= 0 && pos.y < current_maze.height && pos.x >= 0 && pos.x < current_maze.width){
            let blockProperty = current_maze.arr[pos.y][pos.x];
            if(blockProperty !== Block.wall){
                return false;
            }
        }
        return true;
    }*/
    /*isWall(block){
        if(block === Block.wall) return true;
        else return false;
    }*/
    _detect_dir(from, to){
        if(from.x === to.x){
            if(from.y > to.y){
                return Dir.up;
            }else{
                return Dir.down;
            }
        }else{
            if(from.x > to.x){
                return Dir.left;
            }else{
                return Dir.right;
            }
        }
    }
    bfs(dest){
        //console.log('bfs')
        this.route = []
        let mazeheight = current_maze.height;
        let mazewidth = current_maze.width;
        let ghostPos = {};
        if(this.isGrid(new Position(this.x, this.y)))
            ghostPos = new Position(this.x/blockSize, this.y/blockSize);
        else ghostPos = this.try_move(this.Direction, this.speed).new_grid;
        ////console.log(ghostPos);
        
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
        while(!q.empty() && !(p.x === dest.x && p.y === dest.y)){
            p = q.dequeue();
            
            if(p.x+1 < mazewidth){ // right
                if(!visited[p.y][p.x+1] && !this.isObstacle(new Position(p.x+1, p.y))){
                    prev[p.y][p.x+1] = p;
                    visited[p.y][p.x+1] = true;
                    q.enqueue(p.x+1, p.y);
                }
            }
            if(p.x-1 >= 0){ // left
                if(!visited[p.y][p.x-1] && !this.isObstacle(new Position(p.x-1, p.y))){
                    prev[p.y][p.x-1] = p;
                    visited[p.y][p.x-1] = true;
                    q.enqueue(p.x-1, p.y);
                }
            }
            if(p.y+1 < mazeheight){ // down
                if(!visited[p.y+1][p.x] && !this.isObstacle(new Position(p.x, p.y+1))){
                    prev[p.y+1][p.x] = p;
                    visited[p.y+1][p.x] = true;
                    q.enqueue(p.x, p.y+1);
                }
            }
            if(p.y-1 >= 0){ // up
                if(!visited[p.y-1][p.x] && !this.isObstacle(new Position(p.x, p.y-1))){
                    prev[p.y-1][p.x] = p;
                    visited[p.y-1][p.x] = true;
                    q.enqueue(p.x, p.y-1);
                }
            }
        }
        if(p.x === dest.x && p.y === dest.y){
            let pp = p;
            this.route.push(pp);
            while(!(pp.x === ghostPos.x && pp.y === ghostPos.y)){
                pp = prev[pp.y][pp.x];
                this.route.push(pp);
            }
            this.route.reverse();
            ////console.log("ghost.route", this.route);
            let next = this.route[1];
            return this._detect_dir(ghostPos, next);
        }
    }
    doodle_bfs(){
        let ghostPos = new Position(this.x / blockSize, this.y / blockSize);
        let doodlePos = new Position(Math.floor(doodle.x/blockSize), Math.floor(doodle.y/blockSize));
        if(ghostPos.x === doodlePos.x && ghostPos.y === doodlePos.y){
            if(this.x === doodle.x && this.y === doodle.y) return Dir.stop;
            return this.Direction;
        }
        return this.bfs(doodlePos);
    }
    updateTarget(){
        if(this.lifeState === GhostLife.outside){
            if(this.mode === GhostMode.Frightened);
            else if(this.mode === GhostMode.Scatter){
                this.targetGridPos = structuredClone(ghostScatterPos);
            }
            else if(this.lifeState === GhostLife.outside){
                switch(this.id){
                    case GhostID.Blinky:
                        this.targetGridPos = doodle.grid;
                        break;
                    case GhostID.Pinky:
                        this.targetGridPos = this._get_relative_grid(doodle.grid, doodle.Direction, 2);
                        break;
                    case GhostID.Inky:
                        let two = this._get_relative_grid(doodle.grid, doodle.Direction, 2)
                        this.targetGridPos.x = 2*two.x - ghost[GhostID.Blinky].grid.x;
                        this.targetGridPos.y = 2*two.y - ghost[GhostID.Blinky].grid.y;
                        break;
                    case GhostID.Clyde:
                        //console.log('Clyde distance', Position.distance(ghost[GhostID.Clyde].grid, doodle.grid));
                        if(Position.distance(ghost[GhostID.Clyde].grid, doodle.grid) < 8){
                            this.targetGridPos = structuredClone(ghostScatterPos[GhostID.Clyde]);
                        }else{
                            this.targetGridPos = structuredClone(doodle.grid);
                        }
                }
            }
        }else{
        }
    }
    target_search(){
        let t = this.targetGridPos;
        let choices = this.get_dir_choice();
        //console.log(this.grid, choices, "-------");
        let g = this._get_relative_grid(this.grid, choices[0]);
        let mDis = Position.sDistance(g, t); // the square of minimium distance
        let mDir = choices[0]; // the direction which of the ghost position has the minimium distance from the target
        //console.log(mDis, g);
        for(let i = 1; i < choices.length; i++){ // iterate Dir Code
            g = this._get_relative_grid(this.grid, choices[i]); // get adjoining grid pos based on the direction
            let dis = Position.sDistance(g, t);
            //console.log(dis, g);
            if(dis <= mDis){
                mDis = dis;
                mDir = choices[i];
            }
        }
        //console.log(mDis, mDir);
        return mDir;
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
    get_dir_choice(){ // get possible dir choices, which makes the ghost not hit obstacles
        let cnt = 0, ho_cnt = 0, ve_cnt =0;
        let next_dir = [];
        if(!this.touchWall(Dir.left)) {next_dir.push(Dir.left); ho_cnt++; cnt++}
        if(!this.touchWall(Dir.right)) {next_dir.push(Dir.right); ho_cnt++; cnt++}
        if(!this.touchWall(Dir.up)) {next_dir.push(Dir.up); ve_cnt++; cnt++}
        if(!this.touchWall(Dir.down)) {next_dir.push(Dir.down); ve_cnt++; cnt++}
        if(cnt!==1)
            next_dir.splice(next_dir.indexOf(reverse_dir(this.Direction)), 1);
        next_dir.sort((a, b) => a-b);
        return next_dir;
    }
    determine_dir(){
        console.log(`mode: ${this.mode}`);
        //console.log('ghost.determine_dir()');
        if(this.mode === GhostMode.Frightened){
            let cnt = 0, ho_cnt = 0, ve_cnt =0 ;
            let next_dir = [];
            if(!this.touchWall(Dir.left)) {next_dir.push(Dir.left); ho_cnt++; cnt++}
            if(!this.touchWall(Dir.right)) {next_dir.push(Dir.right); ho_cnt++; cnt++}
            if(!this.touchWall(Dir.up)) {next_dir.push(Dir.up); ve_cnt++; cnt++}
            if(!this.touchWall(Dir.down)) {next_dir.push(Dir.down); ve_cnt++; cnt++}
            next_dir.splice(next_dir.indexOf(reverse_dir(this.Direction)), 1);
            if(cnt===1){
                this.Direction = reverse_dir(this.Direction);
            }else{
                this.Direction = next_dir[getRandomInt(next_dir.length)];
            }
        }else if(this.mode === GhostMode.Eaten){
            if(this.back_index < this.route.length-1){
                /*if(this.back_index === 0){
                    this.Direction = this._detect_dir(grid_pos, this.route[0])
                }*/
                //console.log('ghost Eaten ', grid_pos);
                this.Direction = this._detect_dir(this.route[this.back_index], this.route[this.back_index+1]);
                this.back_index++;
            }else{
                //console.log('bakc')
                this.back_index = 0;
                this.switch_mode(GhostMode.Chase);
            }
        }else{ // Ghost.Chase
            this.Direction = this.target_search();
            //this.Direction = this.doodle_bfs();
        }
    }
    switch_mode(mode){
        console.log(`id${this.id} switch to ${mode}`)
        /*let hasInterval = false;
        if(GhostInterval[this.id]){
            clearInterval(GhostInterval[this.id]);
            GhostInterval[this.id] = 0;
            hasInterval = true;
        }*/
        let prevMode = this.mode;
        this.mode = mode;
        if(mode === GhostMode.Chase){
            this.switch_costume(0);
            this.speed = 3;
            this.targetPosIcon.show();
        }else if(mode=== GhostMode.Scatter){
            this.switch_costume(0);
            this.speed = 3;
            this.targetPosIcon.show();
        }else if(mode === GhostMode.Frightened){
            this.switch_costume(1);
            this.speed = 2;
            this.targetPosIcon.hide();
        }else if(mode === GhostMode.Eaten){
            this.switch_costume(2);
            this.speed = 10;
            this.back_index = 0;
            this.bfs(ghostStartPos[this.id]);
            this.targetPosIcon.show();
            //console.log(this.route);
        }
        if(mode === GhostMode.Eaten){
            this.gridPosIcon.hide();
        }else{
            this.gridPosIcon.show();
        }
        /*if(hasInterval)
            GhostInterval[this.id] = setGhostInterval(this.id);*/
    }
    static switch_mode(mode){
        for(let i = 0; i < 4; i++){
            ghost[i].switch_mode(mode);
        }
        if(mode === GhostMode.Frightened){
            clearTimeout(FrightenedTimeout);
            for(let i = 0; i < Frightened_DisablingTimeout.length; i++)
                clearTimeout(Frightened_DisablingTimeout[i]);
            for(let i = 0; i < 4; i++){
                Frightened_DisablingTimeout[i] = setTimeout(function(){
                    console.log('Switch ghost Costumes');
                    for(let j = 0; j < 4; j++){
                        if(ghost[j].mode === GhostMode.Frightened)
                            ghost[j].switch_costume((i%2)==0 ? 1: 3);// 3: ghost5.png 1: ghost4.png
                    }
                }, 7000-(4-i)*500);
            }
            FrightenedTimeout = setTimeout(function(){
                console.log('Switch back to Chase Mode');
                for(let i = 0; i < 4; i++){
                    if(ghost[i].mode !== GhostMode.Eaten)
                        ghost[i].switch_mode(GhostMode.Chase);
                }
                
            }, 7000)
        }
    }
}

var setGhostInterval = function(i){
    //console.log(`startGhost ${i}`);
    ghost[i].lifeState = GhostLife.outside;
    return setInterval(function(){
        ghost[i].interval()
    }, 30);
}

var getGhostStartPos = function(){
    let count = 0;
    let i = 0, j = 0;
    for(;i<current_maze.height; i++){
        for(j=0;j<current_maze.width; j++){
            if(current_maze.arr[i][j] === Block.space){
                ghostStartPos[count] = new Position(j, i);
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
var getGhostScatterPos = function(){
    let w = current_maze.width, h = current_maze.height;
    ghostScatterPos[GhostID.Blinky] = new Position(w-1, -1);
    ghostScatterPos[GhostID.Pinky] = new Position(0, -1);
    ghostScatterPos[GhostID.Inky] = new Position(w-1, h);
    ghostScatterPos[GhostID.Clyde] = new Position(0, h);
}

var ghost = [];
for(let i = 0; i < 4; i++){
    ghost.push(new Ghost(i, 0, 0));
    ghost[i].costume[0].src = `src/img/ghost${i}.png`;
}
var ghostOutTime = [0, 0, 0, 0];
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
var ghostScatterPos = new Array(ghost.length);
for(let i = 0; i < ghost.length; i++){
    ghostScatterPos = new Position(0, 0);
}
//ghost.x = 360; ghost.y = 280