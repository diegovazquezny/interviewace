const express = require('express');
const router = express.Router();
const authController  = require('../controllers/authController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');

router
  .post('/login', 
    authController.findUser, 
    authController.createUser,
    cookieController.setSSIDCookie,
    sessionController.startSession,
    authController.makeJWT,
    (req, res) => {
      res.status(200).json({userId: res.locals.id})
    })
  .get('/login',
    authController.oauth,
    sessionController.resumeSession,
    authController.makeJWT,
    (req, res) => {
      res.status(200).json({ oauth: res.locals.data, user: res.locals.user })
    }) 
  .get('/session',
    sessionController.resumeSession,
    authController.makeJWT,
    (req, res) => {
      res.status(200).json({ user: res.locals.user })
    })
  .get('/', (req, res) => {
      return res.sendStatus(200);
    });
    
module.exports = router;
