const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST || 'srv1973.hstgr.io',
  user: process.env.DB_USER || 'u543196189_r_restaurant',
  password: process.env.DB_PASSWORD || '8|MAAby8|oYn',
  database: process.env.DB_NAME || 'u543196189_r_restaurant',
  waitForConnections: true,
  connectionLimit: 5,
};

(async function testDb() {
  console.log('Testing DB connection to:', { host: config.host, user: config.user, database: config.database });
  let pool;
  try {
    pool = mysql.createPool(config);
    const conn = await pool.getConnection();
    try {
      await conn.ping();
      console.log('DB ping successful');
    } finally {
      conn.release();
    }
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('DB connection failed:', err && err.message ? err.message : err);
    if (pool) await pool.end().catch(()=>{});
    process.exit(1);
  }
})();
