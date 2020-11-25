// -------------------------------------------------- 2 parte do trabalho --------------------------------------------------

var url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';
var jogo;
var color;


function register(user,password){

    fetch(url + "register", {
        method : "POST",
        body: JSON.stringify({ nick: user, pass: password} )
    })
    .then(function (resp) { return resp.text();} )
    .then(function (fresp){
        //console.log(fr);
        if(fresp!="{}"){
            window.alert(fresp);
        }
        else{
        	document.getElementById('pag_inicial').style.display = 'none';  
			document.getElementById('after-login').style.display = 'block';
			document.getElementById('startgame').style.display = 'block';
			document.getElementById('regras').style.display = 'none';
			document.getElementById('cor_peca').style.display = 'none';
			pontuacoes(); 
        }
    });
} 

function join(user,password){

	fetch(url + "join", {
		method: "POST",
		body: JSON.stringify({ group: 12, nick: user, pass: password})
	})
	.then(function(resp) { return resp.json();})
	.then(function(fresp){ 
		jogo = fresp.game;
		color = fresp.color;
		console.log(jogo,color);
	});
}

//nao funciona
function leave(user,password){

	fetch(url + "leave", {
		method: "POST",
		body: JSON.stringify({ nick: user, pass: password, game: jogo})
	})
	.then(function (resp) { return resp.text();} )
    .then(function (fresp){
        //console.log(fr);
        if(fresp!="{}"){
            window.alert(fresp);
        }
        else{
        	logout();
        }
    });
}

/*
function update(){

	fetch(url + "update", { 
		method: "GET"
	})
	.then(function(resp) { return resp.json();})
	.then(function(fresp) { 
			fresp.board = tab;
	});
}*/