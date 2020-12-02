const { Pool } = require('pg');

//const PG_URI = process.env.DB_URI;
const PG_URI = `
postgres://difgwbuq:v2Xfx5oyfJ5Kd6zyu68w5bjwcamzuaUt@suleiman.db.elephantsql.com:5432/difgwbuq`;

// hide away URL, dev mode vs production mode.
// const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
