/// <reference types="node" />
import EventEmitter from "events";
declare class MyEmitter extends EventEmitter {
}
export declare const myEmitter: MyEmitter;
export declare function initializeEventsOn(): void;
export {};
