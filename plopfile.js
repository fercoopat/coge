// import explicit generator
const moduleGenerator = require("./generators/module/config");

module.exports = function (plop) {
  // register generators
  moduleGenerator(plop);
};
