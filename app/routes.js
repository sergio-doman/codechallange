
module.exports = function(app, csrfProtection, routesVersioning) {
  var formsCtrl = require('./controllers/formsCtrl')();

  app.get('/api/form/token', csrfProtection, routesVersioning({
    "1.0.0": formsCtrl.tokenGenerate
  }));

  app.post('/api/form', csrfProtection, routesVersioning({
    "1.0.0": formsCtrl.create
  }));

};
