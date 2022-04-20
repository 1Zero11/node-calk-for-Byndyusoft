var expect = require("chai").expect;
var calk = require("../app/calk");
var converter = require("../app/converter");

calk1 = new calk();
converter1 = new converter();

describe('Solver', () => {
    it('Does basic operations', () => {
        expect(calk1.methods["+"](2, 3)).to.equal(5);
        expect(calk1.methods["-"](2, 3)).to.equal(-1);
        expect(calk1.methods["*"](2, 3)).to.equal(6);
        expect(calk1.methods["/"](9, 3)).to.equal(3);
    });

    it('Calculates postfixed', () => {
        expect(calk1.calkPostFixed([20])).to.equal(20);
        expect(calk1.calkPostFixed([20, 5, "+"])).to.equal(25);
        expect(calk1.calkPostFixed([30, 4, '-', 2, '+'])).to.equal(28);
    });

    it('Solves expressions without parentesees', () => {
        expect(calk1.calculate('2+5-3')).to.equal(4);
        expect(calk1.calculate('5-3+7')).to.equal(9);
        expect(calk1.calculate('-5+10')).to.equal(5);
    });

    it('Solves expressions with parentesees', () => {
        expect(calk1.calculate('2+(5-3)')).to.equal(4);
        expect(calk1.calculate('5-(3+7)')).to.equal(-5);
        //expect(calk1.calculate('-5+10')).to.equal(5);
    });

    it('Solves ()+-*/', () => {
        expect(calk1.calculate('10/5+4*(8-3)')).to.equal(22);
    })
});

describe('Converter', () => {
    it('Converts strings to numbers', () => {
        let { num, str } = converter1.getNumber("20");
        expect(num).to.equal(20);
        expect(str).to.equal("");

        ({num, str} = converter1.getNumber("20+30"));
        expect(num).to.equal(20);
        expect(str).to.equal("+30");
    });

    it('Divdes expression into array', () => {
        expect(converter1.toArr("20")).to.eql([20]);
        expect(converter1.toArr('20+5')).to.eql([20,"+",5]);
        expect(converter1.toArr('30-4+2')).to.eql([30, '-', 4, '+', 2]);
        expect(converter1.toArr('-5+4')).to.eql(['-', 5, '+', 4]);
        expect(converter1.toArr('2-(4+6)')).to.eql([2, '-', [ 4, '+', 6 ]]);
    });
    

    it('Does postfix with + and -', () => {
        expect(converter1.toPostFixFromArr([20])).to.eql([20]);
        expect(converter1.toPostFixFromArr([20, "+", 5])).to.eql([20, 5, "+"]);
        expect(converter1.toPostFixFromArr([30, '-', 4, '+', 2])).to.eql([30, 4, '-', 2, '+']);
    });

    it('Does postfix also with * and /', () => {
        expect(converter1.toPostFixFromArr([20, '/', 2])).to.eql([20, 2, '/']);
        expect(converter1.toPostFixFromArr([2, "+", 6, '/', 3])).to.eql([2, 6, 3, "/", "+"]);
        expect(converter1.toPostFixFromArr([30, '-', 4, '+', 2])).to.eql([30, 4, '-', 2, '+']);
    });

    it('Standirtisizes', () => {
        expect(converter1.standartisize("20+5")).to.equal("20+5");
        expect(converter1.standartisize("4(6-3)")).to.eql("4*(6-3)");
        expect(converter1.standartisize("-3+8/6")).to.eql("0-3+8/6");
    });

});