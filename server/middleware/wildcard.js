module.exports = function() {
  return function wildcard(req, res, next) {
    //res.sendFile('index.html', { root: './client/' });
    res.redirect('/');
  }
};
