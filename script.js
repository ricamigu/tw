var difcl=0;
var player=2;
var point1=0;
var point2=0;
var bot=0;
var jogada=0;

var pontos1 = [];
var pontos2 = [];


var tab = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

/*
var tab = [
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1],
  [1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1]
];*/

var pesos = [
	[ 120, -20,  20,   5,   5,  20, -20, 120 ],
	[ -20, -40,  -5,  -5,  -5,  -5, -40, -20 ],
	[  20,  -5,  15,   3,   3,  15,  -5,  20 ],
	[  5,   -5,   3,   3,   3,   3,  -5,   5 ],
	[  5,   -5,   3,   3,   3,   3,  -5,   5 ],
	[  20,  -5,  15,   3,   3,  15,  -5,  20 ],
	[ -20, -40,  -5,  -5,  -5,  -5, -40, -20 ],
    [ 120, -20,  20,   5,   5,  20, -20, 120 ],
];


function login() {

	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;

	
	document.getElementById('pag_inicial').style.display = 'none';  
	document.getElementById('after-login').style.display = 'block';
	document.getElementById('startgame').style.display = 'block';
	//document.getElementById('configurações').style.display = 'block';
	document.getElementById('regras').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	   /*
	  if(user === "" || pass === "")
	    window.alert("Preencha os campos");

	  if(user === "root" && pass === "root") {
	        document.getElementById('pag_inicial').style.display = "none";  
	        document.getElementById('after-login').style.display = 'block';
	    }*/
}

function home(){

	//document.getElementById('home').style.display = 'block';
	document.getElementById('regras').style.display = 'none';
	//document.getElementById('tabuleiro').style.display = 'block';
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('pontuacao').style.display = 'block';
	document.getElementById('tabuleiro').style.display = 'block';
	document.getElementById('classificacoes').style.display = 'none';
	document.getElementById('info').style.display = "none";
	document.getElementById('fim-jogo').style.display = "block";

}

function regras(){

	//document.getElementById('home').style.display = 'none';
	document.getElementById('regras').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';
	document.getElementById('info').style.display = "none";
	document.getElementById('fim-jogo').style.display = "none";

}


function classificacao(){
	document.getElementById('regras').style.display = 'none';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';
	document.getElementById('classificacoes').style.display = 'block';
	document.getElementById('info').style.display = "block";
	document.getElementById('fim-jogo').style.display = "none";

}

function logout(){
	document.getElementById('pag_inicial').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('regras').style.display = 'none';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'none';
	point1=0; point2=0;
	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;
	document.getElementById('fim-jogo').style.display = 'none';
	document.getElementById('info').style.display = "none";
	clean_board(); 	
}

function startgame() {
  //document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('startgame').style.display = 'none';
  document.getElementById('cor_peca').style.display = 'block';

}


function black(){
	bot = 1;
	player = 2;
	//document.getElementById('startgame').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca').style.display = 'none';
	//document.getElementById('configurações').style.display = 'none';
	//first_play();
	//start1v1();
	
}

function white(){
	bot = 2;
	player = 1;
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca').style.display = 'none';
	//first_play();
	//start1v1();
}

function black1(){
	//player = 2;
	//document.getElementById('startgame').style.display = 'none';
	//document.getElementById('dificuldade').style.display = 'block';
	//document.getElementById('configurações').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca1').style.display = 'none';
	bot=0;
	start1v1();
}

function white1(){
	//player = 1;
	//document.getElementById('configurações').style.display = 'none';
	//document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca1').style.display = 'none';
	bot=0;
	start1v1();
}


function start1v1(){

	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'block';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	document.getElementById('tabuleiro').style.display = "block";
	preencher();
}

function startvs() {
  	document.getElementById('startgame').style.display = 'none';
 	document.getElementById('cor_peca1').style.display = 'block';
 	document.getElementById('cor_peca').style.display = 'none';
	
}

function novo_jogo(){
	document.getElementById('fim-jogo').style.display = "none";
	clean_board();
	point1=0; point2=0;
	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;
	document.getElementById('tabuleiro').style.display = "block";
	document.getElementById('pontuacao').style.display = "block";
	document.getElementById('desiste').style.display = "block";
	preencher();
}


