/**
 * @author: @puku0x
 */

// Look in ./config folder for webpack.dev.js
module.exports = (env) => {
  switch (env) {
    case 'prod':
    case 'aot':
      return require('./config/webpack.prod')(env);
      break;
    case 'test':
      return require('./config/webpack.test')(env);
      break;
    case 'dev':
    default:
      return require('./config/webpack.dev')(env);
      break;
  }
};