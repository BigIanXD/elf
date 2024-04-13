class Queue{
    constructor(){
        this.tmp = [];
    }
    enqueue(x, y){
        this.tmp.push(new Position(x, y));
    }
    dequeue(){
        return this.tmp.shift();
    }
    front(){
        return this.tmp[0];
    }
    size(){
        return this.tmp.length;
    }
    empty(){
        return this.tmp.length === 0;
    }
    clear(){
        this.tmp = [];
    }
}