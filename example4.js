const PROG = require('./prog')
// Fibonacci of #n

let args = [['#n', 10], ['#fib', 1], ["#prevFib", 1], ['#i', 2], ['#temp', 0]]
let prog = [
  [ '#label1', () => {
    if('#n'.binding() <= 1) '#RETURN'.binding()('#n'.binding())
  } ],
  ['#loop', () => {
    if('#i'.binding() === '#n'.binding())'#endloop'.binding()();
  }],
  [ '#label2', () => '#temp'.changeBinding('#fib'.binding())],
  [ '#label3', () => '#fib'.changeBinding('#fib'.binding() + '#prevFib'.binding())],
  [ '#label4', () => '#prevFib'.changeBinding('#temp'.binding())],
  [ '#label5', () => '#i'.changeBinding("#i".binding() + 1)],
  [ '#label6', () => '#loop'.binding()()],
  [ '#endloop', () => {}],
  [ '#label7', () => '#RETURN'.binding()('#fib'.binding())],
]

PROG.withInitDo(args, prog)