function dif_easy(){
	dif();
	first_play();
	start1v1();
	difcl = 1;
	preencher();
}

function dif_medium(){
	difcl = 2;
	dif();
	first_play();
	start1v1();
	difcl = 2;
	preencher();
}

function dif_hard(){
	difcl = 3;
	dif();
	first_play();
	start1v1();
	preencher();
}

function dif(){
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
}

function first_play(){

	if(jogada==0){
		if(bot==2){
			tab[3][2]=2;
			tab[3][3]=2;
			jogada=bot;
			preencher();
		}
		document.getElementById('cor_peca').style.display = 'none';
	}
}

function click_cell(linha,coluna){

	if(bot==0){

		// funcao para verificar se pode jogar
		if(pode_jogar(linha, coluna)){

			if ((player==1)){
				tab[linha][coluna] = 1;
				player=2;
				document.getElementById('turno').innerHTML="Black Turn";
			} 

			else if ((player==2)){
				tab[linha][coluna] = 2;
				player=1;
				document.getElementById('turno').innerHTML="White Turn";
			}
		}

		else window.alert("Não pode jogar nessa posição");

		preencher();

		passar();
			
		if(end_game()){

			pontos1.push(point1);
			pontos2.push(point2);
			pontuacoes();

			if(point1>point2){
				document.getElementById('alerta').innerHTML="BRANCO GANHOU";
			}
			else if(points1<points2) document.getElementById('alerta').innerHTML="PRETO GANHOU";
			else document.getElementById('alerta').innerHTML="EMPATE";
			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";

		}
	}

	else if(bot!=0 && difcl==1){

		if(pode_jogar(linha,coluna)){
			tab[linha][coluna] = player;

			//bot
			bot_easy();
			//tab[0][0] = bot;

		}
		else window.alert("Não pode jogar nessa posição");

		preencher();

		passar_bot();
			
		if(end_game_bot()){

			pontos1.push(point1);
			pontos2.push(point2);
			pontuacoes();

			if(point1>point2){
				document.getElementById('alerta').innerHTML="BRANCO GANHOU";
			}
			else if(point1<point2) document.getElementById('alerta').innerHTML="PRETO GANHOU";
			else document.getElementById('alerta').innerHTML="EMPATE";

			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";

		}
	}

	else if(bot!=0 && difcl==2){

		if(pode_jogar(linha,coluna)){
			tab[linha][coluna] = player;

			//bot
			bot_med();
			//tab[0][0] = bot;

		}
		else window.alert("Não pode jogar nessa posição");

		preencher();

		passar_bot();
			
		if(end_game_bot()){

			pontos1.push(point1);
			pontos2.push(point2);
			pontuacoes();

			if(point1>point2){
				document.getElementById('alerta').innerHTML="BRANCO GANHOU";
			}
			else if(point1<point2) document.getElementById('alerta').innerHTML="PRETO GANHOU";
			else document.getElementById('alerta').innerHTML="EMPATE";
			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
		}

	}

	else if(bot!=0 && difcl==3){

			if(pode_jogar(linha,coluna)){
				tab[linha][coluna] = player;

			//bot
			bot_hard();
			//tab[0][0] = bot;

		}

			//tab[0][0] = bot;
		else window.alert("Não pode jogar nessa posição");

		preencher();

		passar_bot();
			
		if(end_game_bot()){

			pontos1.push(point1);
			pontos2.push(point2);
			pontuacoes();

			if(point1>point2){
				document.getElementById('alerta').innerHTML="BRANCO GANHOU";
			}
			else if(point1<point2) document.getElementById('alerta').innerHTML="PRETO GANHOU";
			else document.getElementById('alerta').innerHTML="EMPATE";
			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";

		}
	}

}

