//import board_json from "json/board.json" assert {type: json};
//console.log(board_json);
const Block = {
    food: 0,
    wall: 1,
    door: 2,
    space: 3,
    doodleStart: 4
}

// Load board file
class Maze{
    constructor(file){
        this.arr = [];
        this.height = 0;
        this.width = 0;
        this.wallWidth = wallWidth;
        this.foodList = [];
    }
    open(arr){
        this.arr = arr;
        this.height = this.arr.length;
        this.width = this.arr.reduce((max, row) => Math.max(max, row.length), 0);
        this.foodList.splice(0);
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                console.log('food')
                if(this.arr[y][x] === Block.wall){}
                else if(this.arr[y][x] === Block.door){}
                else if(this.arr[y][x] === Block.space){}
                else if(this.arr[y][x] === Block.doodleStart){}
                else{
                    this.arr[y][x] = 0;
                    this.foodList.push(new Food(x * blockSize, y * blockSize));
                }
            }
        }   
    }
    /*open(file){
        return fetch(file)
        .then( (response) => {
            return response.json();
        })
        .then( (response) => {
            this.arr = response;
            this.height = this.arr.length;
            this.width = this.arr.reduce((max, row) => Math.max(max, row.length), 0);
            this.foodList.splice(0);
            for(let y=0; y<this.height; y++){
                for(let x=0; x<this.width; x++){
                    console.log('food')
                    if(this.arr[y][x] === Block.wall){}
                    else if(this.arr[y][x] === Block.door){}
                    else if(this.arr[y][x] === Block.space){}
                    else if(this.arr[y][x] === Block.doodleStart){}
                    else{
                        this.arr[y][x] = 0;
                        this.foodList.push(new Food(x * blockSize, y * blockSize));
                    }
                }
            }   
        })
        .catch( (error) => {
            throw new Error(error);
        })
    }*/
    draw(){
        for(let y=0; y<this.height; y++){
            for(let x=0; x<this.width; x++){
                let now = this.arr[y][x]
                if(now !== undefined){
                    if(now === Block.wall || now === Block.door){
                        ctx.save();
                        ctx.scale(zoom, zoom);
                        if(now === Block.wall) ctx.fillStyle = "#0000ff";
                        else if(now === Block.door) ctx.fillStyle = "#ff0000";
                        let pos = Sprite.toBoardPos(x*blockSize, y*blockSize, this.wallWidth);
                        ctx.fillRect(pos.x, pos.y, this.wallWidth, this.wallWidth);
                        ctx.restore();
                    }
                }
            }
        }
        this.foodList.forEach(item=>item.draw());
    }
    
}
var current_maze;