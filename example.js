'use strict';

const polyglot = require('.');

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

const ruby = polyglot({ interpreter: 'ruby' });
console.log(ruby`
    print "${message} Ruby interpreter!"
`);

console.log(polyglot({ file: 'my-script.sh' })`
    printf $(basename "$0")
`);

console.log(polyglot({ tmpdir: '.' })`
    printf "$0"
`);