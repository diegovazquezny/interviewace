module.exports = {
  setSSIDCookie: (req, res, next) => {
    //console.log('current cookie', req.cookies.ssid);
    res.cookie('ssid', res.locals.id, {
      httpOnly: false,
      expires: new Date(Date.now() + 31104000000), 
      //secure: true  
    });
    next();
  }
}