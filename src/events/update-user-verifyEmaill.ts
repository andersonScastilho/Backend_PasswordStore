import EventEmitter from "events";
import { prismaClient } from "database/prisma-client";

class MyEmitter extends EventEmitter {}

export const myEmitter = new MyEmitter();

export function initializeEventsOn() {
  myEmitter.on("user/verifiedEmail-update", async (userId: string) => {
    await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        verifiedEmail: true,
      },
    });
  });
}
