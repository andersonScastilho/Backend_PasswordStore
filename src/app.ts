import express from "express";
import { storageRoutes } from "routes/store-routes";
import { userRouter } from "routes/user-routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._middlewares();
    this._router();
  }

  private _middlewares() {
    this.app.use(express.json());
  }

  private _router() {
    this.app.use(userRouter);
    this.app.use(storageRoutes);
  }
}
export default new App();
