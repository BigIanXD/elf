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
    }
    setInterval(function(){
        for(let i=0; i<foods.length; i++){
            if(doodle.touched(foods[i])){
                foods[i].hide();
                doodle.score+=10;
            }
        }
        
    }, 100)
}
