const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: 'k*S%M9cN',
    host: "45.90.33.254",
    port: 5432,
    database: "MusicSchool"
})


module.exports = pool
