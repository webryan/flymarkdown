var juice = require('juice');
juice("./test.html", function(err, html) {
    if (err){
        console.log(err);
        return;
    }
    console.log(html);
});
