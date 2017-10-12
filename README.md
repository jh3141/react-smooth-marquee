# react-smooth-marquee
A simple marquee component for ReactJS using requestAnimationFrame

See a [demonstration here](https://jh3141.github.io/react-smooth-marquee/demo.html) (source is in `demo.html`).

# Installation

`npm install react-smooth-marquee --save`

# Importing

ES6:
```
import Marquee from "react-smooth-marquee"
```

ES5 with `require` (e.g. using webpack):

```
var Marquee = require("react-smooth-marquee")
```

# Usage

The component is pretty simple at present (although I expect it will accumulate additional properties in later versions...):

```
<Marquee>Content goes here </Marquee>
```

There is one optional property, `velocity`, which sets the movement velocity (in CSS pixels per millisecond).  It defaults to 0.12, which seems a reasonably sensible value for most applications.

The component expects two CSS classes to be defined, but does not include any definitions itself (in order to allow for highest flexibility).  These are:

## `.Marquee`

This sets styles on the container, i.e. the outer element whose position remains static. It should usually have `display: block` 
(although as a `<div>` element is used this is the default) and for correct function must have `overflow-x: hidden`.

## `.MarqueeContent`

This sets styles on the child that is moved within the container.  In order to allow correct calculation of when the element is 
moved from the left hand edge of the display back to the right, it should usually be set up either with `display: block` and an
explicit width, or with `display: inline-block` so that width can be calculated from its contents.
