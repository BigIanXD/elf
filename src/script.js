const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};

var move = function (dir, distance) {
    if (dir == "up" && this.y - distance > 0) {
        ctx.clearRect(this.x, this.y, 10, 10);
        this.y -= distance;
        this.draw();
    } else if (dir == "down" && this.y + distance < canvas.clientHeight) {
        ctx.clearRect(this.x, this.y, 10, 10);
        this.y += distance;
        this.draw();
    }
    else if (dir == "right" && this.x + distance < canvas.clientWidth) {
        ctx.clearRect(this.x, this.y, 10, 10);
        this.x += distance;
        this.draw();
    }
    else if (dir == "left" && this.x - distance > 0) {
        ctx.clearRect(this.x, this.y, 10, 10);
        this.x -= distance;
        this.draw();
    }
}

var draw_elf = function () {  
    ctx.drawImage(elf,this.x ,this.y , 10, 10);
}
var elf = new Image();
elf.src = "src\\elf_right.png";
var elf_val = {
    x : 10,
    y : 10,
    draw : draw_elf,
    move : move
};



var elf_Direction = "right";

var interval = function () { 
    var speed = 1;
    elf_val.move(elf_Direction, speed);
}

setInterval(interval, 25);

$("body").keydown(function (e) { 
    elf_Direction = keycode[e.keyCode];
    elf.src = "src\\elf_" + keycode[e.keyCode] + ".png"
});
