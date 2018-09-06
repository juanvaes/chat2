// Third party modules
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const socket = require('socket.io');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Own modules
const verifyAssistantAuth = require('./routes/assistant');
//const sendDataToAssistant = require('./routes/assistant');

// Create express app
var app = express();

// set the template engine ejs
app.set('view engine','ejs');

// Create server and define port
const port = 3000;
var server = app.listen(port, function(){
    console.log(`Listen on port ${port}`);
});

// middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Watson credentials
const username = 'b48d3d4e-98ec-40b2-b48b-e2b8454296d1';
const password = 'Xscm7HPWOvzL';
const url = 'https://gateway.watsonplatform.net/assistant/api';
const version = '2018-07-10';
const work_id = '797755a2-5ac8-4640-ac88-1e723d28731e'; 
// API Auth watson
const assistant = new AssistantV1({
    username: username,
    password: password,
    url: url,
    version: version
});
if (assistant) console.log('Credencial autenficada satisfactoriamente.');

// Listening the server
io = socket(server);

// Variables
var context = {};

/* SOCKETS */
app.get('/', (req, res) => {
    res.render('index');
});


/* ROUTES */
// connection message of a client
io.on('connection', function(socket){
    console.log('Join server...', socket.id);
    var input = '';
    socket.on('msg-client', function(data){
        // Send info to frontr
        io.sockets.emit('msg-client',data.message);
    });

    socket.on('msg-assist', function(data){
        // Send message to watson and return response
        console.log(`User -> ${data.userMsg}`);
        assistant.message({workspace_id: work_id, input: {'text': data.userMsg}, context: context},
            function(err, response) {
                if (err) {console.log('error:', err);};
                context = response.context;
                assist_response = response.output.text[0];
                console.log(`Watson -> ${assist_response}-.`);
                io.sockets.emit('msg-assist',assist_response);
            });
    })

});

function printMyContect(){
    console.log('');
}

function printMyIntent(){
    console.log('');
}
