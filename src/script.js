$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

setInterval(doodleInterval, 20);
createFood();
var onloadFunction = function () {  
    console.log('onload')
    for(var i=0; i < foods.length; i++){
        foods[i].draw();
        //foods[i].interval = setInterval('foods[i].touch()', 10);
    }
    setInterval(function(){
        for(let i=0; i<foods.length; i++){
            if(doodle.touched(foods[i])){
                foods[i].hide();
                doodle.score+=10;
                ctx.fillRect(300, 500, 200, -50);
                let prevStyle = ctx.fillStyle;
                ctx.fillStyle = '#ffffff';
                ctx.font = "24px sans-serif ";
                
                ctx.fillText(`Score: ${doodle.score}`, 300, 500)
                ctx.fillStyle = prevStyle;
            }
        }
        
    }, 100)
}
