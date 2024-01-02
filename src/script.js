// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// var keycode = {
//     38: "up",
// 	40: "down",
// 	37: "left",
// 	39: "right"
// };

// var move = function (dir, distance) {
//     if (dir == "up" && this.y - distance > 0) {
//         ctx.clearRect(this.x, this.y, 10, 10);
//         this.y -= distance;
//         this.draw();
//     } else if (dir == "down" && this.y + distance + 10 < canvas.clientHeight) {
//         ctx.clearRect(this.x, this.y, 10, 10);
//         this.y += distance;
//         this.draw();
//     }
//     else if (dir == "right" && this.x + distance < canvas.clientWidth) {
//         ctx.clearRect(this.x, this.y, 10, 10);
//         this.x += distance;
//         this.draw();
//     }
//     else if (dir == "left" && this.x - distance > 0) {
//         ctx.clearRect(this.x, this.y, 10, 10);
//         this.x -= distance;
//         this.draw();
//     }
// }

// var draw_elf = function () {  
//     ctx.drawImage(elf,this.x ,this.y , 10, 10);
// }
// var elf = new Image();
// elf.src = "src\\elf_right.png";
// var elf_val = {
//     x : 10,
//     y : 10,
//     draw : draw_elf,
//     move : move
// };

// var elf_Direction = "right";

// var interval = function () { 
//     var speed = 1;
//     elf_val.move(elf_Direction, speed);
// }

// setInterval(interval, 25);

// $("body").keydown(function (e) { 
//     elf_Direction = keycode[e.keyCode];
//     elf.src = "src\\elf_" + keycode[e.keyCode] + ".png"
// });

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};

const move = function (dir, distance) {
    if (dir == "up" && this.y - distance > 0) {
        ctx.clearRect(this.x, this.y, this.size, this.size);
        this.y -= distance;
        this.draw();
    } else if (dir == "down" && this.y + distance + 10 < canvas.height) {
        ctx.clearRect(this.x, this.y, this.size, this.size);
        this.y += distance;
        this.draw();
    }
    else if (dir == "right" && this.x + distance + 10 < canvas.width) {
        ctx.clearRect(this.x, this.y, this.size, this.size);
        this.x += distance;
        this.draw();
    }
    else if (dir == "left" && this.x - distance > 0) {
        ctx.clearRect(this.x, this.y, this.size, this.size);
        this.x -= distance;
        this.draw();
    }
}

const draw_elf = function () {  
    ctx.drawImage(elf.img,this.x ,this.y , this.size, this.size);
}

var elf = {
    img : new Image(),
    size : 10,
    Direction : "right",
    x : 150,
    y : 75,
    draw : draw_elf,
    move : move
};

elf.img.src = "src\\elf_right.png";

const interval = function () {
    const speed = 1;
    elf.move(elf.Direction, speed);
}

setInterval(interval, 25);

$("body").keydown(function (e) { 
    elf.Direction = keycode[e.keyCode];
    elf.img.src = "src\\elf_" + keycode[e.keyCode] + ".png"
});
