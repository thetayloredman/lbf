# lbf langage documentation

lbf is a simple list-oriented programming language.

Sike! Not very simple.

## Program Context

LBF files should *always* end in the extension `.lbf`.

They contain any characters, but the only things recognized by the interpreters are `<>[]+-.,@#`.

The program has a list of 5-million unsigned 8-bit integers in it's access.

## Processing

Processor directives are prefixed with `@`. These directives are not defined at this time. They will be used for importing different bytecode modules soon.

## The List

Using `<` and `>` rotates the pointer.

`[` will run the code up to the next `]` if the value at the pointer is not 0. `]` will return to the `[` if value != 0.

`+` increases the value and `-` decreases.

`.` will print the ASCII value. `,` reads one.

`#` is a single-line comment.
