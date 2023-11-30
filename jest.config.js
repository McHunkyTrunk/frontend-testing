module.exports = {
  transform: {
    "\\.js$": ["babel-jest", {configFile: "./test/.babel.config.json"}],
  },
};
