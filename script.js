"use strict";

// variaveis globais

var difcl=0;		// dificuldade
var player=2;		// nº do jogador -> 1 para white e 1 para black
var point1=0;		// pontos do 1º jogador
var point2=0;		// pontos do 2º jogador
var bot=0;			// nível de dificuldade do AI. 1 para fácil, 2 para médio e 3 para difícil. 0 para 1v1
var jogada=0;		// variável usada para corrigir a 1ª jogada em que é sempre o black a iniciar
var vitorias1=0;	// variável usada para guardar o nº de vitórias do jogador white
var vitorias2=0;	//    "       "     "     "    " "  "      "    do jogador black
var user;			// variável com o nome do utilizador
var passw;
// estado do tabuleiro inicial
var tab = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],	 			// 0 = posição vazia
  [0, 0, 0, 1, 2, 0, 0, 0],				// 1 = posição com uma peça branca 
  [0, 0, 0, 2, 1, 0, 0, 0],				// 2 = posição com uma peça preta
  [0, 0, 0, 0, 0, 0, 0, 0],				
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

var pesos = [
	[ 120, -20,  20,   5,   5,  20, -20, 120 ],
	[ -20, -40,  -5,  -5,  -5,  -5, -40, -20 ],
	[  20,  -5,  15,   3,   3,  15,  -5,  20 ],			// variável com pesos de cada posição do tabuleiro
	[  5,   -5,   3,   3,   3,   3,  -5,   5 ],			// tendo em conta as posições que são mais importantes
	[  5,   -5,   3,   3,   3,   3,  -5,   5 ],			// ao longo do jogo. Usado apenas no AI em difícil
	[  20,  -5,  15,   3,   3,  15,  -5,  20 ],
	[ -20, -40,  -5,  -5,  -5,  -5, -40, -20 ],
    [ 120, -20,  20,   5,   5,  20, -20, 120 ],
];

window.onload = function () { create_table() }			// usado para criar o tabuleiro de jogo

// função para verificar o login
function login() {

	user = document.getElementById("username").value;		// variáveis para guardar o utilizador
	passw = document.getElementById("password").value;	// variável para guardar a password
		
	// se o utilizador e a password não forem vazios, vai para o próximo passo
	if(user === "" || passw === "") {
		window.alert("Please enter a valid username");
	}
	else {
		register(user, passw);
		preencher();
	}
}

// função home do jogo, utilizado para ir para a área de jogo a meio do jogo, caso tenha visitado outra área (regras, classificações...)
function home(){
	document.getElementById('regras').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('pontuacao').style.display = 'block';
	document.getElementById('tabuleiro').style.display = 'block';
	document.getElementById('classificacoes').style.display = 'none';
	document.getElementById('info').style.display = "none";
	document.getElementById('fim-jogo').style.display = "block";
}

// função para mostrar as regras
function regras(){
	document.getElementById('regras').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('area_de_jogo').style.display = 'none';
	document.getElementById('tabuleiro').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'none';
	document.getElementById('info').style.display = "none";
	document.getElementById('fim-jogo').style.display = "none";
}

// função para mostrar uma tabela com as classificações dos jogadores
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

// função para fazer logout do jogo
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
	document.getElementById("score1").innerHTML = point1;		// vai colocar os pontos do jogador a 0
	document.getElementById("score2").innerHTML = point2;
	document.getElementById('fim-jogo').style.display = 'none';
	document.getElementById('info').style.display = "none";
	vitorias1=0;												// e as vitórias também...
	vitorias2=0;
	pontuacoes();												// vai atualizar a tabela no HTML
	clean_board(); 												// e colocar o tabuleiro no estado de jogo inicial
	//console.log(user,passw,jogo);
	leave(user,passw);
}

// função para mostrar o tipo de peça escolher antes do jogo começar no caso de 1vsAI
function startgame() {
  document.getElementById('startgame').style.display = 'none';
  document.getElementById('cor_peca').style.display = 'block';
}

// função para alterar a escolha no caso de 1vsAI e a opção seja jogar com Black
function black(){
	bot = 1;							
	player = 2;
	if(user=="") user = "Black"; // se não for dado nome, fica predefinido como player
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca').style.display = 'none';
}

