highlight.js-cli
================

Use [highlight.js](http://highlightjs.org/) from command line on HTML or Markdown files.

## Install

```
npm install highlight.js-cli -g
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

Highlight.js-cli will try to pick up the language from the class, if specified:

```
<pre><code class="haskell">
	main :: IO ()
</code></pre>
```