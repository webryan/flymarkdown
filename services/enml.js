var fs = require('fs');
var enmlOfHtmljs = require('./enmlOfHtml');
var inlineCss = require('css-inline');

var html = fs.readFileSync('dist.html','utf8');
var css = fs.readFileSync('test.css','utf8');
var options = {
    css : css
};

inlineCss(html, css, function(err, inlined){
  console.log(inlined);
});
/**
enmlOfHtmljs.ENMLOfHTML(html, options, function(err,ENML){
    console.log(ENML);
});
*/
