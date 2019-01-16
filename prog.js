const bindings = {
  '#RETURN': (value) => {
    console.log(`Returned: ${value}`);
    process.exit()
  }
};
const changeBinding = (on, to) => bindings[on] = to;
const binding = (on, to) => bindings[on];

String.prototype.binding = function () {
  return binding(this);
};
String.prototype.changeBinding = function (to) {
  changeBinding(this, to);
};
String.prototype.bindTo = function (to, _in) {
  changeBinding(this, to);
  return _in
};

function withInitDo(args, program) {
  let bindStructure = (array, transform, inner) => {
    return array.reduceRight((pv, cv, i, arr) => {
      console.log(`cv`, cv);
      return cv.key.bindTo(transform(cv, arr[i + 1]), () => pv)
      // return bindTo(cv.key, transform(cv.value, arr[i + 1]), pv)
    }, inner)
  }
  let bindArgs = (arr, inner) => bindStructure(arr, a => a, inner)
  let instructionTransform = (instruction, next) => {
    if (next == null) next = {key: '#RETURN', value: '#RETURN'.binding()}
    return () => {
      console.log(`Executing ${instruction.key}`, instruction);
      instruction.value();
      console.log(`Going from ${instruction.key} to ${next.key}`, next);
      next.key.binding()()
    }
    // return `[ ${instruction} value. ${next.key} binding value${next.value === 'nil' ? ': ' + next.value : ''} ]`
  }
  let bindProgram = (arr, inner) => bindStructure(arr, instructionTransform, inner)
  //`[ ${program[0].key} binding value ]`
  let compiled = bindArgs(args, bindProgram(program, () => program[0].key.binding()()))
  while (typeof compiled === 'function') compiled = compiled();
}
module.exports = {withInitDo}