function preencher() {

	for(var linha=0;linha<8;linha++){
		for(var coluna=0; coluna<8; coluna++){
			if(tab[linha][coluna]==0){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "green";
			}
			if(tab[linha][coluna]==1){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "#FFFFFF";
			}
			else if(tab[linha][coluna]==2){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "#000000";
			}
		}
	}

	if(player==1) document.getElementById('turno').innerHTML="White Turn";
	if(player==2) document.getElementById('turno').innerHTML="Black Turn";

	document.getElementById('alerta').innerHTML="";
	//pontuacoes();
}


function passar(){

	if (board_cheio()) return true;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			if(pode_jogar_bool(l,c)) return false;
		}
	}

	if(player==1) {
			player=2;
			document.getElementById('turno').innerHTML="Black Turn";
			document.getElementById('alerta').innerHTML="BRANCO PASSOU A JOGADA";
		}
		else {
			player=1;
			document.getElementById('turno').innerHTML="White Turn";
			document.getElementById('alerta').innerHTML="PRETO PASSOU A JOGADA";
		}

	return true;
}

function passar_bot(){

	if (board_cheio()) return true;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			if(pode_jogar_bool(l,c)) return false;
		}
	}

	if(player==1) {
			document.getElementById('turno').innerHTML="Black Turn";
			document.getElementById('alerta').innerHTML="BRANCO PASSOU A JOGADA";
		}
		else {
			document.getElementById('turno').innerHTML="White Turn";
			document.getElementById('alerta').innerHTML="PRETO PASSOU A JOGADA";
		}

	return true;
}

function end_game(){

	if (board_cheio()) {
		return true;
	}


	var bool1 = passar();
	var bool2 = passar();

	if(bool1 && bool2){
		return true;
	}

	return false;
}

function end_game_bot(){

	if (board_cheio()) {
		return true;
	}


	var bool1 = passar_bot();
	var bool2 = passar_bot();

	if(bool1 && bool2){
		return true;
	}

	return false;
}

function clean_board(){

tab = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

}


function board_cheio(){

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			if(tab[l][c] == 0) return false;
		}
	}
	return true;
}


function desistir(){

	if(player==1){
		tab = [
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2],
		  [2, 2, 2, 2, 2, 2, 2, 2]
		];
		preencher();
		pontuacao();
		document.getElementById('turno').innerHTML="White GIVES UP";
	}

	else {
		tab = [
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1],
		  [1, 1, 1, 1, 1, 1, 1, 1]
		];
		preencher();
		pontuacao();
		document.getElementById('turno').innerHTML="BLACK GIVES UP";
	}

	//document.getElementById('tabuleiro').style.display = "none";
	document.getElementById('fim-jogo').style.display = "block";
	pontos1.push(point1);
	pontos2.push(point2);
	pontuacoes();

}


function pontuacao(){

	point1=0;
	point2=0;

	for(var l=0;l<8;l++){
		for(var c=0;c<8;c++){
			if(tab[l][c] == 1) point1++;
			if(tab[l][c] == 2) point2++;
		}
	}

	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;

}


function pode_jogar(linha, coluna){

	if(tab[linha][coluna] != 0) return false;

	return (verificar_lados(linha,coluna) && altera_pecas(linha,coluna) );
}


// verificar se à volta da posicao existe uma peça oposta à que se quer jogar
function verificar_lados(linha,coluna){

	// condicao para dar fix a quando a posicao sai fora do tabuleiro
	var linhama1 = linha+1; if (linhama1 > 7) linhama1 = 7;
	var linhame1 = linha-1; if (linhame1 < 0) linhame1 = 0;
	var colma1 = coluna+1; if (colma1 > 7) colma1 = 7;
	var colme1 = coluna-1; if (colme1 < 0) colme1 = 0;
	
	if((player==1)){
		if( (tab[linha][colma1] == 2) || (tab[linha][colme1] == 2) || (tab[linhama1][coluna] == 2)  || (tab[linhama1][colma1] == 2) || (tab[linhama1][colme1] == 2) || (tab[linhame1][coluna] == 2) || (tab[linhame1][colma1] == 2) || (tab[linhame1][colme1] == 2))
			return true;
	}

	if((player==2)){
		if( (tab[linha][colma1] == 1) || (tab[linha][colme1] == 1) || (tab[linhama1][coluna] == 1)  || (tab[linhama1][colma1] == 1) || (tab[linhama1][colme1] == 1)  ||  (tab[linhame1][colma1] == 1) || (tab[linhame1][colme1] == 1)  || (tab[linhame1][coluna] == 1) )
			return true;
	}

	return false;

}

