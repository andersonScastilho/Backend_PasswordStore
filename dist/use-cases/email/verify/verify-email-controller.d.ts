import { NextFunction, Request, Response } from "express";
export default class VerifyEmailController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
