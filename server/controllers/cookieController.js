module.exports = {
  setSSIDCookie: (req, res, next) => {
    console.log('setting cookie');
    res.cookie('ssid', res.locals.id, {
      httpOnly: true,
      // secure: true  
    });
    res.cookie('secret', 171717, {
      maxAge: 100000,
      httpOnly: true
    });
    next();
  }
}