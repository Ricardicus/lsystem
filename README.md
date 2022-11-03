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

# Quirks and howto:s

Test out your own L systems using my system. The idea is to
make the "turtle" move along a fractal. One can change the
length and width of the marks as well as the angle of travel.
There are some functions available to make this happen.

| Function            | Description             | Type          |
| -------------------:| -----------------------:| -------------:|
| mov(length, width)  | Move in the direction   | Part of axiom |
| rot(degrees)        | Change direction        | Part of axiom |
| [                   | Push state on stack     | Part of axiom |
| ]                   | Pop state from stack    | Part of axiom |
| cos(x), sin(x)      | Trigonometric functions | Argument expression |
| context(0)      | Return number of drawings, needed to accomplish animation | Argument expression |

## Defining an axiom

One can define a list of axioms, and the first one of these will be the one
selected for expansion. So, the first axiom can be used as an initial state.
One can define axioms like this:

```
A(g=0) ->
mov(100/(g+1),1)
rot(10)
A(g=g+1)
```

If expanded 4 times, this will look like this:

```
mov(100, 1)
rot(10)
mov(50, 1)
rot(10)
mov(33.3, 1)
rot(10)
mov(25, 1)
rot(10)
```

One does not need to include a variable like "g" in the example above.
Using multiple rules can be achieved by adding a "," between the axiom definitions:

```
A() -> 
mov(10, 1)
B(),
B() -> 
rot(45)
A()
```

Expanded two times will look like this:

```
mov(10, 1)
rot(45)
mov(10, 1)
B()
```

# Inspiration

I learned about L systems via this blog post:
https://gpfault.net/posts/generating-trees.txt.html

Further reading can be found here, on a wonderful website dedicated to The Algorithmic Beauty of Plants:
http://algorithmicbotany.org/papers/#abop

