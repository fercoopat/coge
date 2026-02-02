// import explicit generator
const moduleGenerator = require("./generators/module/config");

module.exports = function (plop) {
  // Add regex-based singularization helper
  plop.setHelper('singularCase', function(text) {
    if (!text) return text;
    
    let singular = text.toLowerCase();
    
    // Handle pluralization patterns in order of specificity
    singular = singular.replace(/([^aeiou])ies$/i, '$1y');      // categories → category
    singular = singular.replace(/sses$/i, 'ss');               // classes → class
    singular = singular.replace(/(bus|box)es$/i, '$1');        // buses → bus, boxes → box
    singular = singular.replace(/([^s])s$/i, '$1');            // users → user, orders → order (but not words ending with ss)
    
    // Handle edge cases that might not match above patterns
    if (singular === 'bu') singular = 'bus';                   // Fix buses edge case
    
    // Preserve original casing (pascalCase/camelCase)
    if (text[0] === text[0].toUpperCase()) {
      return singular.charAt(0).toUpperCase() + singular.slice(1);
    }
    return singular;
  });

  // register generators
  moduleGenerator(plop);
};