//verificar se existe uma peça da mesma cor para verificar se a jogada altera o tabuleiro
function altera_pecas(linha,coluna){

	var direita = alterar_direita(linha, coluna);
	var esquerda = alterar_esquerda(linha,coluna);
	var cima = alterar_cima(linha,coluna);
	var baixo = alterar_baixo(linha,coluna);
	var dsd = alterar_dsd(linha,coluna);
	var dse = alterar_dse(linha,coluna);
	var die = alterar_die(linha,coluna);
	var did = alterar_did(linha,coluna);

	return (direita || esquerda || cima || baixo || dsd || dse || die || did);

}

function alterar_direita(linha,coluna){

		if(coluna+1 > 8) return false;
		else if( tab[linha][coluna+1] == player || tab[linha][coluna+1] == 0) return false;
		var k=1;
		for(var i=coluna+2; i<8; i++){
			k++;
			if( (tab[linha][i] == player))  { trocar_pecas(linha, coluna, 1, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	return false;
}


function alterar_esquerda(linha,coluna){

	if(coluna-1<0) return false;
		else if( tab[linha][coluna-1] == player || tab[linha][coluna-1] == 0) return false;
		var k=1;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( (tab[linha][i] == player))  { trocar_pecas(linha, coluna, 2, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	return false;
}

// direcao em baixo
function alterar_cima(linha,coluna){

		if(linha+1>7) return false;
		else if(tab[linha+1][coluna] == player || tab[linha+1][coluna] == 0) return false;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == player ) { trocar_pecas(linha,coluna,3,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

function alterar_baixo(linha,coluna){

		if(linha-1<0) return false;
		else if(tab[linha-1][coluna] == player || tab[linha-1][coluna] == 0) return false;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == player ) { trocar_pecas(linha,coluna,4,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

// linha-1 , col+1
function alterar_dsd(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return false;
		else if(tab[linha-k][coluna+k] == player || tab[linha-k][coluna+k] == 0) return false;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return false;
			if( tab[i][coluna+k] == player) { trocar_pecas(linha,coluna,5,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
	}
	return false;
}

// linha-1 , col-1
function alterar_dse(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna-k<0) return false;
		else if(tab[linha-k][coluna-k] == player || tab[linha-k][coluna-k] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == player) { trocar_pecas(linha,coluna,6,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col-1
function alterar_die(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna-k<0) return false;
		else if(tab[linha+k][coluna-k] == player || tab[linha+k][coluna-k] == 0) return false;

		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == player) { trocar_pecas(linha,coluna,7,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col+1
function alterar_did(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna+k>7) return false;
		else if(tab[linha+k][coluna+k] == player || tab[linha+k][coluna+k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return false;
			if( tab[i][coluna+k] == player) { trocar_pecas(linha,coluna,8,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
	return false;
}


function trocar_pecas(linha, coluna, tp, k){

	switch(tp){
		case 1: trocar_direita(linha, coluna, k);
				break;
		case 2: trocar_esquerda(linha, coluna, k);
				break;
		case 3: trocar_cima(linha, coluna, k);
				break;
		case 4: trocar_baixo(linha, coluna, k);
				break;
		case 5: trocar_dsd(linha,coluna, k);
				break;
		case 6: trocar_dse(linha,coluna,k);
				break;
		case 7: trocar_did(linha,coluna,k);
				break;
		case 8: trocar_die(linha,coluna,k);
				break;
	}
	pontuacao();
}

function trocar_direita(linha, coluna, k){
	for(var i=0; i<k; i++){
		tab[linha][coluna+i] = player;
	}
}

function trocar_esquerda(linha, coluna, k){
	for(var i=0; i<k; i++){
		tab[linha][coluna-i] = player;
	}
}

function trocar_cima(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna] = player;
	}
}

function trocar_baixo(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna] = player;
	}
}

// linha-1 , col+1
function trocar_dsd(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna+i] = player;
	}
}

//linha-1, col-1
function trocar_dse(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna-i] = player;
	}
}

//linha+1, col-1
function trocar_did(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna-i] = player;
	}
}

//linha+1, col+1
function trocar_die(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna+i] = player;
	}
}


function pode_jogar_bool(linha, coluna){

	if(tab[linha][coluna] != 0) return false;

	return (verificar_lados(linha,coluna) && altera_pecas_bool(linha,coluna) );
}

function altera_pecas_bool(linha,coluna){
	return (alterar_direita_bool(linha, coluna) || alterar_esquerda_bool(linha,coluna) || alterar_cima_bool(linha,coluna) || alterar_baixo_bool(linha,coluna) || alterar_dsd_bool(linha,coluna) || alterar_dse_bool(linha,coluna) || alterar_die_bool(linha,coluna) || alterar_did_bool(linha,coluna));
}


function alterar_direita_bool(linha,coluna){

		if(coluna+1 > 8) return false;
		else if( tab[linha][coluna+1] == player || tab[linha][coluna+1] == 0) return false;
		var k=1;
		for(var i=coluna+2; i<8; i++){
			k++;
			if( (tab[linha][i] == player))  return true;
			if( tab[linha][i] == 0) return false;
		}
	return false;
}


function alterar_esquerda_bool(linha,coluna){

	if(coluna-1<0) return false;
		else if( tab[linha][coluna-1] == player || tab[linha][coluna-1] == 0) return false;
		var k=1;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( (tab[linha][i] == player))  return true;
			if( tab[linha][i] == 0) return false;
		}
	return false;
}

// direcao em baixo
function alterar_cima_bool(linha,coluna){

		if(linha+1>7) return false;
		else if(tab[linha+1][coluna] == player || tab[linha+1][coluna] == 0) return false;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == player ) return true;
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

function alterar_baixo_bool(linha,coluna){

		if(linha-1<0) return false;
		else if(tab[linha-1][coluna] == player || tab[linha-1][coluna] == 0) return false;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == player ) return true;
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

// linha-1 , col+1
function alterar_dsd_bool(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return false;
		else if(tab[linha-k][coluna+k] == player || tab[linha-k][coluna+k] == 0) return false;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return false;
			if( tab[i][coluna+k] == player) return true;
			if( tab[i][coluna+k] == 0) return false;
	}
	return false;
}

// linha-1 , col-1
function alterar_dse_bool(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna-k<0) return false;
		else if(tab[linha-k][coluna-k] == player || tab[linha-k][coluna-k] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == player) return true;
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col-1
function alterar_die_bool(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna-k<0) return false;
		else if(tab[linha+k][coluna-k] == player || tab[linha+k][coluna-k] == 0) return false;

		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == player) return true;
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col+1
function alterar_did_bool(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna+k>7) return false;
		else if(tab[linha+k][coluna+k] == player || tab[linha+k][coluna+k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return false;
			if( tab[i][coluna+k] == player) return true;
			if( tab[i][coluna+k] == 0) return false;
		}
	return false;
}


// ------------------------------------------------------------------------ AI -----------------------------------------------------------------------

function bot_easy(){

	var check=false;
	var li;
	var col;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			if(pode_jogar_easy(l,c)) check = true;
		}
	}

	li = Math.floor((Math.random() * 7) + 0);
	col = Math.floor((Math.random() * 7) + 0);

	if(check){
		while(!pode_jogar_easy(li,col)){
			li = Math.floor((Math.random() * 8) + 0);
			col = Math.floor((Math.random() * 8) + 0);
		}

		alterar_pecas_bot(li,col);
	}

	else {
		document.getElementById('alerta').innerHTML = "AI PASSOU A JOGADA";
	}
}


