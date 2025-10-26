import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
//Custom Modules
import config from '@/config';
import router from '@/routes';
import corsOptions from '@/lib/cors';
import { logger, logtail } from '@/lib/winston';
import { connectDatabase, disconnectDatabase } from '@/lib/mongoose';

const server = express();

server.use(cors(corsOptions));
// Secure Headers
server.use(helmet());

// parse json object to body
server.use(express.json());
// parse url encoded-bodies
server.use(express.urlencoded({ extended: true }));

server.use(express.static(`${__dirname}/public`));

server.use(cookieParser());
server.use(compression());

// Immediately Invoked async function to initialize application
(async function (): Promise<void> {
  try {
    // Connect to database
    await connectDatabase();
    server.use('/', router);

    server.listen(config.PORT, () => {
      logger.info(`Server listening at http://localhost/${config.PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
  }
  if (config.NODE_ENV === 'production') {
    process.exit(1);
  }
})();

// Handles graceful server shutdown on termination signal
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    // Disconnect from database
    await disconnectDatabase();
    // Log a warning indicating the server is shutting down
    logger.info('Server shutdown', signal);

    // flush any remaining logs to Logtail before existing
    logtail.flush();
    process.exit(0);
  } catch (err) {
    logger.error('Error during server shutdown', err);
  }
};

// listen for Termination signals and trigger grateful shutdown
process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
