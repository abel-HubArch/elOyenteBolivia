const app = require('./app');

app.listen (app.get('port'));
console.log('server o port ', app.get('port'));
