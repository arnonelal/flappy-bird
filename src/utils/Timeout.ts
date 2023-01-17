export class Timeout {

  private timeout: NodeJS.Timeout | null;


  constructor(
    milis: number,
    callback: () => void,
  ) {
    this.timeout = setTimeout(() => {
      callback();
      this.timeout = null;
    }, milis);
  }

  public stop() {
    if (this.timeout === null) return false;
    clearTimeout(this.timeout);
    return true;
  }

}