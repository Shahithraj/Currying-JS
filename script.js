// link - https://roadsidecoder.hashnode.dev/javascript-interview-questions-currying-output-based-questions-partial-application-and-more

// What is Currying?
// Currying is a function that takes one argument at a time and returns a new function expecting the next argument.
// It is a conversion of functions from callable as f(a,b,c)into callable as f(a)(b)(c).

// 1. Basic currying

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(1)(2)(3));

// correct approach for Q1

function sumCurry(a) {
  return function (b) {
    if (b) return sumCurry(a + b);
    return a;
  };
}

function sumCurry(val) {
    let count = 0;
    count += val;
    if(!val) return count;
    return function inner (val) {
        if(!val) return count;
        else {
            count += val;
            return inner;
        }
        
    }
    
}

console.log(sumCurry(1)(2)(3)());

// 2. operator + operation

function evaluate(operator) {
  return function (a) {
    return function (b) {
      if (operator == 'sum') return a + b;
      else if (operator == 'sub') return a - b;
      else if (operator == 'mul') return a * b;
      else if (operator == 'div') return a / b;
      else 'Invalid operation';
    };
  };
}

const oper = evaluate('mul');
console.log(oper(2)(3));



// Partial application => No. of argument != No. of function

// function sum(a) {
//   return function (b, c) {
//     return a + b + c;
//   };
// }

// console.log(sum(1)(2, 3));

//  Currying in real time manipulation DOM

let head = document.querySelector('#heading');

function updateElement(element) {
  return function (content) {
    element.textContent = content;
  };
}

updateElement(head)('Hello Raj');

//  convert f(a,b,c) to f(a)(b)(c)

function curry(func) {
  return function curriedFunction(...args) {
    if (args.length >= func.length) {
      console.log(func);
      return func(...args); // this will have sum1 a+b+c+d
    } else {
      return function (next) {
        return curriedFunction(...args, next);
      };
    }
  };
}

const sum1 = (a, b, c, d) => a + b + c + d; // this will convert to sum(a)(b)(c)(d)

const totalSum = curry(sum1);

console.log(totalSum(1)(6)(3)(2));
