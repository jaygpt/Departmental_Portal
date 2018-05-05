const express =  require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');
//cointainer is way to get all dependencies without rewriting in every file 
container.resolve(function(users){
    
    //conneting to database that is mongodb and we will use mongoosee
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb: //localhost/departmental');
    
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
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        
        app.use(validator());
        app.use(session({
            secret: 'thisissecret',
            resave: true,
            saveInitialized: true,
            saveUninitialized: true,
            stroe: new MongoStore({mongooseConnection: mongoose.connection})
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
        
    }
});