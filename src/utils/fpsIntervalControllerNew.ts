import { BasicInterval } from "./BasicInterval";
import { GameConsts } from "./GameConsts";

type Callback = (_this: FpsIntervalControllerNew) => void

export class FpsIntervalControllerNew {

  private interval = new BasicInterval(() => this.step(), 1000 / GameConsts.fps);

  private callbacksInQueue = new Map<string, Callback>();
  private callbacksRunning = new Map<string, Callback>();



  public set(id: string, callback: Callback): FpsInterval {
    this.callbacksInQueue.set(id, callback);
    return new FpsInterval(this, id);
  }

  public start(id: string): boolean {
    const callback = this.callbacksInQueue.get(id);
    if (callback === undefined) return false;
    this.callbacksInQueue.delete(id);

    this.callbacksRunning.set(id, callback);
    if (this.callbacksRunning.size === 1) {
      this.interval.start();
    }

    return true;
  }

  public stop(id: string): boolean {
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
    private fpsIntervalController: FpsIntervalControllerNew,
    private callbackId: string,
  ) { }

  public start(): boolean {
    return this.fpsIntervalController.start(this.callbackId);
  }

  public stop(): boolean {
    return this.fpsIntervalController.stop(this.callbackId);
  }

}

export const fpsIntervalControllerNew = new FpsIntervalControllerNew();