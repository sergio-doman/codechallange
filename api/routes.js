
module.exports = function(app, parseForm, csrfProtection, routesVersioning) {

  // Generate csrf token
  app.get('/api/form/token', csrfProtection, routesVersioning({
    "1.0.0": function(req, res) {
      res.send(req.csrfToken());
    }
  }));

  // Create new
  app.post('/api/form', parseForm, csrfProtection, routesVersioning({
    "1.0.0": function(req, res) {
      res.send("data is being processed");
    }
  }));

};