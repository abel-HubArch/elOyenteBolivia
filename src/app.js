const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')




//funciones intermedia middlewars

app.use(morgan('dev'));


//routes
app.use(require('./routes/index'))

//static files
app.use(express.static(path.join(__dirname, 'public')))


module.exports = app;