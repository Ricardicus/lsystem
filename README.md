# Lindenmayer system

Inspired by the algorithmical beauty of trees.

# Generate LSystem parser

```
$ ./node_modules/pegjs/bin/pegjs lsystem.pegjs && mv lsystem.js src
```

This parser can parse either lstrings or entire axiom definitions.

# WORK IN PROGRESS

The goal is to generate interesting patterns..
This is where i ATTEMPT to go with this:
https://gpfault.net/posts/generating-trees.txt.html

This is what it looks like today (2022-10-25):

![Skärmavbild 2022-10-25 kl  22 26 38](https://user-images.githubusercontent.com/14809962/197874971-be6801be-25a6-42d4-ba2e-db71df85d485.png)

I will try to add animation next.
And perhaps more functions, now only random(start, end) as been added.
