module.exports = function(Show) {
  Show.beforeCreate = function(next, modelInstance) {

    next();
  };
};
