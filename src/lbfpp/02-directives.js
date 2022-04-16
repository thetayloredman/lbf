function logDebug(msg) {
    if (process.env.DEBUG) {
        console.error(`lbfpp: DEBUG: ${msg}`)
    }
}
let contents = process.argv[2].split('\n');
logDebug(`Received ${contents.length} lines of input.`);

logDebug('Enter stage 2: Directive Parsing');

function lineValue(type, layer, index, line, value) {
    return `# !lbfpp directives/START/${type}/layer${layer}:${index} ${line}
${value}
# !lbfpp directives/END/${type}/layer${layer}:${index} ${line}`
}

function parsePhase(data, layer) {
    let trueIndex = -1;
    let newData = data.map((line) => {
        trueIndex++;
        if (!line.startsWith('@@')) return line;
        logDebug(`Parsing index ${trueIndex} ${line}`);
        
        let directive = line.substring(2);
        let parts = directive.split(' ');
        let directiveName = parts[0];
        let directiveArgs = parts.slice(1);

        if (directiveName === 'add') {
            return lineValue('add', layer, trueIndex, line, '+'.repeat(directiveArgs[0]));
        } else if (directiveName === 'sub') {
            return lineValue('sub', layer, trueIndex, line, '-'.repeat(directiveArgs[0]));
        } else if (directiveName === 'reset') {
            return lineValue('add', layer, trueIndex, line, '[-]');
        } else if (directiveName === 'set') {
            return lineValue('set', layer, trueIndex, line, `@@reset\n@@add ${directiveArgs[0]}`);
        } else if (directiveName === 'set-ascii') {
            return lineValue('set-ascii', layer, trueIndex, line, `@@set ${directiveArgs[0].charCodeAt(0)}`);
        } else if (directiveName === 'print-ascii') {
            return lineValue('print-ascii', layer, trueIndex, line, `@@set-ascii ${directiveArgs[0]}\n.`);
        } else if (directiveName === 'print-ascii-long') {
            let text = directiveArgs.join(' ').split('').map(char => '@@print-ascii ' + char).join('\n');

            return lineValue('print-ascii-long', layer, trueIndex, line, text);
        } else if (directiveName === 'newline') {
            return lineValue('add', layer, trueIndex, line, '@@set 10\n.');
        } else {
            console.error('Unknown directive.');
            process.exit(1);
        }
        // Because of newlines in above code
    }).join('\n').split('\n');

    if (JSON.stringify(data) !== JSON.stringify(newData)) {
        // Run again.
        return [true, newData];
    } else {
        // Do not run again.
        return [false, newData];
    }
}

function recurseOn(data) {
    let output = data;
    let done = false;
    let layer = 0;
    while (!done) {
        logDebug(`Recursion layer ${layer++}`);
        let [runAgain, newData] = parsePhase(output, layer - 1);
        output = newData;
        done = !runAgain;
    }
    return output;
}

console.log(recurseOn(contents).join('\n'))