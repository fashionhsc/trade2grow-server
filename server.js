const app = require('./src/app')
const config = require('./src/config/config');
const logger = require('./src/logger');
const Connection = require('./src/utils/db');


Connection();

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} in ${config.env} mode`);
})