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
}

function regras(){

	//document.getElementById('home').style.display = 'none';
	document.getElementById('regras').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
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
}

function startgame() {
  //document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('startgame').style.display = 'none';
  document.getElementById('cor_peca').style.display = 'block';


}
/*
function startvs() {
  //document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('regras').style.display = 'none';
  //document.getElementById('dificuldade').style.display = 'block';
  document.getElementById('startgame').style.display = 'block'; //pq ainda nao é para fazer 
}*/

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

function dif_easy(){
	difcl = 1;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function dif_medium(){
	difcl = 2;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function dif_hard(){
	difcl = 3;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function click_cell(linha,coluna){

	// funcao para verificar se pode jogar
	if(pode_jogar(linha, coluna)){

		if ((player==1) && (tab[linha][coluna] == 0)){
			tab[linha][coluna] = 1;
			player=2;
			document.getElementById('turno').innerHTML="Black Turn";
		} 

		else if ((player==2) && (tab[linha][coluna] == 0)){
			tab[linha][coluna] = 2;
			player=1;
			document.getElementById('turno').innerHTML="White Turn";
		}
	}

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

}


function pode_jogar(linha, coluna){


	return (verificar_lados(linha,coluna) && altera_pecas(linha,coluna) );
}


// verificar se à volta da posicao existe uma peça oposta à que se quer jogar
function verificar_lados(linha,coluna){

	// condicao para dar fix a quando a posicao sai fora do tabuleiro
	var linhama1 = linha+1; if (linhama1 > 7) linhama1 = 7;
	
	if((player==1)){
		if( (tab[linha][coluna+1] == 2) || (tab[linha][coluna-1] == 2) || (tab[linhama1][coluna] == 2)  || (tab[linhama1][coluna+1] == 2) || (tab[linhama1][coluna-1] == 2) || (tab[linha-1][coluna] == 2) || (tab[linha-1][coluna+1] == 2) || (tab[linha-1][coluna-1] == 2))
			return true;
	}

	if((player==2)){
		if( (tab[linha][coluna+1] == 1) || (tab[linha][coluna-1] == 1) || (tab[linhama1][coluna] == 1)  || (tab[linhama1][coluna+1] == 1) || (tab[linhama1][coluna-1] == 1)  ||  (tab[linha-1][coluna+1] == 1) || (tab[linha-1][coluna-1] == 1)  || (tab[linha-1][coluna] == 1) )
			return true;
	}

	return false;

}

//verificar se existe uma peça da mesma cor para verificar se a jogada altera o tabuleiro
function altera_pecas(linha,coluna){

	return (alterar_direita(linha,coluna) || alterar_esquerda(linha,coluna) || alterar_cima(linha,coluna) || alterar_baixo(linha,coluna) ) ;
}


function alterar_direita(linha,coluna){


	if(player==1){

		var encontrou=false; // verificar se ha peça oposta no meio
		if(tab[linha][coluna+1] == 2) encontrou = true;
		if(tab[linha][coluna+1] == 0) return false;
		//lado direito
		for(var i=coluna+2; i<8; i++){
			if( tab[linha][i] == 2) encontrou = true;
			if( (tab[linha][i] == 1) && encontrou ) return true;
			if( tab[linha][i] == 0) return false;
		}


	}

	else if(player==2){
		
		var encontrou=false;

		if(tab[linha][coluna+1] == 1) encontrou = true;
		if(tab[linha][coluna+1] == 0) return false;

		for(var i=coluna+2; i<8; i++){
			if( tab[linha][i] == 1) encontrou = true;
			if( (tab[linha][i] == 2)  && encontrou ) return true;
			if( tab[linha][i] == 0) return false;
		}

	}

	return false;

}

function alterar_esquerda(linha,coluna){

	

	if(player==1){

		var encontrou=false;
		if(tab[linha][coluna-1] == 2) encontrou = true;
		if(tab[linha][coluna-1] == 0) return false;

		for(var i=coluna-2; i>=0; i--){
			if( tab[linha][i] == 2) encontrou = true;
			if( tab[linha][i] == 1 && encontrou) return true;
			if( tab[linha][i] == 0) return false;
		}


	}

	else if(player==2){
		var encontrou=false;

		if(tab[linha][coluna-1] == 1) encontrou = true;
		if(tab[linha][coluna-1] == 0) return false;

		for(var i=coluna-2; i>=0; i--){
			if( tab[linha][i] == 1) encontrou = true;
			if( tab[linha][i] == 2  && encontrou) return true;
			if( tab[linha][i] == 0) return false;
		}

	}

	return false;

}

function alterar_cima(linha,coluna){

	

	if(player==1){
		var encontrou=false;

		if(tab[linha+1][coluna] == 2) encontrou = true;
		if(tab[linha+1][coluna] == 0) return false;
		//lado direito
		for(var i=linha+2; i<8; i++){
			if( tab[i][coluna] == 2) encontrou = true;
			if( tab[i][coluna] == 1 && encontrou ) return true;
			if( tab[i][coluna] == 0) return false;
		}


	}

	else if(player==2){
		
		var encontrou=false;

		if(tab[linha+1][coluna] == 1) encontrou = true;
		if(tab[linha+1][coluna] == 0) return false;

		for(var i=linha+2; i<8; i++){
			if( tab[i][coluna] == 1) encontrou = true;
			if( tab[i][coluna] == 2  && encontrou) return true;
			if( tab[i][coluna] == 0) return false;
		}

	}

	return false;

}

function alterar_baixo(linha,coluna){

	

	if(player==1){

		var encontrou=false;

		if(tab[linha-1][coluna] == 2) encontrou = true;
		if(tab[linha-1][coluna] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			if( tab[i][coluna] == 2) encontrou = true;
			if( tab[i][coluna] == 1 && encontrou) return true;
			if( tab[i][coluna] == 0) return false;
		}


	}

	else if(player==2){

		var encontrou=false;

		if(tab[linha-1][coluna] == 1) encontrou = true;
		if(tab[linha-1][coluna] == 0) return false;

		for(var i=linha-2; i>=0; i--){
			if( tab[i][coluna] == 1) encontrou = true;
			if( tab[i][coluna] == 2  && encontrou) return true;
			if( tab[i][coluna] == 0) return false;
		}

	}

	return false;
}
