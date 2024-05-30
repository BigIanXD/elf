const dpr = window.devicePixelRatio;

var playBoard = {
	height: 0,
	width: 0,
	padding: new Position(0, 60)
};
var canvas_before_zoom = {
	height: 0,
	width: 0
};

var zoom; // canvas/playBoard
$('body').css("height", $(window).height()) // set body height to full (making touching work)
function setMaze(maze){
    current_maze = maze;
    playBoard.height = current_maze.height*blockSize;
    playBoard.width = current_maze.width*blockSize;
    canvas_before_zoom.height = playBoard.height+playBoard.padding.y;
    canvas_before_zoom.width = playBoard.width+playBoard.padding.x;
    resetResolution();
}

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
