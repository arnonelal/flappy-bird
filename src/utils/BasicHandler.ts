export class BasicHandler {

  private callbacks: (() => void)[] = [];

  public addCallback(callback: () => void) {
    this.callbacks.push(callback);
  }

  call() {
    this.callbacks.forEach(callback => callback());
  }

}