var five    = require('johnny-five')
  , fs      = require('fs')
  , express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
  , io      = require('socket.io').listen(server)
  ;

var rgb;

app.set('port', process.env.PORT || 5000);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var format = function(number) {
   if (number.toString().length < 2) {
       return '0' + number;
   }
   return number;
}

five.Board().on('ready', function() {
 var sup
   // , rgb
   , indexR = 0
   , indexG = 0
   , indexB = 0
   , idxArray = 0
   ;

 rgb = new five.Led.RGB([9, 10, 11]);
 index = 0;
});


io.on( 'connection', function ( socket ) {
	socket.on( 'meter.volume', function ( msg ) {
		var factor = Math.round( format( msg * 1.5 * 255 ) );
		console.log( 'meter.volume', factor, ' - ', msg );
		rgb.color( '#' + format( factor ) + format( factor ) + format( factor ) );
	} );
} );

var port = process.env.PORT || 5000;

server.listen(app.get('port'), function () {
	console.log( "Listening on " + app.get('port') );
});