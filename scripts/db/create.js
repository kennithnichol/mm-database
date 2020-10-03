const { Client } = require('pg');

require('dotenv').config();

const {
    MMDB_USER,
    MMDB_PASS,
    MMDB_HOST,
    MMDB_DEV_DB_NAME,
    MMDB_TEST_DB_NAME,
    NODE_ENV
} = process.env;

const dbName = NODE_ENV === "development"
    ? MMDB_DEV_DB_NAME
    : MMDB_TEST_DB_NAME

const connection = new Client({
    host: MMDB_HOST,
    user: MMDB_USER,
    password: MMDB_PASS
});

connection.connect((err) => {
    if (err) {
        console.error(err.stack)
        process.exit(0);
    }
    connection.query(`CREATE DATABASE ${dbName};`, (err, result) => {
        if (err && err.code === '42P04') {
            console.log('DB already created');
            process.exit(0);
        }

        if (err) {
            console.error(err);
            process.exit(0);
        }

        console.log(`Created DB`);
        process.exit(0);
    })
})

