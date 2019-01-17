const PROG = require('./prog')

let args = [['#n', 0], '#x']
let prog = [
  [ '#label1', () => '#x'.changeBinding(4)],
  [ '#label2', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label3', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label4', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label5', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label6', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label7', () => '#RETURN'.binding()('#x'.binding())]
]

PROG.withInitDo(args, prog)
