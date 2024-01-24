food.setup();
console.log("hi");

$("body").keydown(function (e) { 
    if(keycode[e.keyCode] != undefined)
        tmpdirection = keycode[e.keyCode];
});

setInterval(doodleInterval, 20);