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
  let getArr = () => {
    let result;
    if (finishedArgs) {
      result = program;
    } else {
      result = args
    }
    return result;
  };
  let arr = getArr();
  if (i > arr.length - 1) {
    if (finishedArgs) {
      return inner;
    }
    finishedArgs = true;
    i = 0;
  }
  arr = getArr();
  let element = arr[i];
  if (!finishedArgs) {
    // Arg
    if (typeof element === "string") element = [element, null];
    return element[0].bindTo(element[1], () => build(args, program, inner, i + 1, finishedArgs))

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
    return element[0].bindTo(to, () => build(args, program, inner, i + 1, finishedArgs));
  }
}

function withInitDo(args, program) {
  if (program.length === 0) return null;
  let main = () => program[0][0].binding()();

  let a = build(args, program, main, 0, false)
  a()

}

module.exports = {withInitDo}
