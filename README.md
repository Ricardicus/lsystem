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

# Snapshot image

![Skärmavbild 2022-10-28 kl  07 25 59](https://user-images.githubusercontent.com/14809962/198509880-e0fb739a-312d-4535-9e9b-6357d63babb6.png)

# Inspiration

I learned about L systems via this blog post:
https://gpfault.net/posts/generating-trees.txt.html
