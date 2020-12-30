const crypto = require('crypto');

const ssid = crypto.randomBytes(20).toString('hex');

module.exports = {
  setSSIDCookie: (req, res, next) => {
    res.cookie('ssid', ssid, {
      path: '/',
      httpOnly: false,
      expires: new Date(Date.now() + 31104000000), 
    });
    res.locals.ssid = ssid;
    next();
  }
}