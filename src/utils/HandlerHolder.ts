export class HandlerHolder<Args extends any[]> {

  private callbacks: ((...args: Args) => void)[] = [];

  public add(callback: (...args: Args) => void) {
    this.callbacks.push(callback);
  }

  call(...args: Args) {
    this.callbacks.forEach(callback => callback(...args));
  }

}