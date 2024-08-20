import { draw } from "./common";
export declare class Ane implements draw {
    num: number;
    rootx: number[];
    headx: any[];
    heady: any[];
    amp: number[];
    alpha: number;
    isExisted: boolean[];
    canHeight: number;
    cxt2: CanvasRenderingContext2D;
    constructor(cxt2: CanvasRenderingContext2D, canHeight: number);
    private init;
    draw(deltaTime: number): void;
}
