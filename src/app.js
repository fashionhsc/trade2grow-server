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
const adminCategoryRoutes = require('./routes/admin/category');
const userCategory = require('./routes/user/category');
const leaderboardRoutes = require('./routes/user/leaderboard');
const userPaymentRoutes = require('./routes/user/payment');
const adminStrategyRoutes = require('./routes/admin/strategy');
const userStrategyRoutes = require('./routes/user/strategy');
const uploadRoutes = require('./routes/admin/upload');

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


// no login required
app.use('/api/v1/category/list', userCategory);
app.use('/api/v1/auth', authRoutes);



// login required
// user routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/user/stage', userStageRoutes);
app.use('/api/v1/user/leaderboard', leaderboardRoutes);
app.use('/api/v1/user/payment', userPaymentRoutes);
app.use('/api/v1/user/strategy', userStrategyRoutes);

// admin routes
app.use('/api/v1/admin/stage', adminStageRoutes);
app.use('/api/v1/admin/vedio', adminVedioRoutes);
app.use('/api/v1/admin/upload', uploadRoutes);
app.use('/api/v1/admin/category', adminCategoryRoutes);
app.use('/api/v1/admin/strategy', adminStrategyRoutes);


app.use(errorMiddleware)

module.exports = app;
