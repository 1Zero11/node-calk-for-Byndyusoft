

module.exports = function () {

    this.methods = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b,
        "/": (a, b) => a / b,
        "*": (a, b) => a * b
    };

    this.buffer = [];

    this.toPostFixFromArr = (arr) => {
        let buffer = [];
        let opBuffer = [];

        for (let i = 0; i < arr.length; i++){
            let el = arr[i];

            if (typeof el == "number") {
                buffer.push(el);
            } else if (Array.isArray(el)) {
                buffer.push(...this.toPostFixFromArr(el));
            } else {
                if (el == "+" || el == "-") {
                    if(opBuffer.length > 0)
                        buffer.push(opBuffer.pop());
                    opBuffer.push(el);
                }
                else {
                    buffer.push(...this.toPostFixFromArr([arr[i + 1]]));
                    buffer.push(el);
                    i++;
                }
                
            }
        }

        while (opBuffer.length > 0)
            buffer.push(opBuffer.pop());

        return buffer;
    };

    this.toPostFix = (str) => {
        return (this.toPostFixFromArr(this.toArr(str)));
    };

    this.getNumber = (str) => {
        let i = 0
        while (i <= str.length && this.isDigit(str.substring(i, i+1))) {
            i++;
        }

        return { num: Number(str.substring(0, i)), str: str.substring(i, str.length)}
    };

    this.standartisize = (str) => {
        for (let i = 0; i < str.length; i++){
            if (str[i] == '(' && i > 0 && this.isDigit(str[i - 1])) {
                str = str.substring(0, i) + '*' + str.substring(i, str.length);
                i++;
            } else if (str[i] == ')' && i < str.length - 1 && this.isDigit(str[i + 1])) {
                str = str.substring(0, i + 1) + '*' + str.substring(i + 1, str.length);
                i++;
            } else if (str[i] == '-' && (i == 0 || !this.isDigit(str[i - 1]) || str[i - 1] == '(')) {
                str = str.substring(0, i) + '0' + str.substring(i, str.length);
                i++;
            }
        }

        return str;
    };

    this.toArr = (str) => {
        //console.log("\'" + str + "\'");
        if (str == undefined  || str.length == 0)
            return [];
        let symbol = str.substring(0, 1);
        
        if (this.isDigit(symbol)){
            let { num: num1, str: newstr } = this.getNumber(str);
            //console.log(`Got ${num1}, new str is ${newstr}`)
            return [num1, ...this.toArr(newstr)];
            //return [num1];
        } else if (symbol == '(') {
            let [bracketed, rest] = this.takeFirstBracketed(str);
            return [[...this.toArr(bracketed)], ...this.toArr(rest)];
        } else {
            //Потести это потом
            return [symbol, ...this.toArr(str.substring(1, str.length))];
        }
    };

    this.isDigit = (c) => {
        return c >= '0' && c <= '9';
    };

    this.isMethod = (c) => {
        return this.methods[c];
    };

    this.takeFirstBracketed = (str) => {
        let i = 1;
        let numbrackets = 1;

        while (numbrackets != 0) {
            if (str[i] == '(')
                numbrackets++;
            else if (str[i] == ')')
                numbrackets--;
            i++;
        }

        i--;
        return [str.substring(1, i), str.substring(i+1, str.length)];
    };



}