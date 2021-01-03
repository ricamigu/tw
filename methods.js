const fs   = require('fs');
const crypto = require('crypto');

var idGame=0;
var activePlayers=0;

const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'        
    },
    sse: {    
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};

module.exports.doPost = function(pathname,request,response,query){
	//console.log(query);
	//console.log(pathname);
	console.log("do post");

	switch(pathname){
        case '/register':

			console.log(query.nick);
			console.log(query.pass);

			var nick=query.nick;
			var t = query.pass;
			if(nick==undefined || nick == null || t == undefined ||	t == null ){
		    	return false;
		    }
			const crypto_pass = crypto.createHash('md5').update(t).digest('hex');
			console.log(crypto_pass);

		    var isUser = false;
		    fs.readFile('players.json',function(err,data) {
		  		if(!err) {
					var players = JSON.parse(data.toString());
					console.log(players);
					for(var i=0; i<players.length; i++){
						console.log("ciclo");
				    	if(players[i].nick==nick){
				    		console.log("if1");
				    		isUser = true;
				    		if(players[i].pass==crypto_pass){
								console.log("true_Register");
                				response.writeHead(200,headers.plain); 
                				response.write("{}");
                				response.end();
							}
							else{
				            	console.log("false_Register");
				                response.writeHead(401,headers.plain); 
				                response.write("wrong user/password");
				                response.end();
							}
				    	}
				    }
				    if(!isUser){
					    console.log("new player");
			    		let user = {nick: nick, pass: crypto_pass, games: 0 , victories: 0};
			    		players.push( user );
			    
			    		console.log(players);

			   			fs.writeFile('players.json',JSON.stringify(players),function(err){
			   				if(err){
			   					throw err;
			   				}
			   			});
			    		console.log("true_Register");
	                	response.writeHead(200,headers.plain); 
	                	response.write("{}");
	               		response.end();
	               	}
				}
			});
           	break;

        case '/ranking':
        	console.log("rank");
            fs.readFile('players.json',function(err,data) {
				if(!err) {
					var players = JSON.parse(data.toString());
					
					players.sort(function(a,b){
						return b.victories - a.victories;
					});

					let answer=[];

					for(var i=0; i<players.length ; i++){
				    	let player = {nick: players[i].nick, games: players[i].games , victories: players[i].victories};
				    	answer.push(player);
				    	if(i==9)
				    		break;
					}
		            response.writeHead(200,headers.plain); 
		            response.write(JSON.stringify(answer));
		            response.end();
				}
			});
            break;
        
        case '/join':

			var nick=query.nick;
			var pass=query.pass;

		    if(nick==undefined || nick == null || pass == undefined ||	pass == null ){
		    	return false;
		    }
		    var isUser = false;
		    fs.readFile('players.json',function(err,data) {
		  		if(!err) {
					var players = JSON.parse(data.toString());
					console.log(players);
					for(var i=0; i<players.length; i++){
						console.log("ciclo");
				    	if(players[i].nick==nick){
				    		console.log("if1");
				    		isUser = true;
				    		if(players[i].pass==pass){
								console.log("true_Register");
							}
							else{
				                response.writeHead(401,headers.plain); 
							}
				    	}
				    }
				}
			});

        	console.log("joining");
        	activePlayers++;
			var color;
			if(activePlayers==1)
				color="light";
			else 
				color="dark";
			console.log(idGame + " " + color);
			
			let joinGame = {game: idGame, color: color};
			console.log(joinGame.game);
			console.log(joinGame.color);
			console.log("active players: " + activePlayers);
			var joinAnswer=JSON.parse(joinGame);
			console.log(joinGame);
            response.writeHead(200,headers.plain);
            response.write(joinAnswer); 
            response.end();
            break; 
        
        case '/leave':
        	console.log("leaving");
			activePlayers--;
			if(activePlayers==0){
				idGame++;
			}
			answer = "{}";
        	console.log(answer);
            response.writeHead(200,headers.plain);
            response.write(answer); 
            response.end();
            break;
        
        default :
        	break;
    }
};
