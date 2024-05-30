class Food extends Sprite{
    static score = 10;
    constructor(x, y){
        super(x, y, 5);
        this.costume[0].src = "src\\img\\food.png";
    }
    
};

class Pellet extends Sprite{
    static score = 50;
    constructor(x, y){
        super(x, y, 20);
        this.costume[0].src = "src\\img\\food.png";
    }
    
};