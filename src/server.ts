import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
//Custom Modules
import config from '@/config';
import router from '@/routes';
import corsOptions from '@/lib/cors';

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
    server.use('', router);

    server.listen(config.PORT, () => {
      console.log(`Server listening at http://localhost/${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
  if (config.NODE_ENV === 'production') {
    process.exit(1);
  }
})();

// Handles graceful server shutdown on termination signal
const serverTermination = async (signal: NodeJS.Signals): Promise<void> => {
  try {
    // Log a warning indicating the server is shutting down
    console.log('Server shutdown', signal);
    process.exit(0);
  } catch (err) {
    console.error('Error during server shutdown', err);
  }
};

// listen for Termination signals and trigger grateful shutdown
process.on('SIGTERM', serverTermination);
process.on('SIGINT', serverTermination);
