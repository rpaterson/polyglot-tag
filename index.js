'use strict';

const ChildProcess = require('child_process');
const dedent = require('dedent');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Template literal tag that executes a script in a different programming language
 *
 * @param {String} [options.interpreter] interpreter for script. If not specified
 *                                       executes script file directly (using shebang)
 * @param {String} [options.file] name of script file, defaults to 'script'
 * @param {String} [options.tmpdir] directory to write temporary script, defaults
 *                                  to os.tmpdir()
 * @return {String} stdout of script
 */
function polyglot(options, strings, ...args) {
    const script = dedent(strings, ...args);
    const dir = fs.mkdtempSync(path.join(options.tmpdir || os.tmpdir(), 'polyglot'));
    const file = path.join(dir, options.file || 'script');
    fs.writeFileSync(file, script);
    if (!options.interpreter) {
        fs.chmodSync(file, 0o777);
    }
    const result = options.interpreter ?
        ChildProcess.execSync(`${options.interpreter} ${file}`) :
        ChildProcess.execFileSync(file);
    fs.unlinkSync(file);
    fs.rmdirSync(dir);
    return result.toString();
};

function tagOrFunction(...args) {
    if (args.length === 1 && !Array.isArray(args[0])) {
        return polyglot.bind(null, args[0]);
    } else {
        return polyglot({}, ...args);
    }
};

module.exports = tagOrFunction;
module.exports.polyglot = tagOrFunction;