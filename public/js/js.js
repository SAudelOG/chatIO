(function(){

	'use sctric';

	var socket = io('http://192.168.100.8:3000');
	var nickname = getQs('usr');
	socket.on('connect', function(){
		$('#messages').append($('<li>').text(nickname + ' se unio al chat'));
		socket.emit('join', nickname)
	});

	$('form').submit(function(){
		socket.emit('chat message', $('#m').val());
		$('#m').val('');
		
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(getQs('usr') + ': ' + msg));
	});

	function getQs(key){
		var fullQs = window.location.search.substring(1);
		var qsParamsArray = fullQs.split("&");
		for (i=0; i<qsParamsArray.length; i++){
			var strKey = qsParamsArray[i].split('=');
			if (strKey[0] == key){
				return strKey[1];
			}else{
				window.location.href='/';
			}
		}
	}
})();