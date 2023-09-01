import { NextFunction, Request, Response } from "express";
export declare class IndexStorageController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
