import 'reflect-metadata';
import * as express from 'express';
import { AppDataSource } from './data-source';
import authRoutes from './auth/auth.routes';
import todoRoutes from './todo/todo.routes';
import * as cors from 'cors';
// .env ファイルから変数読み込み
import 'dotenv/config';

const app = express();
app.use(express.json());

// CORS エラー対策
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
  });

/**
 * APIs
 *
 */
const apiPrefix = '/api';
app.use(`${apiPrefix}/`, authRoutes);
app.use(`${apiPrefix}/`, todoRoutes);
