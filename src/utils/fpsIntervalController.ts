import { BasicInterval } from "./BasicInterval";
import { GameConsts } from "./GameConsts";

type Callback = (_this: FpsIntervalController) => void

export class FpsIntervalController {

  private interval = new BasicInterval(() => this.step(), 1000 / GameConsts.fps);

  private currentId = -1;

  private callbacksInQueue = new Map<number, Callback>();
  private callbacksRunning = new Map<number, Callback>();



  public set(callback: Callback): FpsInterval {
    const id = this.currentId++;
    this.callbacksInQueue.set(id, callback);
    return new FpsInterval(this, id);
  }

  public start(id: number): boolean {
    const callback = this.callbacksInQueue.get(id);
    if (callback === undefined) return false;
    this.callbacksInQueue.delete(id);

    this.callbacksRunning.set(id, callback);
    if (this.callbacksRunning.size === 1) {
      this.interval.start();
    }

    return true;
  }

  public stop(id: number): boolean {
    const callback = this.callbacksRunning.get(id);
    if (callback === undefined) return false;
    this.callbacksRunning.delete(id);
    if (this.callbacksRunning.size === 0) {
      this.interval.stop();
    }

    this.callbacksInQueue.set(id, callback);

    return true;
  }



  private step() {
    this.callbacksRunning.forEach(callback => callback(this));

  }
}


class FpsInterval {
  constructor(
    private fpsIntervalController: FpsIntervalController,
    private callbackId: number,
  ) { }

  public start(): boolean {
    return this.fpsIntervalController.start(this.callbackId);
  }

  public stop(): boolean {
    return this.fpsIntervalController.stop(this.callbackId);
  }

}

export const fpsIntervalController = new FpsIntervalController();