function bot_med(){

	var max=0;
	var lmax=0;
	var cmax=0;
	var cur=0;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			cur = pode_jogar_easy(l,c)
			if(cur>max){
				lmax=l;
				cmax=c;
				max=cur;
			}
		}
	}

	if(max>0){
		//tab[lmax][cmax]= bot;
		alterar_pecas_bot(lmax,cmax);

	}
	else {
		document.getElementById('alerta').innerHTML = "AI PASSOU A JOGADA";
	}

}

function bot_hard(){

	var max=-120;
	var lmax=0;
	var cmax=0;
	var cur=0;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			cur = pode_jogar_easy(l,c);
			if(cur>0 && cur+pesos[l][c]>max){
				lmax=l;
				cmax=c;
				max=cur;
			}
		}
	}

	if(max>-120){
		//tab[lmax][cmax]= bot;
		alterar_pecas_bot(lmax,cmax);

	}
	else {
		document.getElementById('alerta').innerHTML = "AI PASSOU A JOGADA";
	}

}

function pode_jogar_easy(linha, coluna){

	if(tab[linha][coluna] != 0) return 0;

	if (!(verificar_lados_easy(linha,coluna))) return 0;

	return altera_pecas_easy(linha,coluna);
}

function verificar_lados_easy(linha,coluna){

	// condicao para dar fix a quando a posicao sai fora do tabuleiro
	var linhama1 = linha+1; if (linhama1 > 7) linhama1 = 7;
	var linhame1 = linha-1; if (linhame1 < 0) linhame1 = 0;
	var colma1 = coluna+1; if (colma1 > 7) colma1 = 7;
	var colme1 = coluna-1; if (colme1 < 0) colme1 = 0;
	
	if((bot==1)){
		if( (tab[linha][colma1] == 2) || (tab[linha][colme1] == 2) || (tab[linhama1][coluna] == 2)  || (tab[linhama1][colma1] == 2) || (tab[linhama1][colme1] == 2) || (tab[linhame1][coluna] == 2) || (tab[linhame1][colma1] == 2) || (tab[linhame1][colme1] == 2))
			return true;
	}

	if((bot==2)){
		if( (tab[linha][colma1] == 1) || (tab[linha][colme1] == 1) || (tab[linhama1][coluna] == 1)  || (tab[linhama1][colma1] == 1) || (tab[linhama1][colme1] == 1)  ||  (tab[linhame1][colma1] == 1) || (tab[linhame1][colme1] == 1)  || (tab[linhame1][coluna] == 1) )
			return true;
	}

	return false;

}



