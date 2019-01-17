const bindings = {
  '#RETURN': (value) => {
    console.log(`Returned: ${value}`);
    process.exit()
  }
};
const changeBinding = (on, to) => bindings[on] = to;
const binding = (on) => bindings[on];

String.prototype.binding = function () {
  return binding(this);
};
String.prototype.changeBinding = function (to) {
  changeBinding(this, to);
};
String.prototype.bindTo = function (to, _in) {
  changeBinding(this, to);
  return _in() //Equivalent to value
};

let build = (args, program, inner, i, finishedArgs) => {
  let getArr = () => finishedArgs ? program : args;
  let arr = getArr();
  if (i > arr.length - 1) {
    if (finishedArgs) {
      return inner();
    }
    finishedArgs = true;
    i = 0;
  }
  arr = getArr();
  let element = arr[i];
  if (!finishedArgs) {
    // Arg
    if (typeof element === "string") element = [element, null];
    element[0].bindTo(element[1], () => build(args, program, inner, i + 1, finishedArgs))

  } else {
    // Instruction
    let next;
    if (arr.length === i) {
      next = ['#RETURN', '#RETURN'.binding()]
    } else {
      next = arr[i + 1]
    }
    let to = () => {
      element[1]();
      next[0].binding()()
    };
    element[0].bindTo(to, () => build(args, program, inner, i + 1, finishedArgs));
  }
}
function withInitDo(args, program) {
  if (program.length === 0) return null;
  let main = () => program[0][0].binding()();

  build(args, program, main, 0, false)

}

module.exports = {withInitDo}
