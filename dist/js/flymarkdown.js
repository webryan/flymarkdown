!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("markdown",function(e,i){function n(i){if(t.findModeByName){var n=t.findModeByName(i);n&&(i=n.mime||n.mimes[0])}var r=t.getMode(e,i);return"null"==r.name?null:r}function r(t,e,i){return e.f=e.inline=i,i(t,e)}function a(t,e,i){return e.f=e.block=i,i(t,e)}function o(t){return t.linkTitle=!1,t.em=!1,t.strong=!1,t.strikethrough=!1,t.quote=0,L||t.f!=h||(t.f=m,t.block=l),t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.thisLineHasContent=!1,null}function l(t,e){var a=t.sol(),o=e.list!==!1;e.list!==!1&&e.indentationDiff>=0?(e.indentationDiff<4&&(e.indentation-=e.indentationDiff),e.list=null):e.list!==!1&&e.indentation>0?(e.list=null,e.listDepth=Math.floor(e.indentation/4)):e.list!==!1&&(e.list=!1,e.listDepth=0);var l=null;if(e.indentationDiff>=4)return e.indentation-=4,t.skipToEnd(),M;if(t.eatSpace())return null;if(l=t.match(G))return e.header=l[0].length<=6?l[0].length:6,i.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(e.prevLineHasContent&&(l=t.match(J)))return e.header="="==l[0].charAt(0)?1:2,i.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(t.eat(">"))return e.indentation++,e.quote=a?1:e.quote+1,i.highlightFormatting&&(e.formatting="quote"),t.eatSpace(),f(e);if("["===t.peek())return r(t,e,p);if(t.match(A,!0))return T;if((!e.prevLineHasContent||o)&&(t.match(I,!1)||t.match(P,!1))){var h=null;return t.match(I,!0)?h="ul":(t.match(P,!0),h="ol"),e.indentation+=4,e.list=!0,e.listDepth++,i.taskLists&&t.match(z,!1)&&(e.taskList=!0),e.f=e.inline,i.highlightFormatting&&(e.formatting=["list","list-"+h]),f(e)}return i.fencedCodeBlocks&&t.match(/^```[ \t]*([\w+#]*)/,!0)?(e.localMode=n(RegExp.$1),e.localMode&&(e.localState=e.localMode.startState()),e.f=e.block=g,i.highlightFormatting&&(e.formatting="code-block"),e.code=!0,f(e)):r(t,e,e.inline)}function h(t,e){var i=F.token(t,e.htmlState);return(L&&null===e.htmlState.tagStart&&!e.htmlState.context||e.md_inside&&t.current().indexOf(">")>-1)&&(e.f=m,e.block=l,e.htmlState=null),i}function g(t,e){return t.sol()&&t.match("```",!1)?(e.localMode=e.localState=null,e.f=e.block=s,null):e.localMode?e.localMode.token(t,e.localState):(t.skipToEnd(),M)}function s(t,e){t.match("```"),e.block=l,e.f=m,i.highlightFormatting&&(e.formatting="code-block"),e.code=!0;var n=f(e);return e.code=!1,n}function f(t){var e=[];if(t.formatting){e.push(y),"string"==typeof t.formatting&&(t.formatting=[t.formatting]);for(var n=0;n<t.formatting.length;n++)e.push(y+"-"+t.formatting[n]),"header"===t.formatting[n]&&e.push(y+"-"+t.formatting[n]+"-"+t.header),"quote"===t.formatting[n]&&e.push(!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?y+"-"+t.formatting[n]+"-"+t.quote:"error")}if(t.taskOpen)return e.push("meta"),e.length?e.join(" "):null;if(t.taskClosed)return e.push("property"),e.length?e.join(" "):null;if(t.linkHref)return e.push(O),e.length?e.join(" "):null;if(t.strong&&e.push(E),t.tagflag&&e.push(W),t.math&&e.push(U),t.em&&e.push(j),t.strikethrough&&e.push(R),t.linkText&&e.push(N),t.code&&e.push(M),t.header&&(e.push(q),e.push(q+"-"+t.header)),t.quote&&(e.push(w),e.push(!i.maxBlockquoteDepth||i.maxBlockquoteDepth>=t.quote?w+"-"+t.quote:w+"-"+i.maxBlockquoteDepth)),t.list!==!1){var r=(t.listDepth-1)%3;e.push(r?1===r?D:H:C)}return t.trailingSpaceNewLine?e.push("trailing-space-new-line"):t.trailingSpace&&e.push("trailing-space-"+(t.trailingSpace%2?"a":"b")),e.length?e.join(" "):null}function u(t,e){return t.match(K,!0)?f(e):void 0}function m(e,n){var r=n.text(e,n);if("undefined"!=typeof r)return r;if(n.list)return n.list=null,f(n);if(n.taskList){var o="x"!==e.match(z,!0)[1];return o?n.taskOpen=!0:n.taskClosed=!0,i.highlightFormatting&&(n.formatting="task"),n.taskList=!1,f(n)}if(n.taskOpen=!1,n.taskClosed=!1,n.header&&e.match(/^#+$/,!0))return i.highlightFormatting&&(n.formatting="header"),f(n);var l=e.sol(),g=e.next();if("\\"===g&&(e.next(),i.highlightFormatting)){var s=f(n);return s?s+" formatting-escape":"formatting-escape"}if(n.linkTitle){n.linkTitle=!1;var u=g;"("===g&&(u=")"),u=(u+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var m="^\\s*(?:[^"+u+"\\\\]+|\\\\\\\\|\\\\.)"+u;if(e.match(new RegExp(m),!0))return O}if("`"===g){var k=n.formatting;i.highlightFormatting&&(n.formatting="code");var p=f(n),v=e.pos;e.eatWhile("`");var x=1+e.pos-v;return n.code?x===b?(n.code=!1,p):(n.formatting=k,f(n)):(b=x,n.code=!0,f(n))}if(n.code)return f(n);if("!"===g&&e.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return e.match(/\[[^\]]*\]/),n.inline=n.f=d,B;if("["===g&&e.match(/.*\](\(.*\)| ?\[.*\])/,!1))return n.linkText=!0,i.highlightFormatting&&(n.formatting="link"),f(n);if("]"===g&&n.linkText&&e.match(/\(.*\)| ?\[.*\]/,!1)){i.highlightFormatting&&(n.formatting="link");var s=f(n);return n.linkText=!1,n.inline=n.f=d,s}if("<"===g&&e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var s=f(n);return s?s+=" ":s="",s+_}if("<"===g&&e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){n.f=n.inline=c,i.highlightFormatting&&(n.formatting="link");var s=f(n);return s?s+=" ":s="",s+$}if("<"===g&&e.match(/^\w/,!1)){if(-1!=e.string.indexOf(">")){var S=e.string.substring(1,e.string.indexOf(">"));/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(S)&&(n.md_inside=!0)}return e.backUp(1),n.htmlState=t.startState(F),a(e,n,h)}if("<"===g&&e.match(/^\/\w*?>/))return n.md_inside=!1,"tag";var L=!1;if(!i.underscoresBreakWords&&"_"===g&&"_"!==e.peek()&&e.match(/(\w)/,!1)){var q=e.pos-2;if(q>=0){var M=e.string.charAt(q);"_"!==M&&M.match(/(\w)/,!1)&&(L=!0)}}if("*"===g||"_"===g&&!L)if(l&&" "===e.peek());else{if(n.strong===g&&e.eat(g)){i.highlightFormatting&&(n.formatting="strong");var p=f(n);return n.strong=!1,p}if(!n.strong&&e.eat(g))return n.strong=g,i.highlightFormatting&&(n.formatting="strong"),f(n);if(n.em===g){i.highlightFormatting&&(n.formatting="em");var p=f(n);return n.em=!1,p}if(!n.em)return n.em=g,i.highlightFormatting&&(n.formatting="em"),f(n)}else if(" "===g&&(e.eat("*")||e.eat("_"))){if(" "===e.peek())return f(n);e.backUp(1)}if(i.strikethrough)if("~"===g&&e.eatWhile(g)){if(n.strikethrough){i.highlightFormatting&&(n.formatting="strikethrough");var p=f(n);return n.strikethrough=!1,p}if(e.match(/^[^\s]/,!1))return n.strikethrough=!0,i.highlightFormatting&&(n.formatting="strikethrough"),f(n)}else if(" "===g&&e.match(/^~~/,!0)){if(" "===e.peek())return f(n);e.backUp(2)}return" "===g&&(e.match(/ +$/,!1)?n.trailingSpace++:n.trailingSpace&&(n.trailingSpaceNewLine=!0)),f(n)}function c(t,e){var n=t.next();if(">"===n){e.f=e.inline=m,i.highlightFormatting&&(e.formatting="link");var r=f(e);return r?r+=" ":r="",r+_}return t.match(/^[^>]+/,!0),_}function d(t,e){if(t.eatSpace())return null;var n=t.next();return"("===n||"["===n?(e.f=e.inline=k("("===n?")":"]"),i.highlightFormatting&&(e.formatting="link-string"),e.linkHref=!0,f(e)):"error"}function k(t){return function(e,n){var r=e.next();if(r===t){n.f=n.inline=m,i.highlightFormatting&&(n.formatting="link-string");var a=f(n);return n.linkHref=!1,a}return e.match(S(t),!0)&&e.backUp(1),n.linkHref=!0,f(n)}}function p(t,e){return t.match(/^[^\]]*\]:/,!1)?(e.f=v,t.next(),i.highlightFormatting&&(e.formatting="link"),e.linkText=!0,f(e)):r(t,e,m)}function v(t,e){if(t.match(/^\]:/,!0)){e.f=e.inline=x,i.highlightFormatting&&(e.formatting="link");var n=f(e);return e.linkText=!1,n}return t.match(/^[^\]]+/,!0),N}function x(t,e){return t.eatSpace()?null:(t.match(/^[^\s]+/,!0),void 0===t.peek()?e.linkTitle=!0:t.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),e.f=e.inline=m,O)}function S(t){return Q[t]||(t=(t+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),Q[t]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+t+")")),Q[t]}var L=t.modes.hasOwnProperty("xml"),F=t.getMode(e,L?{name:"xml",htmlMode:!0}:"text/plain");void 0===i.highlightFormatting&&(i.highlightFormatting=!1),void 0===i.maxBlockquoteDepth&&(i.maxBlockquoteDepth=0),void 0===i.underscoresBreakWords&&(i.underscoresBreakWords=!0),void 0===i.fencedCodeBlocks&&(i.fencedCodeBlocks=!1),void 0===i.taskLists&&(i.taskLists=!1),void 0===i.strikethrough&&(i.strikethrough=!1);var b=0,q="header",M="comment",w="quote",C="variable-2",D="variable-3",H="keyword",T="hr",B="tag",y="formatting",_="link",$="link",N="link",O="string",j="em",E="strong",W="tagflag",U="math",R="strikethrough",A=/^([*\-=_])(?:\s*\1){2,}\s*$/,I=/^[*\-+]\s+/,P=/^[0-9]+\.\s+/,z=/^\[(x| )\](?=\s)/,G=/^#+/,J=/^(?:\={1,}|-{1,})$/,K=/^[^#!\[\]*_\\<>` "'(~]+/,Q=[],V={startState:function(){return{f:l,prevLineHasContent:!1,thisLineHasContent:!1,block:l,htmlState:null,indentation:0,inline:m,text:u,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,em:!1,strong:!1,header:0,taskList:!1,list:!1,listDepth:0,quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1}},copyState:function(e){return{f:e.f,prevLineHasContent:e.prevLineHasContent,thisLineHasContent:e.thisLineHasContent,block:e.block,htmlState:e.htmlState&&t.copyState(F,e.htmlState),indentation:e.indentation,localMode:e.localMode,localState:e.localMode?t.copyState(e.localMode,e.localState):null,inline:e.inline,text:e.text,formatting:!1,linkTitle:e.linkTitle,em:e.em,strong:e.strong,strikethrough:e.strikethrough,header:e.header,taskList:e.taskList,list:e.list,listDepth:e.listDepth,quote:e.quote,trailingSpace:e.trailingSpace,trailingSpaceNewLine:e.trailingSpaceNewLine,md_inside:e.md_inside}},token:function(t,e){if(e.formatting=!1,t.sol()){var i=!!e.header;if(e.header=0,t.match(/^\s*$/,!0)||i)return e.prevLineHasContent=!1,o(e),i?this.token(t,e):null;e.prevLineHasContent=e.thisLineHasContent,e.thisLineHasContent=!0,e.taskList=!1,e.code=!1,e.trailingSpace=0,e.trailingSpaceNewLine=!1,e.f=e.block;var n=t.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length,r=4*Math.floor((n-e.indentation)/4);r>4&&(r=4);var a=e.indentation+r;if(e.indentationDiff=a-e.indentation,e.indentation=a,n>0)return null}return e.f(t,e)},innerMode:function(t){return t.block==h?{state:t.htmlState,mode:F}:t.localState?{state:t.localState,mode:t.localMode}:{state:t,mode:V}},blankLine:o,getType:f,fold:"markdown"};return V},"xml"),t.defineMIME("text/x-markdown","markdown")});
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../markdown/markdown"),require("../../addon/mode/overlay")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../markdown/markdown","../../addon/mode/overlay"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("gfm",function(o,n){function t(e){return e.code=!1,null}var a=0,r={startState:function(){return{code:!1,codeBlock:!1,tagFlag:!1,ateSpace:!1}},copyState:function(e){return{code:e.code,tagFlag:e.tagFlag,codeBlock:e.codeBlock,ateSpace:e.ateSpace}},token:function(e,o){if(o.combineTokens=null,o.codeBlock)return e.match(/^```/)?(o.codeBlock=!1,null):(e.skipToEnd(),null);if(e.sol()&&(o.code=!1),e.sol()&&e.match(/^```/))return e.skipToEnd(),o.codeBlock=!0,null;if(e.sol()&&e.match(/^\{\{tags:(.*)\}\}/))return e.skipToEnd(),o.tagFlag=!0,"tagflag";if(e.sol()&&e.match(/^\$\$(.*)\$\$/))return e.skipToEnd(),o.math=!0,"math";if("`"===e.peek()){e.next();var n=e.pos;e.eatWhile("`");var t=1+e.pos-n;return o.code?t===a&&(o.code=!1):(a=t,o.code=!0),null}if(o.code)return e.next(),null;if(e.eatSpace())return o.ateSpace=!0,null;if(e.sol()||o.ateSpace){if(o.ateSpace=!1,e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/))return o.combineTokens=!0,"link";if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/))return o.combineTokens=!0,"link"}return e.match(/^((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i)&&"]("!=e.string.slice(e.start-2,e.start)?(o.combineTokens=!0,"link"):(e.next(),null)},blankLine:t},c={underscoresBreakWords:!1,taskLists:!0,fencedCodeBlocks:!0,strikethrough:!0};for(var i in n)c[i]=n[i];return c.name="markdown",e.defineMIME("gfmBase",c),e.overlayMode(e.getMode(o,"gfmBase"),r)},"markdown")});
!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("javascript",function(t,r){function n(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function a(e,t,r){return vt=e,mt=r,t}function i(e,t){var r=e.next();if('"'==r||"'"==r)return t.tokenize=o(r),t.tokenize(e,t);if("."==r&&e.match(/^\d+(?:[eE][+\-]?\d+)?/))return a("number","number");if("."==r&&e.match(".."))return a("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return a(r);if("="==r&&e.eat(">"))return a("=>","operator");if("0"==r&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),a("number","number");if(/\d/.test(r))return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),a("number","number");if("/"==r)return e.eat("*")?(t.tokenize=c,c(e,t)):e.eat("/")?(e.skipToEnd(),a("comment","comment")):"operator"==t.lastType||"keyword c"==t.lastType||"sof"==t.lastType||/^[\[{}\(,;:]$/.test(t.lastType)?(n(e),e.eatWhile(/[gimy]/),a("regexp","string-2")):(e.eatWhile(jt),a("operator","operator",e.current()));if("`"==r)return t.tokenize=l,l(e,t);if("#"==r)return e.skipToEnd(),a("error","error");if(jt.test(r))return e.eatWhile(jt),a("operator","operator",e.current());if(gt.test(r)){e.eatWhile(gt);var i=e.current(),u=wt.propertyIsEnumerable(i)&&wt[i];return u&&"."!=t.lastType?a(u.type,u.style,i):a("variable","variable",i)}}function o(e){return function(t,r){var n,o=!1;if(kt&&"@"==t.peek()&&t.match(Mt))return r.tokenize=i,a("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||o);)o=!o&&"\\"==n;return o||(r.tokenize=i),a("string","string")}}function c(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=i;break}n="*"==r}return a("comment","comment")}function l(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=i;break}n=!n&&"\\"==r}return a("quasi","string-2",e.current())}function u(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(0>r)){for(var n=0,a=!1,i=r-1;i>=0;--i){var o=e.string.charAt(i),c=Vt.indexOf(o);if(c>=0&&3>c){if(!n){++i;break}if(0==--n)break}else if(c>=3&&6>c)++n;else if(gt.test(o))a=!0;else{if(/["'\/]/.test(o))return;if(a&&!n){++i;break}}}a&&!n&&(t.fatArrowAt=i)}}function s(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function f(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(var r=n.vars;r;r=r.next)if(r.name==t)return!0}function d(e,t,r,n,a){var i=e.cc;for(It.state=e,It.stream=a,It.marked=null,It.cc=i,It.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){var o=i.length?i.pop():xt?w:g;if(o(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return It.marked?It.marked:"variable"==r&&f(e,n)?"variable-2":t}}}function p(){for(var e=arguments.length-1;e>=0;e--)It.cc.push(arguments[e])}function v(){return p.apply(null,arguments),!0}function m(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}var n=It.state;if(n.context){if(It.marked="def",t(n.localVars))return;n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return;r.globalVars&&(n.globalVars={name:e,next:n.globalVars})}}function y(){It.state.context={prev:It.state.context,vars:It.state.localVars},It.state.localVars=zt}function b(){It.state.localVars=It.state.context.vars,It.state.context=It.state.context.prev}function k(e,t){var r=function(){var r=It.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new s(n,It.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function x(){var e=It.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function h(e){function t(r){return r==e?v():";"==e?p():v(t)}return t}function g(e,t){return"var"==e?v(k("vardef",t.length),F,h(";"),x):"keyword a"==e?v(k("form"),w,g,x):"keyword b"==e?v(k("form"),g,x):"{"==e?v(k("}"),U,x):";"==e?v():"if"==e?("else"==It.state.lexical.info&&It.state.cc[It.state.cc.length-1]==x&&It.state.cc.pop()(),v(k("form"),w,g,x,Q)):"function"==e?v(et):"for"==e?v(k("form"),R,g,x):"variable"==e?v(k("stat"),q):"switch"==e?v(k("form"),w,k("}","switch"),h("{"),U,x,x):"case"==e?v(w,h(":")):"default"==e?v(h(":")):"catch"==e?v(k("form"),y,h("("),tt,h(")"),g,x,b):"module"==e?v(k("form"),y,ot,b,x):"class"==e?v(k("form"),rt,x):"export"==e?v(k("form"),ct,x):"import"==e?v(k("form"),lt,x):p(k("stat"),w,h(";"),x)}function w(e){return M(e,!1)}function j(e){return M(e,!0)}function M(e,t){if(It.state.fatArrowAt==It.stream.start){var r=t?$:C;if("("==e)return v(y,k(")"),N(G,")"),x,h("=>"),r,b);if("variable"==e)return p(y,G,h("=>"),r,b)}var n=t?z:I;return Et.hasOwnProperty(e)?v(n):"function"==e?v(et,n):"keyword c"==e?v(t?E:V):"("==e?v(k(")"),V,pt,h(")"),x,n):"operator"==e||"spread"==e?v(t?j:w):"["==e?v(k("]"),ft,x,n):"{"==e?H(W,"}",null,n):"quasi"==e?p(T,n):v()}function V(e){return e.match(/[;\}\)\],]/)?p():p(w)}function E(e){return e.match(/[;\}\)\],]/)?p():p(j)}function I(e,t){return","==e?v(w):z(e,t,!1)}function z(e,t,r){var n=0==r?I:z,a=0==r?w:j;return"=>"==e?v(y,r?$:C,b):"operator"==e?/\+\+|--/.test(t)?v(n):"?"==t?v(w,h(":"),a):v(a):"quasi"==e?p(T,n):";"!=e?"("==e?H(j,")","call",n):"."==e?v(O,n):"["==e?v(k("]"),V,h("]"),x,n):void 0:void 0}function T(e,t){return"quasi"!=e?p():"${"!=t.slice(t.length-2)?v(T):v(w,A)}function A(e){return"}"==e?(It.marked="string-2",It.state.tokenize=l,v(T)):void 0}function C(e){return u(It.stream,It.state),p("{"==e?g:w)}function $(e){return u(It.stream,It.state),p("{"==e?g:j)}function q(e){return":"==e?v(x,g):p(I,h(";"),x)}function O(e){return"variable"==e?(It.marked="property",v()):void 0}function W(e,t){return"variable"==e||"keyword"==It.style?(It.marked="property",v("get"==t||"set"==t?P:S)):"number"==e||"string"==e?(It.marked=kt?"property":It.style+" property",v(S)):"jsonld-keyword"==e?v(S):"["==e?v(w,h("]"),S):void 0}function P(e){return"variable"!=e?p(S):(It.marked="property",v(et))}function S(e){return":"==e?v(j):"("==e?p(et):void 0}function N(e,t){function r(n){if(","==n){var a=It.state.lexical;return"call"==a.info&&(a.pos=(a.pos||0)+1),v(e,r)}return n==t?v():v(h(t))}return function(n){return n==t?v():p(e,r)}}function H(e,t,r){for(var n=3;n<arguments.length;n++)It.cc.push(arguments[n]);return v(k(t,r),N(e,t),x)}function U(e){return"}"==e?v():p(g,U)}function B(e){return ht&&":"==e?v(D):void 0}function D(e){return"variable"==e?(It.marked="variable-3",v()):void 0}function F(){return p(G,B,K,L)}function G(e,t){return"variable"==e?(m(t),v()):"["==e?H(G,"]"):"{"==e?H(J,"}"):void 0}function J(e,t){return"variable"!=e||It.stream.match(/^\s*:/,!1)?("variable"==e&&(It.marked="property"),v(h(":"),G,K)):(m(t),v(K))}function K(e,t){return"="==t?v(j):void 0}function L(e){return","==e?v(F):void 0}function Q(e,t){return"keyword b"==e&&"else"==t?v(k("form","else"),g,x):void 0}function R(e){return"("==e?v(k(")"),X,h(")"),x):void 0}function X(e){return"var"==e?v(F,h(";"),Z):";"==e?v(Z):"variable"==e?v(Y):p(w,h(";"),Z)}function Y(e,t){return"in"==t||"of"==t?(It.marked="keyword",v(w)):v(I,Z)}function Z(e,t){return";"==e?v(_):"in"==t||"of"==t?(It.marked="keyword",v(w)):p(w,h(";"),_)}function _(e){")"!=e&&v(w)}function et(e,t){return"*"==t?(It.marked="keyword",v(et)):"variable"==e?(m(t),v(et)):"("==e?v(y,k(")"),N(tt,")"),x,g,b):void 0}function tt(e){return"spread"==e?v(tt):p(G,B)}function rt(e,t){return"variable"==e?(m(t),v(nt)):void 0}function nt(e,t){return"extends"==t?v(w,nt):"{"==e?v(k("}"),at,x):void 0}function at(e,t){return"variable"==e||"keyword"==It.style?(It.marked="property","get"==t||"set"==t?v(it,et,at):v(et,at)):"*"==t?(It.marked="keyword",v(at)):";"==e?v(at):"}"==e?v():void 0}function it(e){return"variable"!=e?p():(It.marked="property",v())}function ot(e,t){return"string"==e?v(g):"variable"==e?(m(t),v(st)):void 0}function ct(e,t){return"*"==t?(It.marked="keyword",v(st,h(";"))):"default"==t?(It.marked="keyword",v(w,h(";"))):p(g)}function lt(e){return"string"==e?v():p(ut,st)}function ut(e,t){return"{"==e?H(ut,"}"):("variable"==e&&m(t),v())}function st(e,t){return"from"==t?(It.marked="keyword",v(w)):void 0}function ft(e){return"]"==e?v():p(j,dt)}function dt(e){return"for"==e?p(pt,h("]")):","==e?v(N(E,"]")):p(N(j,"]"))}function pt(e){return"for"==e?v(R,pt):"if"==e?v(w,pt):void 0}var vt,mt,yt=t.indentUnit,bt=r.statementIndent,kt=r.jsonld,xt=r.json||kt,ht=r.typescript,gt=r.wordCharacters||/[\w$\xa1-\uffff]/,wt=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("operator"),i={type:"atom",style:"atom"},o={"if":e("if"),"while":t,"with":t,"else":r,"do":r,"try":r,"finally":r,"return":n,"break":n,"continue":n,"new":n,"delete":n,"throw":n,"debugger":n,"var":e("var"),"const":e("var"),let:e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":a,"typeof":a,"instanceof":a,"true":i,"false":i,"null":i,undefined:i,NaN:i,Infinity:i,"this":e("this"),module:e("module"),"class":e("class"),"super":e("atom"),"yield":n,"export":e("export"),"import":e("import"),"extends":n};if(ht){var c={type:"variable",style:"variable-3"},l={"interface":e("interface"),"extends":e("extends"),constructor:e("constructor"),"public":e("public"),"private":e("private"),"protected":e("protected"),"static":e("static"),string:c,number:c,bool:c,any:c};for(var u in l)o[u]=l[u]}return o}(),jt=/[+\-*&%=<>!?|~^]/,Mt=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Vt="([{}])",Et={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},It={state:null,column:null,marked:null,cc:null},zt={name:"this",next:{name:"arguments"}};return x.lex=!0,{startState:function(e){var t={tokenize:i,lastType:"sof",cc:[],lexical:new s((e||0)-yt,0,"block",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:0};return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),u(e,t)),t.tokenize!=c&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==vt?r:(t.lastType="operator"!=vt||"++"!=mt&&"--"!=mt?vt:"incdec",d(t,r,vt,mt,e))},indent:function(t,n){if(t.tokenize==c)return e.Pass;if(t.tokenize!=i)return 0;var a=n&&n.charAt(0),o=t.lexical;if(!/^\s*else\b/.test(n))for(var l=t.cc.length-1;l>=0;--l){var u=t.cc[l];if(u==x)o=o.prev;else if(u!=Q)break}"stat"==o.type&&"}"==a&&(o=o.prev),bt&&")"==o.type&&"stat"==o.prev.type&&(o=o.prev);var s=o.type,f=a==s;return"vardef"==s?o.indented+("operator"==t.lastType||","==t.lastType?o.info+1:0):"form"==s&&"{"==a?o.indented:"form"==s?o.indented+yt:"stat"==s?o.indented+("operator"==t.lastType||","==t.lastType?bt||yt:0):"switch"!=o.info||f||0==r.doubleIndentSwitch?o.align?o.column+(f?0:1):o.indented+(f?0:yt):o.indented+(/^(?:case|default)\b/.test(n)?yt:2*yt)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:xt?null:"/*",blockCommentEnd:xt?null:"*/",lineComment:xt?null:"//",fold:"brace",helperType:xt?"json":"javascript",jsonldMode:kt,jsonMode:xt}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("xml",function(e,n){function r(t,e){function n(n){return e.tokenize=n,n(t,e)}var r=t.next();if("<"==r)return t.eat("!")?t.eat("[")?t.match("CDATA[")?n(i("atom","]]>")):null:t.match("--")?n(i("comment","-->")):t.match("DOCTYPE",!0,!0)?(t.eatWhile(/[\w\._\-]/),n(l(1))):null:t.eat("?")?(t.eatWhile(/[\w\._\-]/),e.tokenize=i("meta","?>"),"meta"):(z=t.eat("/")?"closeTag":"openTag",e.tokenize=o,"tag bracket");if("&"==r){var a;return a=t.eat("#")?t.eat("x")?t.eatWhile(/[a-fA-F\d]/)&&t.eat(";"):t.eatWhile(/[\d]/)&&t.eat(";"):t.eatWhile(/[\w\.\-:]/)&&t.eat(";"),a?"atom":"error"}return t.eatWhile(/[^&<]/),null}function o(t,e){var n=t.next();if(">"==n||"/"==n&&t.eat(">"))return e.tokenize=r,z=">"==n?"endTag":"selfcloseTag","tag bracket";if("="==n)return z="equals",null;if("<"==n){e.tokenize=r,e.state=f,e.tagName=e.tagStart=null;var o=e.tokenize(t,e);return o?o+" tag error":"tag error"}return/[\'\"]/.test(n)?(e.tokenize=a(n),e.stringStartCol=t.column(),e.tokenize(t,e)):(t.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function a(t){var e=function(e,n){for(;!e.eol();)if(e.next()==t){n.tokenize=o;break}return"string"};return e.isInAttribute=!0,e}function i(t,e){return function(n,o){for(;!n.eol();){if(n.match(e)){o.tokenize=r;break}n.next()}return t}}function l(t){return function(e,n){for(var o;null!=(o=e.next());){if("<"==o)return n.tokenize=l(t+1),n.tokenize(e,n);if(">"==o){if(1==t){n.tokenize=r;break}return n.tokenize=l(t-1),n.tokenize(e,n)}}return"meta"}}function u(t,e,n){this.prev=t.context,this.tagName=e,this.indent=t.indented,this.startOfLine=n,(T.doNotIndent.hasOwnProperty(e)||t.context&&t.context.noIndent)&&(this.noIndent=!0)}function d(t){t.context&&(t.context=t.context.prev)}function c(t,e){for(var n;;){if(!t.context)return;if(n=t.context.tagName,!T.contextGrabbers.hasOwnProperty(n)||!T.contextGrabbers[n].hasOwnProperty(e))return;d(t)}}function f(t,e,n){return"openTag"==t?(n.tagStart=e.column(),s):"closeTag"==t?m:f}function s(t,e,n){return"word"==t?(n.tagName=e.current(),N="tag",h):(N="error",s)}function m(t,e,n){if("word"==t){var r=e.current();return n.context&&n.context.tagName!=r&&T.implicitlyClosed.hasOwnProperty(n.context.tagName)&&d(n),n.context&&n.context.tagName==r?(N="tag",g):(N="tag error",p)}return N="error",p}function g(t,e,n){return"endTag"!=t?(N="error",g):(d(n),f)}function p(t,e,n){return N="error",g(t,e,n)}function h(t,e,n){if("word"==t)return N="attribute",x;if("endTag"==t||"selfcloseTag"==t){var r=n.tagName,o=n.tagStart;return n.tagName=n.tagStart=null,"selfcloseTag"==t||T.autoSelfClosers.hasOwnProperty(r)?c(n,r):(c(n,r),n.context=new u(n,r,o==n.indented)),f}return N="error",h}function x(t,e,n){return"equals"==t?b:(T.allowMissing||(N="error"),h(t,e,n))}function b(t,e,n){return"string"==t?k:"word"==t&&T.allowUnquoted?(N="string",h):(N="error",h(t,e,n))}function k(t,e,n){return"string"==t?k:h(t,e,n)}var w=e.indentUnit,v=n.multilineTagIndentFactor||1,y=n.multilineTagIndentPastTag;null==y&&(y=!0);var z,N,T=n.htmlMode?{autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0}:{autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,caseFold:!1},C=n.alignCDATA;return{startState:function(){return{tokenize:r,state:f,indented:0,tagName:null,tagStart:null,context:null}},token:function(t,e){if(!e.tagName&&t.sol()&&(e.indented=t.indentation()),t.eatSpace())return null;z=null;var n=e.tokenize(t,e);return(n||z)&&"comment"!=n&&(N=null,e.state=e.state(z||n,t,e),N&&(n="error"==N?n+" error":N)),n},indent:function(e,n,a){var i=e.context;if(e.tokenize.isInAttribute)return e.tagStart==e.indented?e.stringStartCol+1:e.indented+w;if(i&&i.noIndent)return t.Pass;if(e.tokenize!=o&&e.tokenize!=r)return a?a.match(/^(\s*)/)[0].length:0;if(e.tagName)return y?e.tagStart+e.tagName.length+2:e.tagStart+w*v;if(C&&/<!\[CDATA\[/.test(n))return 0;var l=n&&/^<(\/)?([\w_:\.-]*)/.exec(n);if(l&&l[1])for(;i;){if(i.tagName==l[2]){i=i.prev;break}if(!T.implicitlyClosed.hasOwnProperty(i.tagName))break;i=i.prev}else if(l)for(;i;){var u=T.contextGrabbers[i.tagName];if(!u||!u.hasOwnProperty(l[2]))break;i=i.prev}for(;i&&!i.startOfLine;)i=i.prev;return i?i.indent+w:0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"<!--",blockCommentEnd:"-->",configuration:n.htmlMode?"html":"xml",helperType:n.htmlMode?"html":"xml"}}),t.defineMIME("text/xml","xml"),t.defineMIME("application/xml","xml"),t.mimeModes.hasOwnProperty("text/html")||t.defineMIME("text/html",{name:"xml",htmlMode:!0})});
function update(e){var t=e.getValue();setOutput(t),clearTimeout(hashto),hashto=setTimeout(updateHash,1e3)}function setOutput(e){e=marked(e),e=e.replace(/\{\{tags:(.*)\}\}/gi,function(e,t){var o=t.replace(/(^\s*)|(\s*$)/g,"").split(/[ /|]/).join("</code><code>");return'<p class="marked_tag"><i class="iconfont">&#xe602;</i><code>'+o+"</code></p>"}),document.getElementById("out").innerHTML=e,e.replace(/\$\$(.*)\$\$/i)&&MathJax.Hub.Typeset()}function save(){var e=editor.getValue(),t=new Blob([e],{type:"text/plain"});saveBlob(t)}function saveBlob(e){var t="untitled.md";if(window.saveAs)window.saveAs(e,t);else if(navigator.saveBlob)navigator.saveBlob(e,t);else{url=URL.createObjectURL(e);var o=document.createElement("a");o.setAttribute("href",url),o.setAttribute("download",t);var a=document.createEvent("MouseEvents");a.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,0,null),o.dispatchEvent(a)}}function updateHash(){}var URL=window.URL||window.webkitURL||window.mozURL||window.msURL;navigator.saveBlob=navigator.saveBlob||navigator.msSaveBlob||navigator.mozSaveBlob||navigator.webkitSaveBlob,window.saveAs=window.saveAs||window.webkitSaveAs||window.mozSaveAs||window.msSaveAs,marked.setOptions({highlight:function(e){return hljs.highlightAuto(e).value},breaks:!0,langPrefix:"hljs "}),MathJax.Hub.config.messageStyle="none";var editor=CodeMirror.fromTextArea(document.getElementById("code"),{mode:"gfm",lineNumbers:!0,matchBrackets:!0,lineWrapping:!0,theme:"ryan-dark"});editor.on("change",function(e){update(e)}),editor.on("scroll",function(e){var t=e.getScrollInfo(),o=document.getElementById("out"),a=t.height,n=t.clientHeight,i=t.top,r=o.scrollHeight;console.log(),o.scrollTop=Math.floor(i*(r-n)/(a-n))}),document.addEventListener("drop",function(e){e.preventDefault(),e.stopPropagation();var t=e.dataTransfer.files[0],o=new FileReader;o.onload=function(e){editor.setValue(e.target.result)},o.readAsText(t)},!1),document.addEventListener("keydown",function(e){return 83==e.keyCode&&(e.ctrlKey||e.metaKey)?(e.preventDefault(),save(),!1):void 0});var hashto;if(window.location.hash){var h=window.location.hash.replace(/^#/,"");"view:"==h.slice(0,5)?(setOutput(decodeURIComponent(escape(RawDeflate.inflate(atob(h.slice(5)))))),document.body.className="view"):(editor.setValue(decodeURIComponent(escape(RawDeflate.inflate(atob(h))))),update(editor),editor.focus())}else update(editor),editor.focus();