function altera_pecas_easy(linha,coluna){

	var direita = alterar_direita_easy(linha, coluna);
	var esquerda = alterar_esquerda_easy(linha,coluna);
	var cima = alterar_cima_easy(linha,coluna);
	var baixo = alterar_baixo_easy(linha,coluna);
	var dsd = alterar_dsd_easy(linha,coluna);
	var dse = alterar_dse_easy(linha,coluna);
	var die = alterar_die_easy(linha,coluna);
	var did = alterar_did_easy(linha,coluna);

	return (direita + esquerda + cima + baixo + dsd + dse + die + did);

}


function alterar_direita_easy(linha,coluna){

		if(coluna+1 > 8) return 0;
		else if( tab[linha][coluna+1] == bot || tab[linha][coluna+1] == 0) return 0;
		var k=1;
		for(var i=coluna+2; i<8; i++){
			k++;
			if( (tab[linha][i] == bot))  return k;
			if( tab[linha][i] == 0) return 0;
		}
	return 0;
}


function alterar_esquerda_easy(linha,coluna){

	if(coluna-1<0) return 0;
		else if( tab[linha][coluna-1] == bot || tab[linha][coluna-1] == 0) return 0;
		var k=1;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( (tab[linha][i] == bot))  return k;
			if( tab[linha][i] == 0) return 0;
		}
	return 0;
}

// direcao em baixo
function alterar_cima_easy(linha,coluna){

		if(linha+1>7) return 0;
		else if(tab[linha+1][coluna] == bot || tab[linha+1][coluna] == 0) return 0;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == bot ) return k;
			if( tab[i][coluna] == 0) return 0;
		}
	return 0;
}

