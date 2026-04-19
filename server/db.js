require('dotenv').config();
const dns = require('dns');
const postgres = require('postgres');

dns.setDefaultResultOrder('ipv4first');

const connectionString = process.env.DATABASE_URL;

const sql = postgres(connectionString, {
  ssl: 'require',
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  prepare: false,
  onnotice: () => {},
});

function isDatabaseConnectionError(err) {
  return Boolean(
    err &&
      ['ETIMEDOUT', 'ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'EHOSTUNREACH', 'CONNECT_TIMEOUT'].includes(err.code)
  );
}

async function query(text, params = []) {
  try {
    const result = await sql.unsafe(text, params);

    return {
      rows: result,
      rowCount: typeof result.count === 'number' ? result.count : result.length,
    };
  } catch (err) {
    if (isDatabaseConnectionError(err)) {
      err.message =
        'Database connection failed. Supabase direct DB access may be blocked on your network or the credentials may be incorrect.';
    }

    throw err;
  }
}

module.exports = { sql, query, isDatabaseConnectionError };
