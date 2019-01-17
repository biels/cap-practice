const PROG = require('./prog')


// PROG withInit: {{ #n . 10 } . { #coll . OrderedCollection new }}  do:
//   {
// { #label1 . [ #n binding == 0 ifTrue:
//   [ #RETURN binding value: #coll binding ]  ] } .
// { #label2 . [ #coll changeBinding:
//   ((#coll binding) add: #n binding; yourself) ] } .
// { #label3 . [ #n changeBinding: (#n binding ­ 1) ] } .
// { #label4 . [ #label1 binding value ] }
// }.


let args = [['#n', 10], ['#coll', []]]
let prog = [
  [ '#label1', () => {
    if('#n'.binding() === 0) '#RETURN'.binding()('#coll'.binding())
  } ],
  [ '#label2', () => {
    '#coll'.changeBinding(('#coll'.binding()).concat('#n'.binding()));
  }],
  [ '#label3', () => '#n'.changeBinding('#n'.binding() - 1)],
  [ '#label4', () => '#label1'.binding()()],
]

PROG.withInitDo(args, prog)