function alterar_baixo_easy(linha,coluna){

		if(linha-1<0) return 0;
		else if(tab[linha-1][coluna] == bot || tab[linha-1][coluna] == 0) return 0;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == bot ) return k;
			if( tab[i][coluna] == 0) return 0;
		}
	return 0;
}

// linha-1 , col+1
function alterar_dsd_easy(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return 0;
		else if(tab[linha-k][coluna+k] == bot || tab[linha-k][coluna+k] == 0) return 0;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return 0;
			if( tab[i][coluna+k] == bot) return k;
			if( tab[i][coluna+k] == 0) return 0;
	}
	return 0;
}

// linha-1 , col-1
function alterar_dse_easy(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna-k<0) return 0;
		else if(tab[linha-k][coluna-k] == bot || tab[linha-k][coluna-k] == 0) return 0;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k < 0) return 0;
			if( tab[i][coluna-k] == bot) return k;
			if( tab[i][coluna-k] == 0) return 0;
		}
	return 0;
}


// linha+1 , col-1
function alterar_die_easy(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna-k<0) return 0;
		else if(tab[linha+k][coluna-k] == bot || tab[linha+k][coluna-k] == 0) return 0;

		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k < 0) return 0;
			if( tab[i][coluna-k] == bot) return k;
			if( tab[i][coluna-k] == 0) return 0;
		}
	return 0;
}


// linha+1 , col+1
function alterar_did_easy(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna+k>7) return 0;
		else if(tab[linha+k][coluna+k] == bot || tab[linha+k][coluna+k] == 0) return 0;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return 0;
			if( tab[i][coluna+k] == bot) return k;
			if( tab[i][coluna+k] == 0) return 0;
		}
	return 0;
}


function alterar_pecas_bot(linha,coluna){

	var direita = alterar_direita_bot(linha, coluna);
	var esquerda = alterar_esquerda_bot(linha,coluna);
	var cima = alterar_cima_bot(linha,coluna);
	var baixo = alterar_baixo_bot(linha,coluna);
	var dsd = alterar_dsd_bot(linha,coluna);
	var dse = alterar_dse_bot(linha,coluna);
	var die = alterar_die_bot(linha,coluna);
	var did = alterar_did_bot(linha,coluna);

	return (direita || esquerda || cima || baixo || dsd || dse || die || did);

}

