// -------------------------------------------------- 3 parte do trabalho --------------------------------------------------

const http = require('http');
const url = require('url');
const methods = require('./methods.js');
var port = 8112;
var query;
const path = require('path');
const fs = require('fs');
const headers2 = {
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


var idGame=0;
var activePlayers=0;


//verificar tipo de ficheiro a ser transmitido
function getTypes(pathname){
    let typeContent= 'application/octet-stream'; //isto e o nosso caso de erro(nunca vai acontecer na vida real)

    let type = mediaTypes; //buscar os tipos
    for(let key in type){
        if(type.hasOwnProperty(key)){ //existe o tipo
            if(pathname.indexOf(key) > -1) //se existir o index
                typeContent= type[key]; //return do q deu
        }
    }
    return typeContent;
}

//conf.mediatype -> array tipos de media
//conf.defaultIndex -> 'index.html
//conf.documentRoot -> './'
var mediaTypes = {
    'txt':      'text/plain',
    'html':     'text/html',
    'css':      'text/css',
    'js':       'application/javascript',
    'json':     'application/json',
    'png':      'image/png',
    'jpg':      'image/jpeg'
}

const server = http.createServer(function (request, response) {

	const preq = url.parse(request.url,true);
    var pathname = preq.pathname;
    let body = '';
    console.log(request.method);

    switch(request.method) {
        case 'POST':    
            request
                .on('data', (chunk) => { body += chunk;  })
                .on('end', () => {
                    console.log(3);
                    try { 
                        query = JSON.parse(body);
                        //console.log("request method: "+pathname);
                        methods.doPost(pathname,request,response,query);
                        //console.log("request method 1");
                    }
                    catch(err) {}
                })
                .on('error', (err) => { console.log(err.message); });
            break;
        default:
        
        	//para ver se e uma request vazia
    		if(pathname==='/'){
        		pathname = 'webpage.html';
    		}
    		response.setHeader('Content-Type', getTypes(pathname));
    		fs.readFile( './' + pathname, function(error, data){
       			if(error){
            			response.writeHead(404);
            			response.end('404 - File Not Found');
        		}
        		else{
            			response.writeHead(200);
            			response.end(data);
        		}
    		});	          
		break;
    }
});

server.listen(port);
