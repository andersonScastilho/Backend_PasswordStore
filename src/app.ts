import express from "express";

import { userRouter } from "routes/user-routes";
import { storageRoutes } from "routes/store-routes";
import { auhRoutes } from "routes/auth";
import { passwordRoutes } from "routes/password-routes";
import { refreshTokenRoutes } from "./routes/refresh_token-routes";
import { errorHandler } from "middlewares/error";
import cors from "cors";
import helmet from "helmet";
class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._middlewares();
    this._router();
    this._lastMiddlewares();
  }

  private _middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private _lastMiddlewares() {
    this.app.use(errorHandler);
  }

  private _router() {
    this.app.use(userRouter);
    this.app.use(storageRoutes);
    this.app.use(auhRoutes);
    this.app.use(passwordRoutes);
    this.app.use(refreshTokenRoutes);
  }
}
export default new App();
