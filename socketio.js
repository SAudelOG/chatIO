var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/welcome.html')
});

app.get('/chatroom', function(req, res){
	//res.send('<h1>Hellow world!</h1>');
	res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
	/*console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});*/
	socket.on('welcome chat', function(usr){
		console.log('usuario: ' + usr);
		io.emit('welcome chat', usr);
	});
	socket.on('chat message', function(msg){
		try{
			io.emit('chat message', msg);
			console.log('message: ' + msg);
		}
		catch(err){
			console.log('Error');
		}
		
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});