// função para alterar a escolha no caso de 1vsAI e a opção seja jogar com White
function white(){
	bot = 2;
	player = 1;
	if(user=="") user = "White"; // se não for dado nome, fica predefinido como player
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca').style.display = 'none';
}

// função para alterar a escolha no caso de 1vs1 e a opção seja jogar com White
function black1(){
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca1').style.display = 'none';
	bot=0;
	start1v1();
}

// função para alterar a escolha no caso de 1vs1 e a opção seja jogar com White
function white1(){
	document.getElementById('dificuldade').style.display = 'block';
	document.getElementById('cor_peca1').style.display = 'none';
	bot=0;
	start1v1();
}

// função que vai finalmente mostrar a área de jogo, pronta a jogar no caso de 1v1
function start1v1(){
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'block';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
	document.getElementById('tabuleiro').style.display = "block";
	document.getElementById('desiste').style.display = "block";
	join(user,passw);
	if(color == "dark") player=1;
	else player=2;
	preencher();	// função que faz com que o tabuleiro seja visível em HTML, explicado mais à frente
}

// função para mostrar o tipo de peça escolher antes do jogo começar no caso de 1vs1
function startvs() {
  	document.getElementById('startgame').style.display = 'none';
 	document.getElementById('cor_peca1').style.display = 'block';
 	document.getElementById('cor_peca').style.display = 'none';
	
}

// função para começar um jogo novo, usada quando um jogo termina
function novo_jogo(){
	document.getElementById('fim-jogo').style.display = "none";
	clean_board();												// para isso, o tabuleiro tem que ser "limpo"
	point1=0; point2=0;											// e voltar a ter pontos = 0
	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;
	document.getElementById('tabuleiro').style.display = "block";
	document.getElementById('pontuacao').style.display = "block";
	document.getElementById('desiste').style.display = "block";
	preencher();
}

// função para definir as variáveis globais necessárias no modo fácil
function dif_easy(){
	dif();
	first_play();
	start1v1();
	difcl = 1;
	preencher();
}

// função para definir as variáveis globais necessárias no modo médio
function dif_medium(){
	difcl = 2;
	dif();
	first_play();
	start1v1();
	difcl = 2;
	preencher();
}

// função para definir as variáveis globais necessárias no modo difícil
function dif_hard(){
	difcl = 3;
	dif();
	first_play();
	start1v1();
	preencher();
}

// função para mostrar a área de jogo no caso de 1vsAI
function dif(){
	document.getElementById('area_de_jogo').style.display = 'block';
	document.getElementById('startgame').style.display = 'none';
	document.getElementById('cor_peca').style.display = 'none';
	document.getElementById('dificuldade').style.display = 'none';
	document.getElementById('menu-btn').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementById('pontuacao').style.display = 'block';
}

// função para verificar que caso seja a primeira jogada e o AI seja o black, jogar primeiro
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


// função para criar o tabuleiro dinamicamente
function create_table(){

	const tab = document.getElementById("tabuleiro");	// utiliza o div tabuleiro já existente

	for(var i=0; i<8; i++){
		var row = document.createElement("div");		// e vai as criar 8 linhas do tabuleiro
		row.className = "row";							// atribuiu a classe row já existente no CSS

		for(var j=0; j<8; j++){							
			var cell = document.createElement("div");	// cria também um elemento cell
			var piece = document.createElement("div");	// e um elemento piece
			piece.className = "piece";					// atribuiu o CSS a cada um desses elementos
			cell.className = "cell";
			cell.setAttribute("id","cell"+i+j);			// atribui um id necessário para a função onclick que está na base do jogo
			cell.setAttribute("onclick","click_cell("+i+","+j+");");	// e aqui atribui essa mesma função
			cell.appendChild(piece);					// faz "append" da classe piece à cell
			row.appendChild(cell);						// faz "append" da classe cell a cada linha
		}
		tab.appendChild(row);							// faz "append" das 8 linhas, contendo cada uma 8 cells, ao tabuleiro
	}
}

