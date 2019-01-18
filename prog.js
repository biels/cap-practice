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

function withInitDo(args, program) {
  let bindStructure = (array, transform, inner) => {
    return array.reduceRight((pv, cv, i, arr) => {
      if (typeof cv === "string") cv = [cv];
      let next = null;
      if (i < arr.length - 1) next = arr[i + 1];
      return cv[0].bindTo(transform(cv, next), () => pv)
    }, inner)
  };
  let bindArgs = (arr, inner) => bindStructure(arr, (a, next) => a[1], inner);
  let instructionTransform = (instruction, next) => {
    if (next == null) next = ['#RETURN', '#RETURN'.binding()];
    return () => {
      console.log(`Executing ${instruction[0]}`);
      instruction[1]();
      next[0].binding()();
    }
  };
  let bindProgram = (arr, inner) => bindStructure(arr, instructionTransform, inner);
  let compiled = bindArgs(args, bindProgram(program, () => program[0][0].binding()()));
  compiled()
}

module.exports = {withInitDo};

