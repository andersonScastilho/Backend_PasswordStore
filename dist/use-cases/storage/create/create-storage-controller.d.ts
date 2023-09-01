import { Request, Response, NextFunction } from "express";
export declare class CreateStorageController {
    handle(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