// função base do jogo. Esta função vai verificar para todas as dificuldades e no caso de 1v1 onde se quer colocar a peça e se essa jogada é possível
function click_cell(linha,coluna){

	// caso 1vs1
	if(bot==0){
		// funcao para verificar se pode jogar, explicada mais em detalhe à frente

		//console.log(user, color)

			var b = notify(user,passw,linha,coluna)=="{}";
			//console.log("1: ",b,turno);
			if(b){
				console.log("2: ",b,turno);
				console.log("ola");

				prencher();
				passar();
				pontuacao();

			}

			//else window.alert("You can't play in that position");	// alerta para avisar se a posição é inválida

		converter();

		preencher();		// depois de colocar a peça, é necessário atualizar o tabuleiro no HTML

		passar();			// verificar se o jogador tem que passar a jogada
			
		if(end_game()){		// verificar se o jogo acaba

			// verificar o caso de vitoria do 1º jogador, 2º ou empate
			if(point1>point2){
				document.getElementById('alerta').innerHTML="WHITE WINS";
				vitorias1++;
			}
			else if(point1<point2) { document.getElementById('alerta').innerHTML="BLACK WINS"; vitorias2++; }
			else document.getElementById('alerta').innerHTML="DRAW";
			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
			pontuacoes();	// atualizar as pontuações
		}
	}

	// caso do 1vsAI na dificuldade fácil
	else if(bot!=0 && difcl==1){
		if(pode_jogar(linha,coluna)){
			tab[linha][coluna] = player;
			bot_easy();							// o AI joga logo a seguir ao jogador, se for possível
		}
		else window.alert("You can't play in this position"); // alerta para avisar se a posição é inválida

		preencher(); 	// depois de colocar a peça, é necessário atualizar o tabuleiro no HTML

		passar_bot(); 	// verificar se o jogador tem que passar a jogada, mas no caso de ser contra AI
			
		if(end_game_bot()){ // verificar se o jogo acaba contra AI

			// verificar o caso de vitoria do 1º jogador, 2º ou empate
			if(point1>point2){
				if(player==1) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="WHITE WINS";
				vitorias1++;
			}
			else if(point1<point2) {
				if(player==2) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="BLACK WINS"; 
				vitorias2++;
			}
			else document.getElementById('alerta').innerHTML="DRAW";

			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
			pontuacoes();			// atualizar as pontuações no fim
		}
	}

	else if(bot!=0 && difcl==2){
		if(pode_jogar(linha,coluna)){
			tab[linha][coluna] = player;
			bot_med();				// o AI joga logo a seguir ao jogador, se for possível
		}
		else window.alert("You can't play in this position");	// alerta para avisar se a posição é inválida

		preencher();	// depois de colocar a peça, é necessário atualizar o tabuleiro no HTML

		passar_bot();	// verificar se o jogador tem que passar a jogada, mas no caso de ser contra AI

		// verificar se o jogo acaba contra AI
		if(end_game_bot()){ // verificar se o jogo acaba contra AI

			// verificar o caso de vitoria do 1º jogador, 2º ou empate
			if(point1>point2){
				if(player==1) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="WHITE WINS";
				vitorias1++;
			}
			else if(point1<point2) {
				if(player==2) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="BLACK WINS"; 
				vitorias2++;
			}
			else document.getElementById('alerta').innerHTML="DRAW";

			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
			pontuacoes();		// atualizar as pontuações no fim
		}

	}

	else if(bot!=0 && difcl==3){

			if(pode_jogar(linha,coluna)){
				tab[linha][coluna] = player;
			bot_hard();
		}
		else window.alert("You can't play in this position");	// alerta para avisar se a posição é inválida

		preencher();		// depois de colocar a peça, é necessário atualizar o tabuleiro no HTML

		passar_bot();		// verificar se o jogador tem que passar a jogada, mas no caso de ser contra AI
			
		if(end_game_bot()){ // verificar se o jogo acaba contra AI

			// verificar o caso de vitoria do 1º jogador, 2º ou empate
			if(point1>point2){
				if(player==1) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="WHITE WINS";
				vitorias1++;
			}
			else if(point1<point2) {
				if(player==2) document.getElementById('alerta').innerHTML= user + " WINS";
				else document.getElementById('alerta').innerHTML="BLACK WINS"; 
				vitorias2++;
			}
			else document.getElementById('alerta').innerHTML="DRAW";

			document.getElementById('desiste').style.display = "none";
			document.getElementById('fim-jogo').style.display = "block";
			pontuacoes();		// atualizar as pontuações no fim
		}
	}
}

