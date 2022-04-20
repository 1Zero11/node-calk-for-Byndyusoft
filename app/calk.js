var converter = require("./converter");

module.exports = function() {

    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "/": (a, b) => a / b,
        "*": (a, b) => a * b
    };

    this.calculate = function (str) {
        let converter1 = new converter();
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