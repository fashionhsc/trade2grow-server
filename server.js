const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

// imports
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const { FrontendUrl } = require('./src/config/config');
const Connection = require('./src/utils/db');

Connection()
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: FrontendUrl,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));

app.use(express.json());




app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})