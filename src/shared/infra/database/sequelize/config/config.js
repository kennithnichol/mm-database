require('dotenv').config();
const Sequelize = require('sequelize');

const {
    MMDB_USER,
    MMDB_PASS,
    MMDB_HOST,
    MMDB_DEV_DB_NAME,
    MMDB_TEST_DB_NAME,
    MMDB_PROD_DB_NAME,
    NODE_ENV,
    MMDB_IS_PRODUCTION,
    DATABASE_URL
} = process.env;

const databaseCredentials = {
    'development': {
        'username': MMDB_USER,
        'password': MMDB_PASS,
        'database': MMDB_DEV_DB_NAME,
        'host': MMDB_HOST,
        'dialect': 'postgres'
    },
    'test': {
        'username': MMDB_USER,
        'password': MMDB_PASS,
        'database': MMDB_TEST_DB_NAME,
        'host': MMDB_HOST,
        'dialect': 'postgres'
    },
    'production': {
        // 'username': MMDB_USER,
        // 'password': MMDB_PASS,
        // 'database': MMDB_PROD_DB_NAME,
        // 'host': MMDB_HOST,
        // 'dialect': 'postgres'
        "use_env_variable": "DATABASE_URL"
    }
};

const {
    username, password, database, host, dialect
} = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = MMDB_IS_PRODUCTION === 'true' ? 'prod' : 'dev';

console.log(`[DB]: Connection to the database in ${mode} mode.`)

module.exports.connection = MMDB_IS_PRODUCTION === 'true'
    ? new Sequelize(DATABASE_URL)
    : new Sequelize(database, username, password, {
        host,
        dialect,
        port: 5432,
        dialectOptions: {
            multipleStatements: true,
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    }
);