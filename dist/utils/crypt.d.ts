/// <reference types="node" />
declare const iv: Buffer;
export declare const encrypt: (text: string) => {
    iv: string;
    content: string;
    tag: string;
};
export declare const decrypt: (data: {
    iv: string;
    content: string;
    tag: string;
}) => string;
export {};
