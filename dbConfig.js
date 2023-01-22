require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://postgres:GjpS3pHHJ3YmiESWvShg@containers-us-west-41.railway.app:5898/railway`;

const pool = new Pool({
  connectionString: `postgresql://postgres:GjpS3pHHJ3YmiESWvShg@containers-us-west-41.railway.app:5898/railway`,
});

module.exports = { pool };
