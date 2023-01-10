/**
 * A simple interval object that encapsulates basic javascript interval mechanism.
 * It consists of start() and end() methods for starting and ending the interval, and returns a boolean if the operation was successful. the only case it's not successful if the interval has already been started or ended, respectively.
 * The interval can be re-started once ended.
 */

export class BasicInterval {

  private coreInterval: NodeJS.Timer | null = null;

  public constructor(
    private intervalFunc: (_this: BasicInterval) => void,
    private intervalInMillisec: number,
  ) {

  }

  public start(): boolean {
    if (this.coreInterval === null) {
      this.coreInterval = setInterval(
        () => this.intervalFunc(this),
        this.intervalInMillisec
      );
      return true;
    } else {
      return false;
    }

  }

  public stop(): boolean {
    if (this.coreInterval !== null) {
      clearInterval(this.coreInterval);
      this.coreInterval = null;
      return true;
    } else {
      return false;
    }
  }

}