import express from "express";

import { userRouter } from "routes/user-routes";
import { storageRoutes } from "routes/store-routes";
import { auhRoutes } from "routes/auth";
import { passwordRoutes } from "routes/password-routes";
import { refreshTokenRoutes } from "./routes/refresh_token-routes";
import { errorHandler } from "middlewares/error";
import { verifyEmail } from "./routes/verify-email";
import cors from "cors";
import helmet from "helmet";
import { initializeEventsOn } from "events/update-user-verifyEmaill";
import { forgotPassword } from "routes/forgotPassword";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._middlewares();
    this._router();
    this._lastMiddlewares();
    initializeEventsOn();
  }

  private _middlewares() {
    this.app.use(express.json());

    // const allowedOrigin = "https://passtorage.vercel.app";

    // const corsOptions = {
    //   origin: (
    //     origin: string | undefined,
    //     callback: (err: Error | null, allow?: boolean) => void
    //   ) => {
    //     if (origin === allowedOrigin) {
    //       callback(null, true);
    //     } else {
    //       callback(new Error("Acesso não permitido por CORS"));
    //     }
    //   },
    // };

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
    this.app.use(verifyEmail);
    this.app.use(forgotPassword);
  }
}
export default new App();
