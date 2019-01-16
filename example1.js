const PROG = require('./prog')

let args = [{key: '#n', value: 0}]
let prog = [
  {key: '#label1', value: () => '#n'.changeBinding(0)},
  {key: '#label2', value: () => '#n'.changeBinding('#n'.binding() + 1)},
  {key: '#label3', value: () => '#n'.changeBinding('#n'.binding() + 1)},
  {key: '#label4', value: () => '#n'.changeBinding('#n'.binding() + 1)},
  {key: '#label5', value: () => '#n'.changeBinding('#n'.binding() + 1)},
  {key: '#label6', value: () => '#n'.changeBinding('#n'.binding() + 1)},
  {key: '#label7', value: () => '#RETURN'.binding()('#n'.binding())}
]

console.log(PROG.withInitDo(args, prog))
