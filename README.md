# polyglot-tag

Easily embed scripts in any language in to a Javascript file. True polyglot programming!

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
Run the script with the supplied interpreter. If not supplied the script is written to a file and executed directly.
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
Temp directory used for writing script files, defaults to [os.tmpdir()](https://nodejs.org/docs/latest/api/os.html#os_os_tmpdir).
```Javascript
console.log(polyglot({ tmpdir: '.' })`
    printf "$0"
`);
```
