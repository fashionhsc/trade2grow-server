const app = require('./src/app')
const config = require('./src/config/config');
const Connection = require('./src/config/db');
const logger = require('./src/logger');


Connection();

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.env} mode`);
})


// Handle uncaught exceptions (sync errors not caught anywhere)
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1); 
});

// Handle unhandled promise rejections (async errors without .catch)
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", reason);
});