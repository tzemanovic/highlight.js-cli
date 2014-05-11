highlight.js-cli
================

Use [highlight.js](http://highlightjs.org/) from command line on HTML or Markdown files.

## Install

```
npm install highlight.js-cli --g
```

## Use

Default selector is "pre code".

```
hljs < input.html > output.html
```

To use a different selector use --s option. You can use any valid jQuery selector, for example:

```
hljs --s=".highlight" < input.html > output.html
```