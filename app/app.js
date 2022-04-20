var calk = require("../app/calk");

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let calk1 = new calk();

myquestion = () => {
    readline.question(`Calculate: `, expression => {
        if (expression == 'exit') {
            readline.close();
        } else {
            console.log(calk1.calculate(expression));
            myquestion();
        }
    });
};

myquestion();
