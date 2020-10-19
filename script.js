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
	var player = 2;
	//document.getElementById('startgame').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('configurações').style.display = 'none';
	
}

function white(){
	var player = 1;
	document.getElementById('configurações').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'block';
}

function dif_easy(){
	var difcl = 1;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function dif_medium(){
	var difcl = 2;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function dif_hard(){
	var difcl = 3;
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	preencher();
}

function click_cell(linha,coluna){

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