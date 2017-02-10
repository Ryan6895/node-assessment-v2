var express = require('express');
var bodyParser = require('body-parser');

var accounts = require('./accounts.json');
var mainCtrl = require('./mainCtrl.js');
var middleware = require('./middleware.js')

var app = express()
app.use(bodyParser.json())

app.get('/api/accounts', mainCtrl.getAccounts);
app.get('/api/accounts/:Id', mainCtrl.getAccount);
app.post('/api/accounts', middleware.generateId, mainCtrl.postAccount);
app.post('/api/accounts/cardtype/:Id', mainCtrl.putCardType);
app.post('/api/accounts/approvedstates/:id', mainCtrl.putState);
app.delete('/api/accounts/approvedstates/:id', mainCtrl.deleteState);
app.delete('/api/accounts/:id', mainCtrl.deleteAccount);
app.put('/api/accounts/:id', mainCtrl.update);

const port = 3000;
app.listen(port, function() {
  console.log(`listen on port ${port}`);
})
module.exports = app;
