var io=require('socket.io');
var express=require('express');
var app=express();

var server=require('http').createServer(app);
var socket=io.listen(server);
server.listen(7000);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
  //send the index.html in our public directory
  res.sendfile('index.html');
});
var users=[];
var msgs=[];
socket.on('connection',function(socket){
	//console.log('hello');
	socket.on('login',function(name){
		users.push(name);
		console.log(name);
		socket.emit('joinchat',users);
		socket.broadcast.emit('joinchat',users);


	});
	socket.on('msg',function(msg){
		msgs.push(msg);
		socket.emit('msgs',msgs);
		socket.broadcast.emit('msgs',msgs);


	});
		

	

});


