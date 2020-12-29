const db = require('../model');

module.exports = {
  getNotes: (req, res, next) => {
    const { id } = req.query;
    const query = `
      SELECT bullet_points.bullet, bullet_points.bullet_id, technology.tech_name
      FROM bullet_points
      INNER JOIN notes_users
      ON bullet_points.bullet_id = notes_users.bullet_id
      AND notes_users.user_id = $1
      INNER JOIN technology
      ON bullet_points.tech_id = technology.tech_id
      ORDER BY technology.tech_name 
    `;
    db.query(query, [id])
      .then(response => {
        const technologies = response.rows.reduce((obj, tech) => {
          const techObj = {
            note: tech.bullet,
            id: tech.bullet_id
          }
          if (obj[tech.tech_name]) obj[tech.tech_name].push(techObj);
          else obj[tech.tech_name] = [techObj]; 
          return obj;
        }, {});
        
        res.locals.tech = technologies;
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  getAllNotesForTech: (req, res, next) => {
    const { q } = req.query;
    const query = `
      SELECT bullet_points.bullet, bullet_points.bullet_id, technology.tech_name
      FROM bullet_points
      INNER JOIN technology
      ON bullet_points.tech_id = technology.tech_id
      AND technology.tech_name = $1
      ORDER BY bullet_points.bullet
    `;
    db.query(query, [q])
      .then(response => {
        res.locals.notes = response.rows;
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
    console.log(req.body);
    const { notes, userId } = req.body;
    const { techName, techCategory } = req.body.noteInfo;
    if (!techName || !techCategory) next();
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
      INSERT INTO bullet_points (tech_id, bullet, user_id, category)
      SELECT technology.tech_id, $2, $3, $4
      FROM technology
      WHERE technology.tech_name = $1
      RETURNING bullet_points.bullet_id
    `;
    
    // TODO: get the bullet_id from the response
    // write another query to insert the bullet_id and user_id into notes_users

    const notesUsersQuery = `
      INSERT INTO notes_users (bullet_id, user_id)
      values($1, $2)
    `;

    db.query(functionQuery)
      .then(response => db.query(runFunctionQuery, [techName]))
      .then(response => techId = response.rows[0].tech_id)
      .then(response => db.query(bulletPointsQuery, [techName, notes, userId, techCategory]))
      .then(response => {
        const bulletId = response.rows[0].bullet_id;
        res.locals.bulletId = bulletId;
        return db.query(notesUsersQuery, [bulletId, userId]);
      })
      .then(response => {
        res.locals.success = true,
        next();
      })
      .catch(err => {
        console.log('Function query', err);
        next(err);
      });
  },
  deleteNotes: (req, res, next) => {
    const { userId, bulletId } = req.body;
    const { ssid } = req.cookies;
    const ssidQuery = `
      SELECT username FROM users
      WHERE user_id = $1
      AND session_id = $2
    `;

    const deleteQuery = `
      DELETE FROM notes_users
      WHERE bullet_id = $1
      AND user_id = $2
    `;
    
    db.query(ssidQuery, [userId, ssid])
      .then(response => {
        if (!response.rows[0]) {
          res.locals.success = false;
          next();
        }
      })
      .then(() => {
        db.query(deleteQuery, [bulletId, userId])
          .then(() => {
            res.locals.success = true;
            next();
          })
      })
      .catch(err => {
        console.log('delete query', err);
        next(err);
      });
  },
  getAllCategories: (req, res, next) => {
    const query = `
      SELECT * FROM categories
      ORDER BY category_name
    `;
    db.query(query)
      .then(response => {
        const categories = response.rows;
        res.locals.categories = categories;
        next()
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  },
  getTechnologyFromCategory: (req, res, next) => {
    const { id } = req.query;
    const query = `
      SELECT tech_name
      FROM technology
      NATURAL JOIN categories
      NATURAL JOIN technology_categories
      WHERE categories.category_id = $1
    `;  
    db.query(query, [id])
      .then(response => {
        const technologies = response.rows;
        //console.log('technologies', technologies);
        res.locals.technologies = technologies;
        next()
      })
      .catch(err => {
        console.log('ERR -->', err);
        next(err);
      });
  },
  savePublicNote: (req, res, next) => {
    const { userId, bulletId } = req.body;
    //console.log('save public note')
    const query = `
      INSERT INTO notes_users (bullet_id, user_id)
      VALUES ($1, $2)
    `;  
    db.query(query, [bulletId, userId])
      .then(response => {
        const technologies = response.rows;
        res.locals.success = true;        
        next();
      })
      .catch(err => {
        //console.log(err.toString())
        if (err.code == 23505) {
          res.locals.success = false;
          next();
        } else {
          console.log('ERR -->', err.code);
          next(err);
        }
      });
  },
  editPrivateNote: (req, res, next) => {
    const { userId, bulletId, notes, noteInfo } = req.body;
    console.log('user id', userId);
    console.log('bullet id', bulletId);
    console.log('notes', notes);
    console.log('noteInfo', noteInfo);

    const editNoteQuery = `
      UPDATE bullet_points 
      SET bullet = $1
      WHERE bullet_id = $2
      AND user_id = $3      
    `;  
    db.query(editNoteQuery, [notes, bulletId, userId])
      .then(response => {
        res.locals.success = true;    
        res.locals.bulletId = bulletId;    
        next();
      })
      .catch(err => {
        console.log('ERR -->', err.code);
        next(err);
      });
  }
}
 