import { NextFunction, Request, Response } from "express";
export declare class ResetPasswordController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
