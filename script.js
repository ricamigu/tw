var paginainicial = document.getElementById('login_page');
var difcl;
var player=1;

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

function login() {

	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;

	
	document.getElementById('pag_inicial').style.display = 'none';  
	document.getElementById('after-login').style.display = 'block';
	document.getElementById('startgame').style.display = 'block';
	document.getElementById('configurações').style.display = 'block';
	document.getElementById('regras').style.display = 'none';
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
}

function regras(){

	//document.getElementById('home').style.display = 'none';
	document.getElementById('regras').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';

}

function classficacoes(){


}

function logout(){
	document.getElementById('pag_inicial').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('regras').style.display = 'none';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'none';
}

function startgame() {
  //document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('startgame').style.display = 'none';
  document.getElementById('cor_peca').style.display = 'block';


}


function black(){
	player = 2;
	//document.getElementById('startgame').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('configurações').style.display = 'none';
	
}

function white(){
	player = 1;
	document.getElementById('configurações').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
}

function black1(){
	player = 2;
	//document.getElementById('startgame').style.display = 'none';
	//document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('configurações').style.display = 'none';
	start1v1();
}

function white1(){
	player = 1;
	document.getElementById('configurações').style.display = 'none';
	//document.getElementById('dificuldade').style.display = 'block';
	start1v1();
}


function start1v1(){
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	preencher();
}

function startvs() {
  	document.getElementById('startgame').style.display = 'none';
 	document.getElementById('cor_peca1').style.display = 'block';
	
}


function dif_easy(){
	difcl = 1;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	preencher();
}

function dif_medium(){
	difcl = 2;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	preencher();
}

function dif_hard(){
	difcl = 3;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	preencher();
}

function click_cell(linha,coluna){

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

		trocar_pecas(linha,coluna);
	}

	else window.alert("Não pode jogar nessa posição");

	preencher();

}

