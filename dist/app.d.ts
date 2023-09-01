import express from "express";
declare class App {
    app: express.Application;
    constructor();
    private _middlewares;
    private _lastMiddlewares;
    private _router;
}
declare const _default: App;
export default _default;
