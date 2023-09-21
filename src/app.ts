import express from "express";

import { userRouter } from "routes/user-routes";
import { storageRoutes } from "routes/store-routes";
import { auhRoutes } from "routes/auth";
import { passwordRoutes } from "routes/password-routes";
import { refreshTokenRoutes } from "./routes/refresh_token-routes";
import { errorHandler } from "middlewares/error";
import { validateEmail } from "./routes/validate-email";
import cors from "cors";
import helmet from "helmet";
import { initializeEventsOn } from "./service/events/user-events";
import { forgotPassword } from "routes/forgotPassword";
import { resetPassword } from "routes/reset-password";
import { verifyEmail } from "routes/verify-email";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._middlewares();
    this._router();
    this._lastMiddlewares();
    new initializeEventsOn();
  }

  private _middlewares() {
    this.app.use(express.json());
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
    this.app.use(validateEmail);
    this.app.use(forgotPassword);
    this.app.use(resetPassword);
    this.app.use(verifyEmail);
  }
}
export default new App();
