// -------------------------------------------------- 2 parte do trabalho --------------------------------------------------

//var url = 'http://localhost:8112/';
var url = 'http://twserver.alunos.dcc.fc.up.pt:8112/';

var jogo;
var color;
var user;
var turno;
var opponent="";
var pointsB=0;
var pointsL=0;
var time;
var alerta;


var tabP = [
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], 			// 0 = posição vazia
  ["empty", "empty", "empty", "light", "dark" , "empty", "empty", "empty"],				// 1 = posição com uma peça branca 
  ["empty", "empty", "empty", "dark" , "light", "empty", "empty", "empty"],				// 2 = posição com uma peça preta
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],			
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
];

function register(username,password){

    user = username;
    console.log(0);
    console.log(url);

    fetch(url + "register", {
        method : "POST",
        body: JSON.stringify({ nick: username, pass: password} )
    })
    .then(function (resp) { 
        console.log(1);
        console.log(resp);
        return resp.text();
    } )
    .then(function (fresp){
        console.log(2);
        //console.log(fresp);
        if(fresp!="{}"){
            console.log(22);
            console.log(fresp);
        	alerta = fresp.replace('"error":','');
        	alerta = alerta.replace('{',''); alerta = alerta.replace('}','');
        	alerta = alerta.replace('"',''); alerta = alerta.replace('"','');
        	document.getElementById('alerta').innerHTML=alerta;
            //window.alert(fresp);
        }
        else{
            console.log(3);
        	document.getElementById('pag_inicial').style.display = 'none';  
			document.getElementById('after-login').style.display = 'block';
			document.getElementById('startgame').style.display = 'block';
			document.getElementById('regras').style.display = 'none';
			document.getElementById('cor_peca').style.display = 'none';
			pontuacoes(); 
        }
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });


    console.log(9);
} 

function join(user,password){

	fetch(url + "join", {
		method: "POST",
		body: JSON.stringify({ group: 12, nick: user, pass: password})
	})
	.then(function(resp) { 
        htm=resp.json();
        console.log("join.1:");
        console.log(htm);
        return htm;})
	.then(function(fresp){ 
		jogo = fresp.game;
		color = fresp.color;
        console.log("join.2:");
        console.log(fresp);
		console.log(jogo,color);
	});

    //setTimeout(espera,500);
    //update();
}

function espera()
{
    update();
}

function leave(user,password){

console.log("logout:");
console.log({ nick: user, pass: password, game: jogo});

	fetch(url + "leave", {
		method: "POST",
		body: JSON.stringify({ nick: user, pass: password, game: jogo})
	})
	.then(function (resp) { return resp.text();} )
    .then(function (fresp){
        //console.log(fr);
        if(fresp!="{}"){
        	//console.log(jogo);
            //window.alert(fresp);
            alert = fresp.replace('"error":','');
            alert = alert.replace('{',''); alert = alert.replace('}','');
            alert = alert.replace('"',''); alert = alert.replace('"','');
        	document.getElementById('alerta').innerHTML=alert;
        }
        else{
        	console.log(jogo);
        }
    });
   // var eventSource = new EventSource(url + "update?nick=" + user + "&game=" + jogo );
   // eventSource.close();
}

function notify(user,password,linha,coluna){

	var move1;
	if(linha==null && coluna==null) move1=null;
	else move1 = { row: linha, column: coluna }

	console.log("notify:");
	console.log(move1);

		fetch(url + "notify", {
		method: "POST",
		body: JSON.stringify({ nick: user, pass: password, game: jogo, move: move1 })
	})
	.then(function (resp) {
         htm = resp.text();
         //console.log("text:" + htm);
         return htm;
    } )

    .then(function (fresp){
        //console.log(fr);
        if(fresp!="{}"){
        	//console.log(jogo);
            console.log(fresp);
            //window.alert(fresp);
           alert = fresp.replace('"error":','');
           alert = alert.replace('{',''); alert = alert.replace('}','');
           alert = alert.replace('"',''); alert = alert.replace('"','');
        	document.getElementById('alerta').innerHTML=alert;
        }
        else{
        	//tabP = fresp.board;
			if(linha!=null || coluna!=null) {
				pode_jogar(linha,coluna);
				preencher();
				pontuacao();
				converter();
			}
        }
    });	

}


function update(){

	var data = { game: jogo, nick: user }; 
	console.log("update();");

	var eventSource = new EventSource(url + "update?nick=" + user + "&game=" + jogo );

	eventSource.onopen = function(e){
		console.log("connected");
	}

	//eventSource.addEventListener('message', function(e){
	//	console.log(e.data)
	//});

	eventSource.onmessage = function(e){
    	data = JSON.parse(e.data);
    	if(data!=undefined){
	    	tabP = data.board;
	    	turno = data.turn;
	    	pointsB = data.count.dark;
	    	pointsL = data.count.light;
	    	pontuacoesONLINE();
	    	//time = setTimeout(leave(user,passw),120000);
	    }

	    if(opponent=="" && turno!=user) {opponent = turno;} //console.log(opponent);}

	    if(data.skip==true) click_cell(null,null);

	    console.log(data);
        converter();

	    if(data.winner!=null){
		    //document.getElementById('turno').innerHTML=data.winner+" WINS";
		    document.getElementById('msg').innerHTML=data.winner+" WINS";
		    document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
	    }
	   

        //console.log(tabP);
        //clearTimeout(time);
 	};

 	//eventSource.close();
}

function ranking(){

    fetch(url + "ranking", {
        method : "POST",
        body: JSON.stringify("")
    })
    .then(function (r){
        return r.json();
    })
    .then(function (fr){
        printRanking(fr);
    });

}

function printRanking(ranks){

    var table = document.getElementById("info");

    while(table.firstChild){
        table.removeChild(table.firstChild);
    }

    var line = document.createElement("tr");
    var col1 = document.createElement("th");
    var col2 = document.createElement("th");
    var col3 = document.createElement("th");

    col1.innerHTML = "Username";
    col2.innerHTML = "Wins";
    col3.innerHTML = "Games";

    line.appendChild(col1);
    line.appendChild(col2);
    line.appendChild(col3);
    table.appendChild(line);

    for(var i=0; i<ranks.length; i++){

        var line1 = document.createElement("tr");
        var col11 = document.createElement("th");
        var col12 = document.createElement("th");
        var col13 = document.createElement("th");

        col11.innerHTML = ranks[i].nick;
        col12.innerHTML = ranks[i].victories;
        col13.innerHTML = ranks[i].games;
        line1.appendChild(col11);
        line1.appendChild(col12);
        line1.appendChild(col13);
        table.appendChild(line1);

    }
}


function converter(){

	for(var i=0; i<8; i++){
		for(var j=0; j<8; j++){
			if(tabP[i][j] == "empty") tab[i][j] = 0;
			if(tabP[i][j] == "light") tab[i][j] = 1;
			if(tabP[i][j] == "dark")  tab[i][j] = 2;
		}
	}

	preencher();
	//console.log(tab);
	//console.log(tabP);
}


//funcao de pontuacoes
function pontuacoesONLINE(){

	//console.log(pointsB,pointsL);
	document.getElementById("score1").innerHTML = pointsL;
	document.getElementById("score2").innerHTML = pointsB;

}

function reset_boardP(){

	tabP = [
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"], 			// 0 = posição vazia
	  ["empty", "empty", "empty", "light", "dark" , "empty", "empty", "empty"],				// 1 = posição com uma peça branca 
	  ["empty", "empty", "empty", "dark" , "light", "empty", "empty", "empty"],				// 2 = posição com uma peça preta
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],			
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
	  ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"]
	];
	converter();
}