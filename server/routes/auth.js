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
    (req, res) => {
      res.status(200).json({ sessionId: res.locals.ssid })
    })
  .get('/login',
    authController.oauth,
    sessionController.resumeSession,
    (req, res) => {
      res.status(200).json({ oauth: res.locals.data })
    }) 
  .get('/session',
    sessionController.resumeSession,
    (req, res) => {
      res.status(200).json({ user: res.locals.user })
    })
  .get('/', (req, res) => {
      return res.sendStatus(200);
    });
    
module.exports = router;
