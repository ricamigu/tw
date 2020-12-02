// -------------------------------------------------- 2 parte do trabalho --------------------------------------------------

var url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';
var jogo;
var color;
var user;

function register(username,password){

    user = username;

    fetch(url + "register", {
        method : "POST",
        body: JSON.stringify({ nick: username, pass: password} )
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

    setTimeout(espera,1000);
    //update();
}

function espera()
{
    update();
}

//nao funciona
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
            window.alert(fresp);
        }
        else{
        	console.log(jogo);
        }
    });
    var eventSource = new EventSource(url + "update?nick=" + user + "&game=" + jogo );
    eventSource.close();
}

function notify(user,password,linha,coluna){

	var move1 = { row: linha, column: coluna }
	console.log("notify:");
	console.log(move1);

	fetch(url + "notify", {
		method: "POST",
		body: JSON.stringify({ nick: user, pass: password, game: jogo, move: move1 })
	})
	.then(function (resp) {
         htm = resp.text();
         console.log("text:" + htm);
         return htm;
    } )

    .then(function (fresp){
        //console.log(fr);
        if(fresp!="{}"){
        	//console.log(jogo);
            console.log(fresp);
            window.alert(fresp);
        }
        else{
				pode_jogar(linha,coluna);
				preencher();
	        	console.log("deu");
        }
    });

}

// tudo mal method: GET (ServerSentEvents)
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

        console.log(data);
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
        printRanking(fr.ranking);
        document.getElementById('regras').style.display = 'none';
		document.getElementById('startgame').style.display = 'none';
		document.getElementById('cor_peca').style.display = 'none';
		document.getElementById('area_de_jogo').style.display = 'none';
		document.getElementById('tabuleiro').style.display = 'none';
		document.getElementById('pontuacao').style.display = 'none';
		document.getElementById('classificacoes').style.display = 'block';
		document.getElementById('info').style.display = "block";
		document.getElementById('fim-jogo').style.display = "none";
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
