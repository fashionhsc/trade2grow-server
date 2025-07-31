const app = require('./src/app')
const config = require('./src/config/config');
const Connection = require('./src/config/db');
const logger = require('./src/logger');


Connection();

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.env} mode`);
})