// função para atualizar o tabuleiro no HTML
function preencher() {

	for(var linha=0;linha<8;linha++){
		for(var coluna=0; coluna<8; coluna++){
			if(tab[linha][coluna]==0){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "green";			// se a posição for 0, a piece fica da mesma cor do tabuleiro, parecendo que não existe
			}
			if(tab[linha][coluna]==1){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "#FFFFFF";		// se a posição for 1, fica com a peça branca
			}
			else if(tab[linha][coluna]==2){
				document.getElementById("cell"+linha+coluna).childNodes[0].style.backgroundColor = "#000000";		// se a posição for 2, fica com a peça preta
			}
		}
	}
	// atualizar a mensagem do turno
	    if(opponent==""){
	    	document.getElementById('turno').innerHTML= "Black's Turn";
	    }
		else if(turno==user) document.getElementById('turno').innerHTML= user+"'s Turn";
		else document.getElementById('turno').innerHTML= opponent +"'s Turn";

	document.getElementById('alerta').innerHTML="";
	//update();
}

// função para verificar se o jogador tem que passar a jogada
function passar(){

	if (board_cheio()) return true;	// se o tabuleiro estiver cheio, não pode jogar mais 
	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			if(pode_jogar_bool(l,c)) return false;	// verificar se existe uma posição em que ainda se pode jogar
		}											// se não pode jogar, passa a jogada ao outro jogador
	}

	if(player==1) {
			player=2;
			document.getElementById('turno').innerHTML="Black's Turn";
			document.getElementById('alerta').innerHTML="WHITE SKIPPED";
		}
		else {
			player=1;
			document.getElementById('turno').innerHTML="White's Turn";
			document.getElementById('alerta').innerHTML="BLACK SKIPPED";
		}

	return true;
}

// função para verificar se o jogador/AI tem que passar a jogada, no caso do 1vsAI
function passar_bot(){

	if (board_cheio()) return true;		// se o tabuleiro estiver cheio, não pode jogar mais 

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){			
			if(pode_jogar_bool(l,c)) return false;		// verificar se existe uma posição em que ainda se pode jogar
		}												// se não pode jogar, passa a jogada ao outro jogador
	}

	if(player==1) {
			document.getElementById('turno').innerHTML="Black's Turn";
			document.getElementById('alerta').innerHTML= user + " SKIPPED";
		}
		else {
			document.getElementById('turno').innerHTML="White's Turn";
			document.getElementById('alerta').innerHTML= user + " SKIPPED";
		}

	return true;
}

// função para verificar se o jogo acaba no caso 1vs1
function end_game(){

	if (board_cheio()) {		// verifica se o tabuleiro está cheio
		return true;			// caso esteja, acaba o jogo
	}

	var bool1 = passar();		// A função de verificar o fim do jogo consiste em chamar 2 vezes a função passar
	var bool2 = passar();		// se ambos os jogadores tiverem que passar, significa que nenhum dos dois pode 
								// jogar mais, o que significa que o jogo acabou
	if(bool1 && bool2){
		return true;
	}
	return false;
}

// função para verificar se o jogo acaba no caso 1vsAI
function end_game_bot(){

	if (board_cheio()) {			// esta função tem a mesma lógica que a anterior mas usa a função passar_bot()
		return true;
	}

	var bool1 = passar_bot();
	var bool2 = passar_bot();

	if(bool1 && bool2){
		return true;
	}
	return false;
}

// esta função dá "reset" ao tabuleiro de jogo, no caso de um novo jogo 
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

// função que verifica se o tabuleiro está cheio
function board_cheio(){

	for(var l=0; l<8; l++){							// esta função percorre o tabuleiro todo e verifica se
		for(var c=0; c<8; c++){						// existe uma posição em que ainda não está ocupada
			if(tab[l][c] == 0) return false;
		}
	}
	return true;
}

