let nextId = 100;
module.exports = {
  generateId: function (req, res, next) {
   req.body.id = ++nextId;
   next();
 },
 accountName: function(req, res, next) {
    req.body.type = req.params.priv;
    next();
  }
}
