module.exports = {
  setSSIDCookie: (req, res, next) => {
    res.cookie('ssid', res.locals.id, {
      path: '/',
      httpOnly: false,
      expires: new Date(Date.now() + 31104000000), 
    });
    next();
  }
}