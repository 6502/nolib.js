# nolib.js

a non-library

This code is just a very very VERY tiny layer to fix some annoyances
when writing vanilla javascript code, mostly about verbosity.

It doesn't do anything fancy or magic, it's just meant to save some
human brain processing when reading code and, less importantly, some
typing when writing code.

It doesn't aim as being the most compact code because that would make
the program, at least for me, harder to read.

It doesn't try to hide anything important because that would make
the program, at least for me, harder to understand.

Copying and pasting it instead of including it is and should be a
reasonable option. That's why it's not really a library.

This is why it also has no license...

## Documentation

### `el(ctype, opts, ...children)`

Creates a DOM node optionally specifiying
 - parent
 - classes
 - style
 - properties
 - handlers
 - children

Example:

    el("div.title", {parent: document.body,
                     s_textAlign: "center"},
       el("span", {textContent: "Child 1"}),
       el("span", {textContent: "Child 2"}),
       el("span", {textContent: "Child 3",
                  s_cursor: "pointer",
                  onclick: () => alert("Hey")}));

### `drag(event, f)`

Handles mouse dragging by calling the function `f` with

    f(x, y, 0); // Start of dragging
    f(x, y, 1); // During dragging at each mouse movement
    f(x, y, 2); // When the mouse is released

`event` is the `onmousedown` event that starts the dragging.