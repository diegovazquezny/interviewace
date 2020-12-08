const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.DB_URI;

console.log('uri', PG_URI);
console.log('uri', process.env.DOMAIN);

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
