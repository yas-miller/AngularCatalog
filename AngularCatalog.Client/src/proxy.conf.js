//proxy.conf.js
var defaultTarget = 'http://localhost:5189';
  module.exports = [
    {
      context: ['/api/**', '/img/**'],
      target: defaultTarget,
      secure: false,
    }
  ];