function alterar_direita_bot(linha,coluna){

		if(coluna+1 > 8) return false;
		else if( tab[linha][coluna+1] == bot || tab[linha][coluna+1] == 0) return false;
		var k=1;
		for(var i=coluna+2; i<8; i++){
			k++;
			if( (tab[linha][i] == bot))  { trocar_pecas_bot(linha, coluna, 1, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	return false;
}


function alterar_esquerda_bot(linha,coluna){

	if(coluna-1<0) return false;
		else if( tab[linha][coluna-1] == bot || tab[linha][coluna-1] == 0) return false;
		var k=1;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( (tab[linha][i] == bot))  { trocar_pecas_bot(linha, coluna, 2, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	return false;
}

// direcao em baixo
function alterar_cima_bot(linha,coluna){

		if(linha+1>7) return false;
		else if(tab[linha+1][coluna] == bot || tab[linha+1][coluna] == 0) return false;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == bot ) { trocar_pecas_bot(linha,coluna,3,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

function alterar_baixo_bot(linha,coluna){

		if(linha-1<0) return false;
		else if(tab[linha-1][coluna] == bot || tab[linha-1][coluna] == 0) return false;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == bot ) { trocar_pecas_bot(linha,coluna,4,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	return false;
}

// linha-1 , col+1
function alterar_dsd_bot(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return false;
		else if(tab[linha-k][coluna+k] == bot || tab[linha-k][coluna+k] == 0) return false;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return false;
			if( tab[i][coluna+k] == bot) { trocar_pecas_bot(linha,coluna,5,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
	}
	return false;
}

// linha-1 , col-1
function alterar_dse_bot(linha,coluna){

		var k=1;
		if(linha-k < 0 || coluna-k<0) return false;
		else if(tab[linha-k][coluna-k] == bot || tab[linha-k][coluna-k] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == bot) { trocar_pecas_bot(linha,coluna,6,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col-1
function alterar_die_bot(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna-k<0) return false;
		else if(tab[linha+k][coluna-k] == bot || tab[linha+k][coluna-k] == 0) return false;

		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == bot) { trocar_pecas_bot(linha,coluna,7,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	return false;
}


// linha+1 , col+1
function alterar_did_bot(linha,coluna){

		var k=1;
		if(linha+k>7 || coluna+k>7) return false;
		else if(tab[linha+k][coluna+k] == bot || tab[linha+k][coluna+k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return false;
			if( tab[i][coluna+k] == bot) { trocar_pecas_bot(linha,coluna,8,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
	return false;
}


function trocar_pecas_bot(linha, coluna, tp, k){

	switch(tp){
		case 1: trocar_direita_bot(linha, coluna, k);
				break;
		case 2: trocar_esquerda_bot(linha, coluna, k);
				break;
		case 3: trocar_cima_bot(linha, coluna, k);
				break;
		case 4: trocar_baixo_bot(linha, coluna, k);
				break;
		case 5: trocar_dsd_bot(linha,coluna, k);
				break;
		case 6: trocar_dse_bot(linha,coluna,k);
				break;
		case 7: trocar_did_bot(linha,coluna,k);
				break;
		case 8: trocar_die_bot(linha,coluna,k);
				break;
	}
	pontuacao();
}

function trocar_direita_bot(linha, coluna, k){
	for(var i=0; i<k; i++){
		tab[linha][coluna+i] = bot;
	}
}

function trocar_esquerda_bot(linha, coluna, k){
	for(var i=0; i<k; i++){
		tab[linha][coluna-i] = bot;
	}
}

function trocar_cima_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna] = bot;
	}
}

function trocar_baixo_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna] = bot;
	}
}

// linha-1 , col+1
function trocar_dsd_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna+i] = bot;
	}
}

//linha-1, col-1
function trocar_dse_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha-i][coluna-i] = bot;
	}
}

//linha+1, col-1
function trocar_did_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna-i] = bot;
	}
}

//linha+1, col+1
function trocar_die_bot(linha,coluna,k){
	for(var i=0; i<k; i++){
		tab[linha+i][coluna+i] = bot;
	}
}

function pontuacoes(){
	pontos1.sort();
	pontos2.sort();

    var table = document.getElementById("info");
    while(table.firstChild){
        table.removeChild(table.firstChild);
    }

    var line1 = document.createElement("tr");
    var col1 = document.createElement("th"); col1.innerHTML = "Nome";
    var col2 = document.createElement("th"); col2.innerHTML = "Pontos";
    line1.appendChild(col1);
    line1.appendChild(col2);
    table.appendChild(line1);

    for(var i=0; i<pontos1.length; i++){
        var lineR = document.createElement("tr");
        var colR1 = document.createElement("th");
        var colR2 = document.createElement("th");
        var lineR2 = document.createElement("tr");
        var colR3 = document.createElement("th");
        var colR4 = document.createElement("th");

        colR1.innerHTML = "White";
        colR2.innerHTML = pontos1[i];
        colR3.innerHTML = "Black";
        colR4.innerHTML = pontos2[i];

        lineR.appendChild(colR1);
        lineR.appendChild(colR2);
        lineR2.appendChild(colR3);
        lineR2.appendChild(colR4);
        table.appendChild(lineR);
        table.appendChild(lineR2);
    }
    sortTable();
}

function sortTable() {

  var table;
  var linha;
  var i, x, y;
  var troca = true;
  var deve_trocar;
  table = document.getElementById("info");

  while (troca) {
 
    troca = false;
    linha = table.rows;

    for (i = 1; i < (linha.length - 1); i++) {
      deve_trocar = false;
      x = linha[i].getElementsByTagName("th")[1];
      y = linha[i + 1].getElementsByTagName("th")[1];

      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        linha[i].parentNode.insertBefore(linha[i + 1], linha[i]);
      	troca = true;
      }
    }
  }
}