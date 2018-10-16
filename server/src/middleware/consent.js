'use strict';
const path = require('path');

module.exports = function() {
  return function(req, res) {
    let htmlPath = path.resolve(__dirname, '../../public/mobile/consent.html');
    res.sendFile(htmlPath);
    // res.send('hello world' + req.params.invite);
    // res.redirect('mimonitor://invite/' + req.params.invite);
  };
};