function preencher() {

	for(var linha=0;linha<8;linha++){
		for(var coluna=0; coluna<8; coluna++){
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
}

function pontuacao(){

	var point1=0;
	var point2=0;

	for(var l=0;l<8;l++){
		for(var c=0;c<8;c++){
			if(tab[l][c] == 1) point1++;
			if(tab[l][c] == 2) point2++;
		}
	}

	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;

	/*
	document.getElementById('pontuacao').childNodes[0].innerHTML = point1;
	document.getElementById('pontuacao').childNodes[1].innerHTML = point2;
	*/
}


function pode_jogar(linha, coluna){


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
		if( (tab[linha][colma1] == 1) || (tab[linha][colme1] == 1) || (tab[linhama1][coluna] == 1)  || (tab[linhama1][colma1] == 1) || (tab[linhama1][colme1] == 1)  ||  (tab[linhame1][colma1] == 1) || (tab[linhame1][colma1] == 1)  || (tab[linhame1][coluna] == 1) )
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


	if(player==1){

		if(coluna+1 > 8) return false;
		else if( tab[linha][coluna+1] == 1 || tab[linha][coluna+1] == 0) return false;
		var k=1;
		for(var i=coluna+2; i<8; i++){
			k++;
			if( (tab[linha][i] == 1))  { trocar_pecas(linha, coluna, 1, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	}

	else if(player==2){
		
		var k=1;
		if(coluna+1 > 8) return false;
		else if( tab[linha][coluna+1] == 2 || tab[linha][coluna+1] == 0) return false;
		for(var i=coluna+2; i<8; i++){
			k++;
			if((tab[linha][i] == 2)) { trocar_pecas(linha, coluna, 1, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	}
	return false;
}


function alterar_esquerda(linha,coluna){

	if(player==1){
		if(coluna-1<0) return false;
		else if( tab[linha][coluna-1] == 1 || tab[linha][coluna-1] == 0) return false;
		var k=1;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( (tab[linha][i] == 1))  { trocar_pecas(linha, coluna, 2, k); return true; }
			if( tab[linha][i] == 0) return false;
		}
	}

	else if(player==2){
		
		var k=1;
		if(coluna-1<0) return false;
		else if( tab[linha][coluna-1] == 2 || tab[linha][coluna-1] == 0) return false;
		for(var i=coluna-2; i>=0; i--){
			k++;
			if( tab[linha][i] == 2 ) { trocar_pecas(linha, coluna, 2, k); return true; }
			if( tab[linha][i] == 0 ) return false;
		}
	}
	return false;
}


function alterar_cima(linha,coluna){

	if(player==1){

		if(linha+1>7) return false;
		else if(tab[linha+1][coluna] == 1 || tab[linha+1][coluna] == 0) return false;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == 1 ) { trocar_pecas(linha,coluna,3,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	}

	else if(player==2){
		
		if(linha+1>7) return false;
		else if(tab[linha+1][coluna] == 2 || tab[linha+1][coluna] == 0) return false;
		var k=1;
		for(var i=linha+2; i<8; i++){
			k++;
			if( tab[i][coluna] == 2) { trocar_pecas(linha,coluna,3,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	}
	return false;
}

function alterar_baixo(linha,coluna){


	if(player==1){

		if(linha-1<0) return false;
		else if(tab[linha-1][coluna] == 1 || tab[linha-1][coluna] == 0) return false;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == 1 ) { trocar_pecas(linha,coluna,4,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	}

	else if(player==2){
		
		if(linha-1<0) return false;
		else if(tab[linha-1][coluna] == 2 || tab[linha-1][coluna] == 0) return false;
		var k=1;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( tab[i][coluna] == 2) { trocar_pecas(linha,coluna,4,k); return true; }
			if( tab[i][coluna] == 0) return false;
		}
	}
	return false;
}

// linha-1 , col+1
function alterar_dsd(linha,coluna){

	if(player==1){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return false;
		else if(tab[linha-k][coluna+k] == 1 || tab[linha-k][coluna+k] == 0) return false;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return false;
			if( tab[i][coluna+k] == 1) { trocar_pecas(linha,coluna,5,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
	}

	if(player==2){

		var k=1;
		if(linha-k < 0 || coluna+k>7) return false; 
		else if(tab[linha-k][coluna+k] == 2 || tab[linha-k][coluna+k] == 0) return false;
		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna+k > 7) return false;
			if( tab[i][coluna+k] == 2) {trocar_pecas(linha,coluna,5,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
	}
	return false;
}

// linha-1 , col-1
function alterar_dse(linha,coluna){

	
	if(player==1){
		var k=1;
		if(linha-k < 0 || coluna-k<0) return false;
		else if(tab[linha-k][coluna-k] == 1 || tab[linha-k][coluna-k] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == 1) { trocar_pecas(linha,coluna,6,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	}

	if(player==2){

		var k=1;
		if(linha-k < 0 || coluna-k<0) return false; 
		else if(tab[linha-k][coluna-k] == 2 || tab[linha-k][coluna-k] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			k++;
			if( coluna-k <0) return false;
			if( tab[i][coluna-k] == 2) {trocar_pecas(linha,coluna,6,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	}
	return false;
}


// linha+1 , col-1
function alterar_die(linha,coluna){

	
	if(player==1){
		var k=1;
		if(linha+k>7 || coluna-k<0) return false;
		else if(tab[linha+k][coluna-k] == 1 || tab[linha+k][coluna-k] == 0) return false;

		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k < 0) return false;
			if( tab[i][coluna-k] == 1) { trocar_pecas(linha,coluna,7,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	}

	if(player==2){

		var k=1;
		if(linha+k>7 || coluna-k<0) return false; 
		else if(tab[linha+k][coluna-k] == 2 || tab[linha+k][coluna-k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna-k <0) return false;
			if( tab[i][coluna-k] == 2) {trocar_pecas(linha,coluna,7,k); return true;}
			if( tab[i][coluna-k] == 0) return false;
		}
	}
	return false;
}


// linha+1 , col+1
function alterar_did(linha,coluna){

	
	if(player==1){
		var k=1;
		if(linha+k>7 || coluna+k>7) return false;
		else if(tab[linha+k][coluna+k] == 1 || tab[linha+k][coluna+k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return false;
			if( tab[i][coluna+k] == 1) { trocar_pecas(linha,coluna,8,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
	}

	if(player==2){

		var k=1;
		if(linha+k>7 || coluna+k>7) return false; 
		else if(tab[linha+k][coluna+k] == 2 || tab[linha+k][coluna+k] == 0) return false;
		for(var i=linha+2; i<8; i++){
			k++;
			if( coluna+k>7) return false;
			if( tab[i][coluna+k] == 2) {trocar_pecas(linha,coluna,8,k); return true;}
			if( tab[i][coluna+k] == 0) return false;
		}
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

	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha][coluna+i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha][coluna+i] = 2;
		}
	}
}

function trocar_esquerda(linha, coluna, k){

	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha][coluna-i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha][coluna-i] = 2;
		}
	}
}

function trocar_cima(linha,coluna,k){

	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna] = 2;
		}
	}
}

function trocar_baixo(linha,coluna,k){

	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna] = 2;
		}
	}
}

// linha-1 , col+1
function trocar_dsd(linha,coluna,k){
	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna+i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna+i] = 2;
		}
	}
}

//linha-1, col-1
function trocar_dse(linha,coluna,k){
	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna-i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha-i][coluna-i] = 2;
		}
	}
}

//linha+1, col-1
function trocar_did(linha,coluna,k){
	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna-i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna-i] = 2;
		}
	}
}

//linha+1, col+1
function trocar_die(linha,coluna,k){
	if(player==1){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna+i] = 1;
		}
	}

	if(player==2){
		for(var i=0; i<k; i++){
			tab[linha+i][coluna+i] = 2;
		}
	}
}