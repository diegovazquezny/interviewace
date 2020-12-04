const db = require('../model');
const helperFunctions = require('../helperFunctions/helperFunctions');

module.exports = {
  getNotes: (req, res, next) => {
    const { id } = req.query;
    console.log('id', id);
    const query = `
      SELECT bullet_points.bullet, technology.tech_name
      FROM bullet_points
      INNER JOIN technology
      ON bullet_points.tech_id = technology.tech_id
      AND bullet_points.user_id = $1
      ORDER BY technology.tech_name 
    `;
    db.query(query, [id])
      .then(response => {
        //const { technologies } = response.rows;
        const technologies = response.rows.reduce((obj, tech) => {
          if (obj[tech.tech_name]) obj[tech.tech_name].push(tech.bullet);
          else obj[tech.tech_name] = [tech.bullet]; 
          return obj;
        }, {});
        
        console.log('tech -> ', technologies);
        res.locals.tech = technologies;
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  fetchTopics: (req, res, next) => {
    const query = `
      SELECT tech_name FROM "public"."technology"
      ORDER BY tech_name 
    `;
    db.query(query)
      .then(response => {
        res.locals.allTech = response.rows;
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  saveNotes: (req, res, next) => {
    const { notes } = req.body;
    const { currentTech } = req.body;
    let { userId } = req.body;
    userId = !userId ? 5 : userId; 
    console.log('inside save notes middleware', currentTech, userId);
    //const processedNotes = helperFunctions.processNotes(blocks);
    const functionQuery = `
      CREATE OR REPLACE FUNCTION newTech (text)
      RETURNS integer AS $techid$
      declare
        techid integer;
      BEGIN
        SELECT technology.tech_id into techid FROM technology WHERE tech_name = $1;
        IF NOT FOUND THEN
          INSERT INTO technology (tech_name) VALUES ($1) RETURNING technology.tech_id into techid;
        END IF;   
      RETURN techid;
      END;
      $techid$ LANGUAGE plpgsql;
    `;
    
    const runFunctionQuery = `select newTech($1)`;

    const bulletPointsQuery = `
      INSERT INTO bullet_points (tech_id, bullet, user_id)
      SELECT technology.tech_id, $2, $3
      FROM technology
      WHERE technology.tech_name = $1
    `;
    
    db.query(functionQuery)
      .then(response => db.query(runFunctionQuery, [currentTech]))
      .then(response => techId = response.rows[0].tech_id)
      .then(response => db.query(bulletPointsQuery, [currentTech, notes, userId]))
      .then(response => {
        res.locals.success = true;
        next();
      })
      .catch(err => {
        console.log('Function query', err);
        next(err);
      });
  }
}