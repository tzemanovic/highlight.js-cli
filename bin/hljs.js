#!/usr/bin/env node

var cli = require('cli'),
    hljs = require('highlight.js'),
    availableLanguages = hljs.listLanguages(),
    cheerio = require('cheerio'),
    Entities = require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    fs = require('fs'),
    opts = cli.parse({
      selector: [
        's',
        'jQuery style selector which specifies on which elements highlighting is applied',
        'string',
        'pre code'
      ],
      output: [
        'o',
        'Output file path',
        'file',
        false
      ]
    });

function language(cls) {
  if (cls) {
    var lang = cls.toLowerCase().replace('language-', '');
    if (availableLanguages.indexOf(lang) != -1) {
      return lang;
    }
  }
  return null;
}

cli.withStdin(function(input) {
  var $ = cheerio.load(input, {
    decodeEntities: false
  });
  $(opts.selector).each(function(_, elem) {
    var lang = language($(elem).attr('class'));
    var target = entities.decode($(elem).text());
    var highlighted;
    if (lang) {
      highlighted = hljs.highlight(lang, target).value;
    } else {
      highlighted = hljs.highlightAuto(target).value;
    }
    $(elem).text(highlighted).addClass('hljs');
  });
  var out = $.html();
  if (opts.output) {
    fs.writeFileSync(opts.output, out);
  } else {
    this.output(out);
  }
});
