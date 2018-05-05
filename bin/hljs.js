#!/usr/bin/env node

var cli = require('cli'),
    hljs = require('highlight.js'),
    avaiableLanguages = hljs.listLanguages(),
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

cli.withStdin(function(input) {
  var $ = cheerio.load(input);
  $(opts.selector).each(function(_, elem) {
    var lang = $(elem).attr('class');
    var highlighted;
    if (lang && avaiableLanguages.indexOf(lang.toLower) != -1) {
      highlighted = hljs.highlight(lang, $(elem).text()).value;
    } else {
      highlighted = hljs.highlightAuto($(elem).text()).value;
    }
    $(elem).text(highlighted).addClass('hljs');
  });
  var out = entities.decode($.html());
  if (opts.output) {
    fs.writeFileSync(opts.output, out);
  } else {
    this.output(out);
  }
});
