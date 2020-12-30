const db = require('../model');

module.exports = {
  startSession: (req, res, next) => {
    const { ssid, id } = res.locals;
    const query = `
      UPDATE users 
      SET session_id = $1 
      WHERE user_id = $2 
      RETURNING *     
    `;
    db.query(query, [ssid, id])
      .then(response => {
        res.locals.ssid = response.rows[0].session_id;
        res.locals.user = 
        next()
      })
      .catch(err => {
        console.log('ERR start session-->', err);
        next(err);
      });
  },
  resumeSession: (req, res, next) => {
    const { ssid } = req.cookies;
    const query = `
      SELECT * FROM users
      WHERE session_id = $1 
    `;
    db.query(query, [ssid])
      .then(response => {
        res.locals.user = response.rows[0];
        next();
      })
      .catch(err => {
        console.log('error in resume session');
        next(err);
      });
  }
}