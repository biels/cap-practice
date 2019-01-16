let args = [{key: 's1', value: 'exp1'}, {key: 's2', value: 'exp2'}]
let prog = [{key: '#label1', value: 'bloc1'}, {key: '#label2', value: 'bloc2'}, {key: '#label3', value: 'bloc3'}, {key: '#label4', value: 'b4 (return)'}]

const block = (contents) => {
    return `[\n${contents.split('\n').map(a => '  ' + a).join('\n')}\n]`
}
const bindTo = (on, to, _in) => {
    return `${on} bindTo: ${to} in: ${block(_in)}`
}
function withInitDo(args, program){
    let bindStructure = (array, transform, inner) => {
        return array.reduceRight((pv, cv, i, arr) => {
            return bindTo(cv.key, transform(cv.value, arr[i+1]), pv)
        }, inner)
    }
    let bindArgs = (arr, inner) => bindStructure(arr, a => a, inner)
    let instructionTransform = (instruction, next) => {
        if(next == null) next = {key: '#RETURN', value: 'nil'}
        return `[ ${instruction} value. ${next.key} binding value${next.value === 'nil' ? ': ' + next.value : ''} ]`
    }
    let bindProgram = (arr, inner) => bindStructure(arr, instructionTransform, inner)
    return bindArgs(args, bindProgram(program, `[ ${program[0].key} binding value ]`))
}

console.log(withInitDo(args, prog))


