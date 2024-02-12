const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playBoard = {
	height: 600,
	width: 1000
}
const padding = 60;
canvas.height = playBoard.height+padding;
canvas.width = playBoard.width;
// high resolution setting
const dpr = window.devicePixelRatio;
canvas.style.height = canvas.height;
canvas.style.width = canvas.width;
canvas.height *= dpr;
canvas.width *= dpr;

const blockSize = 40;
const canvasHeight = canvas.height / blockSize;
const canvasWidth = canvas.width / blockSize;

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};
