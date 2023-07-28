import express from "express";
import { router } from "routes/user-routes";

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
    this.app.use(router);
  }
}
export default new App();
