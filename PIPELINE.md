# lbf compiler pipeline

The compiler goes through a few stages to get an output.

## Stage 1: Preprocessing

This is the `scripts/lbfpp.sh` file which preprocesses the LBF `@@` directives into proper directives. This also handles stripping any comments from the source code.

lbfpp takes one argument: the source file. The environment variable `DEBUG` toggles debug logs.

```bash
$ lbfpp FILE.lbf
outputs preprocessed code
```
