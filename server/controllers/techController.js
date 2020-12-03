const db = require('../model');
const helperFunctions = require('../helperFunctions/helperFunctions');

module.exports = {
  fetchTech: (req, res, next) => {
    const { id } = req.body;
    console.log('getting tech for user-->', [id]);
    const query = `
      SELECT *
      FROM technology
      ORDER BY tech_name
    `;
    db.query(query)
      .then(response => {
        res.locals.tech = response.rows;
        console.log('found', res.locals.tech);
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  saveNotes: (req, res, next) => {
    const { blocks } = req.body.notes;
    const { currentTech } = req.body;
    const { userId } = req.body;
    const processedNotes = helperFunctions.processNotes(blocks);
    const query = `
      INSERT INTO bullet_points (tech_id, bullet, user_id)
      SELECT technology.tech_id, $2, $3
      FROM technology
      WHERE technology.tech_name = $1
    `;
    db.query(query, [currentTech, processedNotes, userId])
      .then(response => {
        res.locals.success = true;
        next();
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
    //next(); 
  }
}