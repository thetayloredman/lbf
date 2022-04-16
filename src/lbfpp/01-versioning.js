function logDebug(msg) {
    if (process.env.DEBUG) {
        console.error(`lbfpp: DEBUG: ${msg}`)
    }
}
let contents = process.argv[2].split('\n');
logDebug(`Received ${contents.length} lines of input.`);

if (!contents.includes('@lbf-version 0')) {
    console.error('lbfpp: ERROR: Missing @lbf-version directive.');
    process.exit(1);
}

console.log(contents.join('\n'))