// esta função é executada quando o jogador clica no botão de desistir a meio de um jogo
function desistir(){
													// no caso de o jogador desistir, o adversário ganha 
	if(player==1){									// com o máximo de pontos (64)
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
		preencher();			// é necessário atualizar o tabuleiro no HTML
		pontuacao();			// e as pontuações também
		if(bot==0) document.getElementById('turno').innerHTML="White QUITS";
		else document.getElementById('turno').innerHTML= user +" QUITS";
		vitorias2++;
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
		if(bot==0) document.getElementById('turno').innerHTML="BLACK QUITS";
		else document.getElementById('turno').innerHTML= user + " QUITS";
		vitorias1++;
	}
	document.getElementById('fim-jogo').style.display = "block";
	document.getElementById('desiste').style.display = "none";
	pontuacoes();		// no fim atualiza a pontuação dos jogos gerais para o número de vitórias (pontuacao() e pontuacoes() são duas funções diferentes)
}

// função para atualizar e mostrar as pontuações durante o jogo
function pontuacao(){

	point1=0;
	point2=0;

	for(var l=0;l<8;l++){					// percorre o tabuleiro para verificar qual o nº de peças de cada cor
		for(var c=0;c<8;c++){
			if(tab[l][c] == 1) point1++;
			if(tab[l][c] == 2) point2++;
		}
	}
	// atualiza no HTML
	document.getElementById("score1").innerHTML = point1;
	document.getElementById("score2").innerHTML = point2;
}

// função para verificar se a jogada é válida
function pode_jogar(linha, coluna){

	if(tab[linha][coluna] != 0) return false;	// se existir uma peça já nessa posição, dá logo false

	return (verificar_lados(linha,coluna) && altera_pecas(linha,coluna) );	// nesta parte, a verificação divide-se em 2 diferentes problemas explicados à frente
}

// a primeira parte da verificação consiste em
// verificar se à volta da posição existe uma peça oposta à que se quer jogar
function verificar_lados(linha,coluna){
	// condicao para dar fix a quando a posicao sai fora do tabuleiro
	var linhama1 = linha+1; if (linhama1 > 7) linhama1 = 7;
	var linhame1 = linha-1; if (linhame1 < 0) linhame1 = 0;
	var colma1 = coluna+1; if (colma1 > 7) colma1 = 7;
	var colme1 = coluna-1; if (colme1 < 0) colme1 = 0;
	
	// se existir pelo menos uma posição à volta da posição que se quer jogar da cor oposta, dá return true
	if((player==1)){
		if( (tab[linha][colma1] == 2) || (tab[linha][colme1] == 2) || (tab[linhama1][coluna] == 2)  || (tab[linhama1][colma1] == 2) || (tab[linhama1][colme1] == 2) || (tab[linhame1][coluna] == 2) || (tab[linhame1][colma1] == 2) || (tab[linhame1][colme1] == 2))
			return true;
	}

	if((player==2)){
		if( (tab[linha][colma1] == 1) || (tab[linha][colme1] == 1) || (tab[linhama1][coluna] == 1)  || (tab[linhama1][colma1] == 1) || (tab[linhama1][colme1] == 1)  ||  (tab[linhame1][colma1] == 1) || (tab[linhame1][colme1] == 1)  || (tab[linhame1][coluna] == 1) )
			return true;
	}

	return false; // se chegar aqui é porque não existe uma peça nas redondezas da posição e retorna false

}

// a segunda parte do problema está dividida em sub-problemas também
// verificar se existe uma peça da mesma cor para verificar se a jogada altera o tabuleiro
function altera_pecas(linha,coluna){

	var direita = alterar_direita(linha, coluna);		// nesta função ficou dividido esta verificação mas
	var esquerda = alterar_esquerda(linha,coluna);		// para cada direção
	var cima = alterar_cima(linha,coluna);
	var baixo = alterar_baixo(linha,coluna);
	var dsd = alterar_dsd(linha,coluna);
	var dse = alterar_dse(linha,coluna);
	var die = alterar_die(linha,coluna);
	var did = alterar_did(linha,coluna);

	// foi necessário fazer deste modo porque no caso de um OU, se uma das condições fosse true, não iria verificar
	// mais a seguir, o que nesta implementação não iria resultar. Assim, decidimos forçar a verificação de cada
	// direção com a criação das variáveis de cima
	return (direita || esquerda || cima || baixo || dsd || dse || die || did);

}

