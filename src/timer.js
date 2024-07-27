class Timer{
    static DEBUG = true;
    static console = console;
    /**
     * @param {Function} callback 
     * @param {Number} time (ms)
     */
    constructor(callback, time){
        this.time = time; // private: plz modify it by member function reset()!
        this.callback = callback; // public: you can change it publicly
        this.mark = null;
        this.timeout = null;
        this.timeleft = time;
        this.hasStarted = false;
        this.hasPaused = false;
        this.hasExecuted = false;
    }
    start(){
        Timer.console.log('Timer.start()');
        clearTimeout(this.timeout);
        this.timeout = setTimeout(()=>{this.func()}, this.time);
        this.timeleft = this.time;
        this.mark = performance.now();
        this.hasStarted = true;
        this.hasPaused = false;
        this.hasExecuted = false;
    }
    pause(){
        if(this.hasStarted && !this.hasPaused && !this.hasExecuted){
            Timer.console.log('Timer.pause()');
            clearTimeout(this.timeout);
            let new_mark = performance.now();
            this.timeleft = this.timeleft-(new_mark-this.mark);
            if(this.timeleft <= 0) this.timeleft = 0;
            console.log(this.mark, new_mark);
            console.log('timeleft', this.timeleft);
            this.hasPaused = true;
        }
    }
    resume(){
        if(this.hasStarted && this.hasPaused && !this.hasExecuted){
            Timer.console.log('Timer.resume()');
            this.timeout = setTimeout(()=>{this.func()}, this.timeleft);
            this.mark = performance.now();
            this.hasPaused = false;
        }   
    }
    reset(time){
        Timer.console.log('Timer.reset()');
        clearTimeout(this.timeout);
        if(time !== undefined) this.time = time;
        this.timeleft = this.time;
        this.mark = null;
        this.hasStarted = false;
        this.hasPaused = false;
        this.hasExecuted = false;
    }
    func(){
        this.hasStarted = false;
        this.hasPaused = false;
        this.hasExecuted = true;
        Timer.console.log('Timer called!');
        this.callback();
    }
}
if(!Timer.DEBUG) {
    if(console === undefined){
        var methods = ["log", "debug", "warn", "info"];
        for(var i=0;i<methods.length;i++){
            Timer.console[methods[i]] = function(){};
        }
    }
    Timer.console = {};
    for(let key in console){
        //console.log(key);
        Timer.console[key] = function(){};
    }
}
class Interval{
    static DEBUG = false;
    static console = console;
    /**
     * @param {Number} time (ms)
     * @param {Function} callback 
     */
    constructor(time, callback){
        this.time = time; // private: plz modify it by member function reset()!
        this.callback = callback; // public: you can change it publicly
        this.mark = null;
        this.timeout = null;
        this.interval = null;
        this.timeleft = time;
        this.hasStarted = false;
        this.hasPaused = false;
        this.hasBothered = false;
    }
    start(){
        Interval.console.log('Interval.start()');
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        this.interval = setInterval(this.func(), this.time);
        this.timeleft = this.time;
        this.mark = performance.now();
        this.hasStarted = true;
        this.hasPaused = false;
        this.hasBothered = false;
    }
    pause(){
        if(this.hasStarted && !this.hasPaused){
            Interval.console.log('Interval.pause()');
            clearTimeout(this.timeout);
            clearInterval(this.interval);
            let new_mark = performance.now();
            this.timeleft = this.timeleft-(new_mark-this.mark);
            if(this.timeleft <= 0) this.timeleft = 0;
            console.log(this.mark, new_mark);
            console.log('timeleft', this.timeleft);
            this.hasPaused = true;
        }
    }
    resume(){
        if(this.hasStarted && this.hasPaused){
            Interval.console.log('Interval.resume()');
            this.timeout = setTimeout(this.func(), this.timeleft);
            this.mark = performance.now();
            this.hasPaused = false;
            this.hasBothered = true;
        }   
    }
    reset(time){
        Interval.console.log('Interval.reset()');
        clearTimeout(this.timeout);
        clearInterval(this.interval);
        if(time !== undefined) this.time = time;
        this.timeleft = this.time;
        this.mark = null;
        this.hasStarted = false;
        this.hasPaused = false;
        this.hasBothered = false;
    }
    func(){
        let f = function(){
            if(this.hasBothered) this.interval = setInterval(this.func(), this.time);
            this.mark = performance.now();
            this.timeleft = this.time;
            this.hasPaused = false;
            this.hasBothered = false;
            Interval.console.log('Interval called!');
            this.callback();
        }
        return f.bind(this);
    }
}
if(!Interval.DEBUG) {
    if(console === undefined){
        var methods = ["log", "debug", "warn", "info"];
        for(var i=0;i<methods.length;i++){
            Interval.console[methods[i]] = function(){};
        }
    }
    Interval.console = {};
    for(let key in console){
        //console.log(key);
        Interval.console[key] = function(){};
    }
}
class ArrayTimer extends Timer{
    /**
     * @param {Array} arr an array of timer duration
     */
    constructor(callback, arr){
        super();
        this.duration = arr;// unit: (ms)
        this.cnt = 0;
        super.callback = callback;
        super.time = this.duration[0];
    }
    start(){
        Timer.console.log('ArrayTimer.start()');
        super.time = this.duration[0];
        super.start();
    }
    reset(arr){
        Timer.console.log('ArrayTimer.reset()');
        super.reset();
        if(arr !== undefined) this.duration = arr;
        this.cnt = 0;
    }
    func(){
        super.func();
        this.cnt++;
        if(this.cnt < this.duration.length){
            super.reset.call(this, this.duration[this.cnt]);
            super.start.call(this);
        }
    }
};