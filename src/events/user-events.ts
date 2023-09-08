import EventEmitter from "events";
import { prismaClient } from "database/prisma-client";

class MyEmitter extends EventEmitter {}

export const myEmitter = new MyEmitter();

export class initializeEventsOn {
  constructor() {
    this._resetPassword();
    this._verifiedEmail();
  }

  private _verifiedEmail() {
    myEmitter.on("user/verifiedEmail-update", async (userId: string) => {
      await prismaClient.user.update({
        where: {
          id: userId,
        },

        data: { verifiedEmail: true },
      });
    });
  }

  private _resetPassword() {
    myEmitter.on(
      "user/reset-password",
      async (newPasswordHash: string, userId: string) => {
        await prismaClient.user.update({
          where: {
            id: userId,
          },

          data: {
            password_hash: newPasswordHash,
          },
        });
      }
    );
  }
}
