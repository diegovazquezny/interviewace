const db = require('../model');
const { response } = require('../server');
const jwt = require('jsonwebtoken');

module.exports = {
  findUser: (req, res, next) => {
    const { nickname } = req.body;
    //console.log('enter find user', nickname);
    const query = 'SELECT user_id, username FROM users WHERE username = $1';
    //console.log(req.body);
    db.query(query, [nickname])
      .then(response => {
        if (response.rowCount) {
          //console.log('user found');
          res.locals.id = response.rows[0].user_id;
        } else {
          //console.log('user NOT found');
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
    //console.log('enter create user')
    if (res.locals.id) next();
    else {
      //console.log('CREATE new user', req.body);
      const { email, nickname, given_name, family_name, picture } = req.body;
      //console.log(email, nickname, given_name, family_name);
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
    console.log('oauth stuff')
    res.locals.data = {
      domain: process.env.DOMAIN,
      clientId: process.env.CLIENT_ID
    }
    next();  
  },
  makeJWT: (req, res, next) => {
    const data = 'hellooo';
    jwt.sign({ data: data }, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      res.json({
        token
      });
    });
  },
  verifyJWT: (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (!bearerHeader) res.sendStatus(403);
    else {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      const data = true;
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } 
        else {
          res.locals.authenticated = true;
          next();
        }
      })
    }
  }
}