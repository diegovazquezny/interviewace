const express = require('express');
const router = express.Router();
const techController = require('../controllers/techController');

router
  .get('/notes', 
    techController.getNotes, 
    (req, res) => {
      res.status(200).json({ technologies: res.locals.tech })
    })
  .get('/all-tech', 
    techController.fetchTopics, 
    (req, res) => {
      res.status(200).json({ technologies: res.locals.allTech })
    })
  .get('/all-notes-for-tech', 
    techController.getAllNotesForTech, 
    (req, res) => {
      res.status(200).json({ technologies: res.locals.notes })
    })
  .post('/notes',
    techController.saveNotes,
    (req, res) => {
      res.status(200).json({ success: res.locals.success })
    }) 
  .get('/', (req, res) => {
    return res.sendStatus(200);
  })
  .delete('/notes',
    techController.deleteNotes,
    (req, res) => {
      res.status(200).json({ success: res.locals.success })
  })
  .get('/all-categories', techController.getAllCategories,
  (req, res) => {
    res.status(200).json({ categories: res.locals.categories })
  })
  .get('/technology-from-category', techController.getTechnologyFromCategory,
  (req, res) => {
    res.status(200).json({ technologies: res.locals.technologies })
  })

module.exports = router;
