const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/user');
const logger = require('./logger');
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Morgan logs to Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  }
}));


app.use('/api/v1/user',userRoutes);



app.use(errorMiddleware)

module.exports = app;

