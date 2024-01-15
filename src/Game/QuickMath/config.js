"use strict"

const name = 'QuickMath';
const title = 'Quick Math';
const btnBackground = 'Blue';
const txtColor = 'White';

const levels = [
  {
    id: 'l1',
    title: 'Level 1: Not such a challenge',
    info: '40 simple math expressions, only addition and multiplication are used',
    engine: 'SimpleMath',
    background: 'LightBlue',
    color: 'Black',
    unlockNext: {
      id: 'l2',
      condition: 120, // complete game in 120 seconds
    },
    rule: {
      G1: 2,    // a + b, result is less then 10
      G2: 2,   // a + b, a & b are less then 10, result is greater then 10
      G3: 6,   // a x b, both less then 10
      G4: 6,    // a + b, 5 < a < 10 then 10 < b < 100 and vice versa
      G5: 6,   // a x b + c, all are less then 10
      G6: 12,    // a + b, both are greater then 10
      G7: 6,    // a x b + c, c greater then 10
    }
  },
  {
    id: 'l2',
    title: 'Level 2: A bit harder, but still easy',
    info: '40 math expressions with addition, multiplication, subtraction and division',
    engine: 'SimpleMath',
    background: 'LightGreen',
    color: 'Black',
    rule: {
      G5: 1,    // a x b + c, all are less then 10
      G6: 2,   // a + b, both are greater then 10
      G7: 3,   // a x b + c, c greater then 10
      G8: 6,   // a + b, a is from 11 to 99, b is from 101 to 999
      G9: 8,   // a - b, a is from 41 to 99, b is from 11 to a
      G10: 6,  // a - b, a is from 101 to 999, b is from 11 to 89
      G11: 8,   // a / b, within 9-multiplication table
      G12: 2,   // a / b + c, c is from 10 to 99
      G13: 2,   // a / b + c, c is from 101 to 999
      G14: 2,   // a * b + c, c is from 101 to 999
    }
  },
];

export default { name, title, levels, btnBackground, txtColor };
