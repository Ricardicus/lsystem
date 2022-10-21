# Lindenmayer system

Inspired by the algorithmical beauty of trees.

# Generate LSystem parser

```
$ ./node_modules/pegjs/bin/pegjs --allowed-start-rules "lstring,lsystem" lsystem.pegjs && cp lsystem.js src
```

This parser can parse either lstrings or entire axiom definitions.
