var converter = require("./converter");
let converter1 = new converter();

module.exports = function() {

    this.methods = converter1.methods;

    this.calculate = function (str) {
        
        str = converter1.standartisize(str);
        let postArr = converter1.toPostFix(str);
        
        return this.calkPostFixed(postArr);
    }

    this.calkPostFixed = (arr) => {
        let buffer = [];

        for (let el of arr) {
            if (typeof el == 'number') {
                buffer.push(el);
            } else {
                first = buffer.pop();
                buffer.push(this.methods[el](buffer.pop(), first));
            }
        }

        
        return buffer[0];
    }

    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}