import { NextFunction, Request, Response } from "express";
export declare class ShowUserController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
