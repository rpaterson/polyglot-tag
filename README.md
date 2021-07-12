# polyglot-tag

Easily embed scripts in any interpreted language in to a NodeJS script. True polyglot programming!

# Usage

Use polyglot as a template literal tag, supplying a shebang (!#) at the beginning of the literal with the interpreter for the script, the same as if you were going to make an executable script file.
```Javascript
const polyglot = require('polyglot-tag');

const message = 'Hello';

console.log(polyglot`
    #!/bin/bash
    printf "${message} Bash!"
`);

console.log(polyglot`
    #!/usr/bin/env python
    import sys
    sys.stdout.write("${message} Python!")
`);

console.log(polyglot`
    #!/usr/bin/env ruby
    print "${message} Ruby!"
`);
```

# Options

Call polyglot with an options object to create a template literal tag with those options.

## interpreter
Run the script with the supplied interpreter. If not supplied the script is written to a file and executed directly (using the shebang).
```Javascript
const ruby = polyglot({ interpreter: 'ruby' });
console.log(ruby`print "Hello Ruby!"`);
```

## file
Name of file used to store script. Defaults to `'script'`.
```Javascript
console.log(polyglot({ file: 'my-script.sh' })`
    printf $(basename "$0")
`);
```

## tmpdir
Temp directory used for writing interpreted script files, defaults to [os.tmpdir()](https://nodejs.org/docs/latest/api/os.html#os_os_tmpdir). Files area automatically deleted after each script is run.
```Javascript
console.log(polyglot({ tmpdir: '.' })`
    printf "$0"
`);
```
