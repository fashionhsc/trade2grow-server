require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    dbUri: process.env.DB_URI ,
    FrontendUrl: 'http://localhost:5173'
};

module.exports = config;

