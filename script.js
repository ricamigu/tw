var paginainicial = document.getElementById('login_page');

function login() {

	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;

	document.getElementById('pag_inicial').style.display = "none";  
	document.getElementById('after-login').style.display = 'block';
	document.getElementById('startgame').style.display = 'block';
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

}

function regras(){

	document.getElementById('home').style.display = 'none';
	document.getElementById('regras').style.display = 'block';
	
}

function classficacoes(){


}

function logout(){
	document.getElementById('pag_inicial').style.display = 'block';
	document.getElementById('after-login').style.display = 'none';
	document.getElementByIdº('regras').style.display = 'none';
	document.getElementById('startgame').style.display = 'none';
}

function startgame() {
  document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('startgame').style.display = 'none';

}

function startvs() {
  //document.getElementById('tabuleiro').style.display = 'block';
  document.getElementById('regras').style.display = 'none';
  //document.getElementById('dificuldade').style.display = 'block';
  document.getElementById('startgame').style.display = 'block'; //pq ainda nao é para fazer 
}