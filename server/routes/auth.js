const express = require('express');
const router = express.Router();
const db = require('../model');
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
      res.status(200).json({ 
        sessionId: res.locals.ssid, 
        token: res.locals.token
      })
    })
  .get('/login',
    authController.oauth,
    sessionController.resumeSession,
    (req, res) => {
      res.status(200).json({ oauth: res.locals.data })
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
