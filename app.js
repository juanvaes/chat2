const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

// Create express app
var app = express();
app.use(bodyParser.json());

const port = 3000;

// Create server
var server = app.listen(port, function(){
    console.log(`Listen on port ${port}`);
});

// API Auth watson
const assistant = new AssistantV1({
  username: 'b48d3d4e-98ec-40b2-b48b-e2b8454296d1',
  password: 'Xscm7HPWOvzL',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-07-10',
});

// Listening the server
io = socket(server);

// set the template engine ejs
app.set('view engine','ejs');

// middlewares
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/conversation/:text*?', (req, res) => {
    const {text} = req.params;

    const params = {
        input: {text},
        workspace_id: '797755a2-5ac8-4640-ac88-1e723d28731e'
    };

    assistant.message(params, (err, response) => {
        if (err) res.status(500).json(err);
        res.json(response);
    });
});

// connection message of a client
io.on('connection', function(client){
    console.log('Join server...');
    client.on('join', function(data){
        console.log(data);
    });
});
