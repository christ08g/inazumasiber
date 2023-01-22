require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `PGPASSWORD=GjpS3pHHJ3YmiESWvShg psql -h containers-us-west-41.railway.app -U postgres -p 5898 -d railway`;

const pool = new Pool({
  connectionString: `PGPASSWORD=GjpS3pHHJ3YmiESWvShg psql -h containers-us-west-41.railway.app -U postgres -p 5898 -d railway`
});

module.exports = { pool };
