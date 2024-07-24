class Icon extends Sprite{
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} size 
     * @param {String} color 
     */
    constructor(x, y, size, color){
        super(x, y, size);
        this.color = color;
        this.coloredCostume = [];
    }
    renderAllImage(){
        for(let i = 0; i < this.costume.length; i++){
            coloredCostume[i] = structuredClone(this.costume[i]);
            console.log(coloredCostume.data);
            coloredCostume[i].data;
        }
    }
    draw(){
        if(this.display===true){
            ctx.save();
            ctx.scale(zoom, zoom);
            let pos = this.toBoardPos();
            ctx.drawImage(this.img, pos.x, pos.y, this.size, this.size);
            ctx.globalCompositeOperation = "source-atop";
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(pos.x, pos.y, this.size, this.size);
            ctx.globalCompositeOperation = "source-out";
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
};