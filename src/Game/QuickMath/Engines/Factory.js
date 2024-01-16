"use strict"

function __genMultiplicationMap() {
  const __map = {};
  for (let i = 2; i < 10; i++) {
    for (let j = i; j < 10; j++) {
      const m = i*j;
      if (!__map[m]) {
        __map[m] = [];
      }
      if (__map[m].indexOf(i) === -1) {
        __map[m].push(i);
      }
      if (__map[m].indexOf(j) === -1) {
        __map[m].push(j);
      }
    }
  }
  return __map;
}

const __mulMap = __genMultiplicationMap();

class Factory {
  constructor(config) {
    this.__config = config;
  }

  static isLikelyTheAnswer(quiz, answer) {
    const correct = parseInt(eval(quiz));
    return correct.toString().length === answer.toString().length;
  }

  static check(quiz, answer) {
    return parseInt(eval(quiz)) === parseInt(answer);
  }

  generate() {
    // prepare an array of expression
    const expr = [];
    Object.keys(this.__config).forEach(g => {
      if (!this[g]) {
        throw new Error(`Expression ${g} is not defined`);
      }
      const arr = [];
      for (let i = 0; i < this.__config[g]; i++) {
        let e = this[g]();
        while (arr.indexOf(e) !== -1) {
          e = this[g]();
        }
        arr.push(e);
      }
      expr.push(...arr);
    });
    // now randomize the array position
    for (let i = 0; i < expr.length; i++) {
      const n = this.__rand(0, expr.length);
      const tmp = expr[i];
      expr[i] = expr[n];
      expr[n] = tmp;
    }
    return expr;
  }

  /*
    G1: expression has sum value less then 10
  */
  G1() {
    const a = this.__rand(3, 8);
    const b = this.__rand(1, 11-a);
    return `${a} + ${b}`;
  }

  /*
    G2: expression has a and b less then 10 and sum greater then 10
  */
  G2() {
    const a = this.__rand(1, 8);
    const b = this.__rand(10-a, 10);
    return `${a} + ${b}`;
  }

  /*
    G3: a x b, both less then 10
  */
  G3() {
    const a = this.__rand(2, 10);
    const b = this.__rand(2, 10);
    return `${a} * ${b}`;
  }

  /*
    G4: 5 < a < 10 then 10 < b < 100 and vice versa
  */
  G4() {
    const a = this.__rand(2, 10);
    const b = this.__rand(11, 100);
    if (Math.random() > 0.5) {
      return `${a} + ${b}`;
    } else {
      return `${b} + ${a}`;
    }
  }

  /*
    G5: a x b + c, all are less then 10
  */
  G5() {
    const p = this.G3();
    const c = this.__rand(2, 10);
    if (Math.random() > 0.5) {
      return `${p} + ${c}`;
    } else {
      return `${c} + ${p}`;
    }
  }

  /*
    G6: a + b, both are greater then 10
  */
  G6() {
    const a = this.__rand(10, 100);
    const b = this.__rand(10, 100);
    return `${a} + ${b}`;
  }

  /*
    G7: a x b + c, c greater then 10
  */
  G7() {
    const p = this.G3();
    const c = this.__rand(10, 100);
    if (Math.random() > 0.5) {
      return `${p} + ${c}`;
    } else {
      return `${c} + ${p}`;
    }
  }

  /*
    G8: a + b, a is from 11 to 99, b is from 101 to 999
  */
  G8() {
    const a = this.__rand(11, 100);
    const b = this.__rand(101, 1000);
    if (Math.random() > 0.5) {
      return `${a} + ${b}`;
    } else {
      return `${b} + ${a}`;
    }
  }

  /*
    G9: a - b, a is from 41 to 99, b is from 11 to a-2
  */
  G9() {
    const a = this.__rand(41, 100);
    const b = this.__rand(11, a-2);
    return `${a} - ${b}`;
  }

  /*
    G10: a - b, a is from 100 to 999, b is from 11 to 89
  */
  G10() {
    const a = this.__rand(100, 1000);
    const b = this.__rand(11, 99);
    return `${a} - ${b}`;
  }

  /*
    G11: a / b, within 9-multiplication table
  */
  G11() {
    const mul = this.__getRandomElement(Object.keys(__mulMap));
    const factor = this.__getRandomElement(__mulMap[mul]);
    return `${mul} / ${factor}`;
  }

 /*
    G12: a / b + c, c is from 10 to 99
  */
 G12() {
  const div = this.G11();
  const c = this.__rand(11, 100);
  if (Math.random() > 0.5) {
    return `${div} + ${c}`;
  } else {
    return `${c} + ${div}`;
  }
 }

 /*
    G13: a / b + c, c is from 100 to 999
  */
 G13() {
  const div = this.G11();
  const c = this.__rand(101, 1000);
  if (Math.random() > 0.5) {
    return `${div} + ${c}`;
  } else {
    return `${c} + ${div}`;
  }
 }

 /*
    G14: a * b + c, c is from 100 to 999
  */
 G14() {
  const p = this.G3();
  const c = this.__rand(101, 1000);
  if (Math.random() > 0.5) {
    return `${p} + ${c}`;
  } else {
    return `${c} + ${p}`;
  }
 }

  /*
    min: in-bound minimum value
    max: out-bound maximum value
  */
  __rand(min, max) {
    return min + Math.floor(Math.random()*(max-min));
  }

  __getRandomElement(arr) {
    const rIndex = this.__rand(0, arr.length);
    return arr[rIndex];
  }

}

export default Factory;
