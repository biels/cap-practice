const PROG = require('./prog-rec')

let args = [['#n', 0]]
let prog = [
  [ '#label1', () => '#n'.changeBinding(0)],
  [ '#label2', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label3', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label4', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label5', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label6', () => '#n'.changeBinding('#n'.binding() + 1)],
  [ '#label7', () => '#RETURN'.binding()('#n'.binding())]
]

PROG.withInitDo(args, prog)
