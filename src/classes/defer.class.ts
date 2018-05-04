export class Defer<TRes = any, TRej = any> {

  promise: Promise<TRes>;
  resolve: (value?: TRes) => void;
  reject: (value?: TRej) => void;

  constructor() {

    this.promise = new Promise((resolve: (value?: any) => void, reject: (value?: any) => void) => {
      this.resolve = resolve;
      this.reject = reject;
    });

  }

}
