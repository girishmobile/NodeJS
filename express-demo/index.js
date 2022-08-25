const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();
app.set('view engine','pug');
app.set('views','./views'); //default 
app.use(express.json());
app.use(express.urlencoded({extended:true})); //req.body
app.use(helmet());
//supply two args 1 is path 2 is router object
app.use('/api/courses',courses); // this is a middleware
app.use('/',home)//middleware
//Configuration
console.log('Application Name:' + config.get('name'));
console.log('Mail server:' + config.get('mail.host'));
//console.log('Mail password:' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enable...');
}
//Database work
dbDebugger('Connected to the database');
//PORT
 const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listerning on port ${port}...`));
