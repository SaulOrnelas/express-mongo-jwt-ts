import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { dbConnection } from './database/config.js';
import authRoutes from './routes/auth.js';
import categoriesRoutes from './routes/categories.js';
import dishesRoutes from './routes/dishes.js';
import usersRoutes from './routes/users.js';
import seedersRoutes from './routes/seeder.js';

class Server {
  app: Express;
  port: string;
  paths: { [key: string]: string };
  constructor() {
    this.app = express()
    this.port = process.env.PORT ?? '3000';

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      dishes: '/api/dishes',
      users: '/api/users',
      seeders: '/api/seeders'
    }

    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi aplicación
    this.routes()

    //this.errorHandler();
  }

  async conectarDB() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Reading and body parsing
    this.app.use(express.json())

    // Public directory
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.categories, categoriesRoutes)
    this.app.use(this.paths.dishes, dishesRoutes)
    this.app.use(this.paths.users, usersRoutes)
    this.app.use(this.paths.seeders, seedersRoutes)
  }

  // errorHandler() {
  //   this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  //     console.error(err.stack); // Log del error para depuración
  //     res.status(500).json({
  //       message: 'Internal server error',
  //       error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  //     });
  //   });
  // }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in port: ', this.port)
    })
  }
}

export default Server;
