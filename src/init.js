const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 1000;
const blockSize = 40;
const canvasHeight = canvas.height / blockSize;
const canvasWidth = canvas.width / blockSize;

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};
