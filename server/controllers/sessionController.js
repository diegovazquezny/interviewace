// check if user has a session
const db = require('../model');
const { response } = require("express");

module.exports = {
  startSession: (req, res, next) => {
    const { id } = res.locals;
    //console.log('starting session for user-->', [id]);
    const query = `
      UPDATE users 
      SET session_id = $1 
      WHERE user_id = $1 
      RETURNING session_id     
    `;
    db.query(query, [id])
      .then(response => {
        //console.log('found', response);
        res.locals.ssid = response.rows[0].session_id;
        console.log('ssid -->', res.locals.ssid);
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  resumeSession: (req, res, next) => {
    const { ssid } = req.cookies;
    //console.log('session', ssid);
    const query = `
      SELECT * FROM users
      WHERE session_id = $1 
    `;
    db.query(query, [ssid])
      .then(response => {
        res.locals.user = response.rows[0];
        //console.log('res resume session ->', res.locals.user);
        next();
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  }
}