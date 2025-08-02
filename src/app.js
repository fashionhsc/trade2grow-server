const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const app = express();


const errorMiddleware = require('./middlewares/errorMiddleware');
const logger = require('./logger');
const authRoutes = require('./routes/auth');
const config = require('./config/config');
const userRoutes = require('./routes/user/user');
const userStageRoutes = require('./routes/user/stage');
const adminStageRoutes = require('./routes/admin/stage');
const adminVedioRoutes = require('./routes/admin/vedio');

app.use(cookieParser());
app.use(cors({
  origin: config.FrontendUrl,
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Morgan logs to Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  }
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user/stage', userStageRoutes);
app.use('/api/v1/admin/stage', adminStageRoutes);
app.use('/api/v1/admin/vedio', adminVedioRoutes);


app.use(errorMiddleware)

module.exports = app;

