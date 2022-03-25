# lbf compiler process

> **NOTE BEFORE READING THIS DOCUMENT:** All options are passed to the subprocesses using **environment variables**. We do **not** use CLI flags for the subprocesses.

## Temporary File Initialization

Before lbf can do *anything* with your source code, a tool called `lbf-mktemp` will handle the creation of the `/tmp` folder.

`lbf-mktemp` is called with no environment variables. There is a single positional argument at `$1` which is the name of the source file we are compiling. This is optional, but recommended.

`lbf-mktemp` outputs the name of a temporary file.

ENV:
- `DEBUG`: `1` or undefined; if set to `1`, print logs to console, if not set, we will log to the temp file.

## Preprocessing

### Initialization


