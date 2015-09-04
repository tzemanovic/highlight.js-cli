highlight.js-cli
================

Use [highlight.js](http://highlightjs.org/) from command line on HTML file.

## Installation

```
npm install highlight.js-cli -g
```

## Usage

Input it taken from stdin and output to stdout if not specified otherwise (see example below). The default selector is "pre code", i.e. `<pre><code>...</code></pre>`. Other DOM elements than those fitting the selector are not highlighted.

To highlight a file:

```
hljs < input.html > output.html
```

You can also use the `--o` parameter:

```
hljs --o output.html < input.html
```

To highlight a multi-line string from stdin:

```
hljs <<EOF
<pre><code>
var stuff="asd"
</code></pre>
EOF
```

To use a different selector use `--s` option. You can use any valid jQuery selector, for example:

```
hljs --s=".highlight" < input.html > output.html
```

Highlight.js-cli will try to pick up the language from the class, if specified:

```
<pre><code class="haskell">
	main :: IO ()
</code></pre>
```