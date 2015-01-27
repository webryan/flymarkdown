var Evernote = require('evernote').Evernote;


var client = new Evernote.Client({
  consumerKey: 'webryan',
  consumerSecret: '24fa5e95e99acd7e',
  sandbox: true 
});

client.getRequestToken('http://test.imweb.io/marktang/callback', function(error, oauthToken, oauthTokenSecret, results) {
  // store tokens in the session
  // and then redirect to client.getAuthorizeUrl(oauthToken)
    if (error){
        console.log('err');
        console.log(error);
        return;
    }
    console.log(client.getAuthorizeUrl(oauthToken));
    console.log(oauthToken);
    console.log(results);
});