// função para verificar as peças à direita
// todas as próximas funções funcionam seguindo o mesmo raciocínio:
// verificar se a posição imediatamente a seguir nessa direção é diferente da que se está a colocar e depois
// verificar quando existe uma peça da mesma cor, guardando o número de peças que se vai alterar e retornar true
// para além disso, é chamada a função trocar peças que vai alterar as peças necessárias na direção que foi verificada
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

// peças à esquerda
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

// direção em cima
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

// diagonal superior direita
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

// diagonal superior esquerda
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

// diagonal inferior esquerda
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

// diagonal inferior direita
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

// função que é chamada cada vez que é necessário trocar peças e vai chamar também a adequada à troca
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

// todas estas funções funcionam de modo igual mas para posições diferentes, dependendo de qual função de
// verificação foi chamada e altera o tabuleiro nessa direção verificada k vezes, sendo k um atributo passado
// pelas funções de alterar_peças()
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

// todas as próximas funções funcionam igual às explicadas anteriormente mas retornam valores Bool em vez de alterar
// o tabuleiro. Foi necessário a implementação destas funções para casos em que apenas queríamos verificar se era
// possível jogar sem alterar o tabuleiro de jogo

// função que verifica se é possível jogar, mas SEM alterar as peças caso seja possível, retornando apenas bools.
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
//  as funções a partir daqui são as usadas para definir o AI

// esta função é usada no modo fácil
function bot_easy(){

	var check=false;
	var li;
	var col;

	for(var l=0; l<8; l++){								// inicialmente é verificado se pode jogar em qualquer posição,
		for(var c=0; c<8; c++){							//  para não ocorrer um ciclo infinito neste caso, em que é utilizado
			if(pode_jogar_easy(l,c)) check = true;		// "brute force" com posições aleatórias até que seja possível.
		}												// Ao não ter esta verificação, podia ocorrer um caso de não ser
	}													// possível jogar mais mas o AI iria estar para sempre a tentar
														// encontrar uma nova posição aleatória quando já não existe nenhuma!
	// criação de posição aleatória
	li = Math.floor((Math.random() * 7) + 0);
	col = Math.floor((Math.random() * 7) + 0);

	// se existe pelo menos uma posição válida (explicado acima) então vai tentar até encontar uma posição válida
	if(check){
		while(!pode_jogar_easy(li,col)){
			li = Math.floor((Math.random() * 8) + 0);
			col = Math.floor((Math.random() * 8) + 0);
		}
		alterar_pecas_bot(li,col);	// função de alterar as peças mas para o AI
	}
	else {
		document.getElementById('alerta').innerHTML = "IA has skipped his turn"; // aviso para o caso do AI não ter jogadas possívels (check==false)
	}
}

// esta função é usada no modo médio
function bot_med(){

	var max=0;									// este modo médio é implementado usando uma heurística de 
	var lmax=0;									// encontrar a posição em que "come mais peças" e jogar aí
	var cmax=0;
	var cur=0;

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			cur = pode_jogar_easy(l,c)			//função para retornar o número de peças que são "comidas"
			if(cur>max){						
				lmax=l;							// verificação para confirmar se a posição atual tem uma
				cmax=c;							// pontuação maior tendo em conta esta heurística. Se tiver
				max=cur;						// vai atualizar a posição.
			}
		}
	}
	if(max>0){
		alterar_pecas_bot(lmax,cmax);			// no fim do ciclo, vai chegar aqui e alterar o tabuleiro
	}											// de acordo com a posição que mais peças altera
	else {
		document.getElementById('alerta').innerHTML = "IA has skipped his turn";	// se o max for = 0 signifca que não houve jogada possível e dá este aviso
	}
}

