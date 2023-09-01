import { NextFunction, Request, Response } from "express";
export declare class CreateUserController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
