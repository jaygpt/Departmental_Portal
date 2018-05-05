const express =  require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
//cointainer is way to get all dependencies without rewriting in every file 
container.resolve(function(users){
    const app = SetupExpress();
    
    //The function set up all the requred things to make our server ready
    function SetupExpress(){
        const app = express();
        //creating server
        const server = http.createServer(app);
        server.listen(3000,function(){
            console.log('listening the port 3000');
        });
        //this config will make our apps connection to front end
        Config(app);
        //routing all the webpages
        const router = require('express-promise-router')();
        //setRouting is our defined instantce which will help us to route our file
        users.SetRouting(router);
        app.use(router);
    }
    
    function Config(app){
        app.use(express.static('public'));
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        
    }
});