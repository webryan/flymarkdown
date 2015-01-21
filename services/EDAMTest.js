var fs = require('fs');
var crypto = require('crypto');
var Evernote = require('evernote').Evernote;
var enmlOfHtmljs = require('./enmlOfHtml');
var juice = require('juice');
//
// A simple Evernote API demo script that lists all notebooks in the user's
// account and creates a simple test note in the default notebook.
//
// Before running this sample, you must fill in your Evernote developer token.
//
// To run (Unix):
//   node EDAMTest.js
//

// Real applications authenticate with Evernote using OAuth, but for the
// purpose of exploring the API, you can get a developer token that allows
// you to access your own Evernote account. To get a developer token, visit
// https://sandbox.evernote.com/api/DeveloperToken.action
var authToken = "S=s1:U=902fb:E=1524e7d6f61:C=14af6cc41c8:P=1cd:A=en-devtoken:V=2:H=718c9ef39c6a183098684afb8a018d42";

if (authToken == "your developer token") {
    console.log("Please fill in your developer token");
    console.log("To get a developer token, visit https://sandbox.evernote.com/api/DeveloperToken.action");
    process.exit(1);
}

// Initial development is performed on our sandbox server. To use the production
// service, change sandbox: false and replace your
// developer token above with a token from
// https://www.evernote.com/api/DeveloperToken.action
var client = new Evernote.Client({token: authToken, sandbox: true});

var userStore = client.getUserStore();

/**
userStore.checkVersion(
    "Evernote EDAMTest (Node.js)",
    Evernote.EDAM_VERSION_MAJOR,
    Evernote.EDAM_VERSION_MINOR,
    function(err, versionOk) {
        console.log("Is my Evernote API version up to date? " + versionOk);
        console.log();
        if (!versionOk) {
            process.exit(1);
        }
    }
);

*/

/**
var noteStore = client.getNoteStore();

// List all of the notebooks in the user's account
var notebooks = noteStore.listNotebooks(function(err, notebooks) {
    console.log("Found " + notebooks.length + " notebooks:");
    for (var i in notebooks) {
        console.log("  * " + notebooks[i].name);
    }
});
*/

// To create a new note, simply create a new Note object and fill in
// attributes such as the note's title.
var note = new Evernote.Note();
note.title = "Test note from EDAMTest.js(marktang v2)"+Math.random();
// To include an attachment such as an image in a note, first create a Resource
// for the attachment. At a minimum, the Resource contains the binary attachment
// data, an MD5 hash of the binary data, and the attachment MIME type.
// It can also include attributes such as filename and location.
/**
  var image = fs.readFileSync('enlogo.png');
  var hash = image.toString('base64');

  var data = new Evernote.Data();
  data.size = image.length;
  data.bodyHash = hash;
  data.body = image;

  resource = new Evernote.Resource();
  resource.mime = 'image/png';
  resource.data = data;

// Now, add the new Resource to the note's list of resources
note.resources = [resource];

// To display the Resource as part of the note's content, include an <en-media>
// tag in the note's ENML content. The en-media tag identifies the corresponding
// Resource using the MD5 hash.
var md5 = crypto.createHash('md5');
md5.update(image);
hashHex = md5.digest('hex');
 **/
// The content of an Evernote note is represented using Evernote Markup Language
// (ENML). The full ENML specification can be found in the Evernote API Overview
// at http://dev.evernote.com/documentation/cloud/chapters/ENML.php


//html = html.replace(/ id=".*"/ig,'');
//html = html.replace(/<p class=".*">/ig,'<p>');

juice("./test.html", function(err, html) {
    if (err){
        console.log(err);
        return;
    }
    console.log(html);
    enmlOfHtmljs.ENMLOfHTML(html,function(err,ENML){
        if (err){
            console.log(err);
            return;
        }
        note.content = ENML;

        console.log(ENML);
        return;

        noteStore.createNote(note, function(err, createdNote) {
            if (err){
                console.log('error');
                console.log(err);
                return;
            }
            console.log();
            console.log("Creating a new note in the default notebook");
            console.log();
            console.log("Successfully created a new note with GUID: " + createdNote.guid);
        });   
        /**
          note.content = '<?xml version="1.0" encoding="UTF-8"?>';
          note.content += '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">';
          note.content += '<en-note><h1 style="background:green;">asdf</h1><hr style="display: block; height: 2px; border: 0; border-top: 1px solid #aaa; border-bottom: 1px solid #eee; margin: 1em 0; padding: 0;" /><p>dddd</p>';
          note.content += '<en-media type="image/png" hash="' + hashHex + '"/>';
          note.content += '</en-note>';
          */
        //ENML = ENML.replace(/<hr>/ig,'<hr />');

    });

});

