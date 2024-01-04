module.exports = {
  ignores: ["!node_modules/", "node_modules/*"],
  files: ["src/**/*.js"],
 
  
  rules: {
    semi: "error",
    "prefer-const": "error",
    quotes: ["warn", "double"],
  },
};
