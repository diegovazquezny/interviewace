const db = require('../model');

module.exports = {
  startSession: (req, res, next) => {
    const { id } = res.locals;
    const query = `
      UPDATE users 
      SET session_id = $1 
      WHERE user_id = $1 
      RETURNING session_id     
    `;
    db.query(query, [id])
      .then(response => {
        res.locals.ssid = response.rows[0].session_id;
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
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