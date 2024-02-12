const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const playBoard = {
	height: 600,
	width: 1000
};

const padding = 60;
const canvas_before_zoom = {
	height: playBoard.height+padding,
	width: playBoard.width
};
const dpr = window.devicePixelRatio;
var zoom; // canvas/playBoard
function resetResolution(){
	let canvas_aspect = canvas_before_zoom.width/canvas_before_zoom.height;
	let window_aspect = window.innerWidth/window.innerHeight;
	if(window_aspect > canvas_aspect){
		canvas.height = Math.round(window.innerHeight*dpr);
		zoom = canvas.height/canvas_before_zoom.height;
		canvas.width = Math.round(canvas_before_zoom.width*zoom);
		canvas.style.height = window.innerHeight+'px';
		canvas.style.width = Math.round(canvas.width/dpr)+'px';
	}else{
		canvas.width = Math.round(window.innerWidth*dpr);
		zoom = canvas.width/canvas_before_zoom.width;
		canvas.height = Math.round(canvas_before_zoom.height*zoom);
		canvas.style.width = window.innerWidth+'px';
		canvas.style.height = Math.round(canvas.height/dpr)+'px';
	}
}
resetResolution();

const blockSize = 40;
const canvasHeight = canvas.height / blockSize;
const canvasWidth = canvas.width / blockSize;

var keycode = {
    38: "up",
	40: "down",
	37: "left",
	39: "right"
};
