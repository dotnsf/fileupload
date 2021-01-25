//. app.js

var express = require( 'express' ),
    multer = require( 'multer' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' ),
    app = express();

app.use( multer( { dest: './tmp/' } ).single( 'file' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.json() );
app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );


app.get( '/test', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  res.write( JSON.stringify( { status: true, body: 'OK.' }, null, 2 ) );
  res.end();
});


app.post( '/upload', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var imgpath = req.file.path;
  //var imgtype = req.file.mimetype;
  //var imgsize = req.file.size;
  //var ext = imgtype.split( "/" )[1];
  //var imgfilename = req.file.filename;
  //var filename = req.file.originalname;

  fs.unlink( imgpath, function( err ){} );

  res.write( JSON.stringify( { status: true, file: req.file }, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
