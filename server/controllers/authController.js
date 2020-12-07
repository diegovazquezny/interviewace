const db = require('../model');
const { response } = require('../server');

module.exports = {
  findUser: (req, res, next) => {
    const { nickname } = req.body;
    console.log('enter find user', nickname);
    const query = 'SELECT user_id, username FROM users WHERE username = $1';
    console.log(req.body);
    db.query(query, [nickname])
      .then(response => {
        if (response.rowCount) {
          console.log('user found');
          res.locals.id = response.rows[0].user_id;
        } else {
          console.log('user NOT found');
          res.locals.id = 0;
        }
        next();
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  createUser: (req, res, next) => {
    console.log('enter create user')
    if (res.locals.id) next();
    else {
      console.log('CREATE new user', req.body);
      const { email, nickname, given_name, family_name, picture } = req.body;
      console.log(email, nickname, given_name, family_name);
      const query = `INSERT INTO users (firstname, lastname, username, email, image_url)
        VALUES ($1, $2, $3, $4, $5) RETURNING user_id`;
      db.query(query, [given_name, family_name, nickname, email, picture])
        .then(response => {
          res.locals.id = response.rows[0].user_id;
          next();
        })
        .catch(err => {
          console.log('ERR -->', err);
          next(err);
        });
    }
  },
  oauth: (req, res, next) => {   
    res.locals.data = {
      domain: process.env.DOMAIN,
      clientId: process.env.CLIENT_ID
    }
    next();  
  }
}