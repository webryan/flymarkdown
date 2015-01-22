var juice = require('juice');
var fs = require('fs');

juice("./test.html", {extraCss:'body{background:red;}'},function(err, html) {
    if (err){
        console.log(err);
        return;
    }
    console.log(html);
});
