class Label{
    constructor(x, y, text, font='24px sans-serif'){
        this.text = text;
        this.font = font;
        this.x = x;
        this.y = y;
        this.rotate = 0; // by angle
        this.color = "#ffffff";
        this.align = "center";
    }
    draw(){
        ctx.save();
        ctx.textAlign = this.align;
        ctx.font = this.font;
        ctx.scale(zoom, zoom);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotate*(Math.PI/180));
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}