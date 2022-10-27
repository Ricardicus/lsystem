# Lindenmayer system

Inspired by the algorithmical beauty of trees.

# Generate LSystem parser

```
$ ./node_modules/pegjs/bin/pegjs -O speed lsystem.pegjs && mv lsystem.js src
```

This parser can parse either lstrings or entire axiom definitions.

# Link to DEMO

Here is a link to a demo version:

[https://me.ricardicus.se/lsystem](https://me.ricardicus.se/lsystem)

# inspiration

I learned about L systems via this blog post:
https://gpfault.net/posts/generating-trees.txt.html
