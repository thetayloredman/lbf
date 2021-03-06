# lbf v0 langage documentation

lbf is a simple list-oriented programming language.

Sike! Not very simple.

## Program Context

LBF files should *always* end in the extension `.lbf`.

**LBF FILES MUST BEGIN WITH THE LINE:** `@lbf-version 0`

They contain any characters, but the only things recognized by the interpreters are `<>[]+-.,@#`.

The program has a list of 50k unsigned 8-bit integers in it's access.

## Processing

Processor and pre-processor directives are prefixed with `@`. These directives are not defined at this time. They will be used for importing different bytecode modules soon.

### Preprocessor directives

Preprocessor directives begin in `@@`. They must be on their own line.
The preprocessor is responsible for removing comments and handling these directives.

> **PREPROCESSERS MUST RESOLVE RECURSIVELY.**
>
> After processing once, re-process the files, so that we don't need to handle the recursive results.

#### `@@add <num>`

Adds `<num>` to the current pointer. Used as a shortcut. Resolves to `<num>` x `+`. **This modifies your current pointer.**

#### `@@sub <num>`

Subtracts `<num>` from the current pointer. Used as a shortcut. Resolves to `<num>` x `-`. **This modifies your current pointer.**

#### `@@reset`

Resolves to `[-]`, to clear the pointer. **This modifies your current pointer.**

#### `@@set <val>`

Sets the current pointer to `<val>`. Used as a shortcut for `[-]` or `@@reset` along with `@@add <val>` **This modifies your current pointer.**

#### `@@set-ascii <char>`

An equivalent to `@@set` with the ASCII value of `<char>`. Use `@@set-ascii  ` with TWO SPACES AT THE END for a space. **This modifies your current pointer.**

#### `@@print-ascii <char>`

Print out `<char>`. Equivalent to doing `@@set-ascii <char>` and then `.`. **This modifies your current pointer.**

#### `@@newline`

Prints a newline. **This modifies your current pointer.**

### Processor directives

These directives begin in `@` and are written directly as part of the bytecode. They can be used for more advanced state storage and similar things, and are not handled by the preprocessor.

#### `@lbf-version <num>`

This must be the first line of the file. Otherwise, error. This processor directive is to define the lbf version to be used.

#### None are defined at this time

This will be used for fs access, default state loads etc soon.

## The List

Using `<` and `>` rotates the pointer.

`[` will run the code up to the next `]` if the value at the pointer is not 0. `]` will return to the `[` if value != 0.

`+` increases the value and `-` decreases.

`.` will print the ASCII value. `,` reads one.

`#` is a single-line comment.
Anything not on this list is also treated as a comment (excluding lines that start with `@`)