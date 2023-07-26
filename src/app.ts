import express from "express";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._router();
    this._middlewares();
  }

  private _middlewares() {
    this.app.use(express.json());
  }

  private _router() {}
}
export default new App();