// esta função é usada no modo difícil
function bot_hard(){

	var max=-120;						// a heurística deste modo é parecida com o médio, mas tem em conta também
	var lmax=0;							// o peso de cada posição (numa matriz criada globalmente chamada "pesos")
	var cmax=0;							// assim, permite que tenha em conta o número de peças que vai alterar, mas
	var cur=0;							// também olhando para essa posição e ver se tem um bom peso

	for(var l=0; l<8; l++){
		for(var c=0; c<8; c++){
			cur = pode_jogar_easy(l,c);			// a mesma lógica mas com max inicialmente a -120 em vez de 0
			if(cur>0 && cur+pesos[l][c]>max){	
				lmax=l;
				cmax=c;
				max=cur;
			}
		}
	}
	if(max>-120){
		alterar_pecas_bot(lmax,cmax);
	}
	else {
		document.getElementById('alerta').innerHTML = "IA has skipped his turn";
	}
}

// estas funções fazem o mesmo que anteriormente para o jogador, mas para o caso dos AIs
// apesar de se chamarem "easy", funcionam para todas as dificuldades do AI e têm a mesma
// lógica que as anteriores
function pode_jogar_easy(linha, coluna){

	if(tab[linha][coluna] != 0) return 0;

	if (!(verificar_lados_easy(linha,coluna))) return 0;

	return altera_pecas_easy(linha,coluna);
}

function verificar_lados_easy(linha,coluna){

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

// função que troca as peças, igual ao caso do jogador, mas para o AI.
// têm exatamente a mesma lógica que as anteriores também
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
// função que atualiza a pontuação na tabela de classificações no HTML
function pontuacoes(){

    var table = document.getElementById("info");		// vai buscar a div que tem a tabela
    while(table.firstChild){
        table.removeChild(table.firstChild);			// remove o que lá está, porque vai ser reescrito
    }

    var line1 = document.createElement("tr");
    var col1 = document.createElement("th"); col1.innerHTML = "Name";
    var col2 = document.createElement("th"); col2.innerHTML = "Victories";
    line1.appendChild(col1);
    line1.appendChild(col2);
    table.appendChild(line1);

    var lineR = document.createElement("tr");
    var colR1 = document.createElement("th");
    var colR2 = document.createElement("th");
    var lineR2 = document.createElement("tr");
    var colR3 = document.createElement("th");
    var colR4 = document.createElement("th");

    // atualiza as vitórias para cada jogador
    if(player==1){
        colR1.innerHTML = user;
       	colR2.innerHTML = vitorias1;
        colR3.innerHTML = "Black";
        colR4.innerHTML = vitorias2;
    }

    else {
	    colR1.innerHTML = "White";
	    colR2.innerHTML = vitorias1;
	    colR3.innerHTML = user;
	    colR4.innerHTML = vitorias2;
    }
    // dá append de cada variável criada acima de acordo com a ordem necessária
    lineR.appendChild(colR1);		// append das colunas nas linhas
    lineR.appendChild(colR2);
    lineR2.appendChild(colR3);
    lineR2.appendChild(colR4);
    table.appendChild(lineR);		// append das linhas na tabela em si
    table.appendChild(lineR2);
    sortTable();					// ordenar
}

// função que vai ordenar a tabela HTML de acordo com o nº de vitórias
function sortTable() {

	var table;
	var linha;
	var i, x, y;
	var troca = true;
	var deve_trocar;
	table = document.getElementById("info");	// vai buscar a tabela que queremos ordenar

	while (troca) {		// enquanto ocorrer uma troca, vai continuar
	 
		troca = false;
	    linha = table.rows;

		for (i = 1; i < (linha.length - 1); i++) {
	    	deve_trocar = false;
	    	x = linha[i].getElementsByTagName("th")[1];
	    	y = linha[i + 1].getElementsByTagName("th")[1];

		    if (Number(x.innerHTML) < Number(y.innerHTML)) {// se o numero de vitorias estiver ordenado, troca-os
		    	linha[i].parentNode.insertBefore(linha[i + 1], linha[i]);
		    	troca = true;
		    }
	    }
	}
}
