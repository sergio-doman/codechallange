
module.exports = function(app, parseForm, csrfProtection, routesVersioning) {
  var formsCtrl = require('./controllers/formsCtrl')();

  app.get('/api/form/token', csrfProtection, routesVersioning({
    "1.0.0": formsCtrl.tokenGenerate
  }));

  app.post('/api/form', parseForm, csrfProtection, routesVersioning({
    "1.0.0": formsCtrl.create
  }));

};
