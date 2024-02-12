class Sprite{
    constructor(x, y, size){
        this.img = new Image();
        this.x = x;
        this.y = y;
        this.size = size;
        this.display = true;
        this.paddingX = 0;
        this.paddingY = padding;
    }
    draw(){
        if(this.display===true){
            ctx.save();
            ctx.scale(zoom, zoom);
            ctx.drawImage(this.img, this.paddingX+this.x + ((blockSize - this.size) / 2), this.paddingY+this.y + ((blockSize - this.size) / 2), this.size, this.size);
            ctx.restore();
        }
    }
    clear(){
        ctx.save();
        ctx.scale(zoom, zoom);
        ctx.clearRect(this.paddingX+this.x, this.paddingY+this.y + ((blockSize - this.size) / 2), this.size + ((blockSize - this.size) / 2), this.size);
        ctx.restore();
    }
    hide(){
        this.display = false;
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
}

