export function UniqueUntilResolve() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    let inProgress = false;

    descriptor.value = function(...args: any[]) {
      if (inProgress) {
        return;
      }

      inProgress = true;

      const result = originalMethod.apply(this, args);

      if (result instanceof Promise) {
        return result.then(
          (data: any) => {
            inProgress = false;

            return data;
          },
          (data: any) => {
            inProgress = false;

            throw data;
          }
        );
      }

      inProgress = false;

      return result;
    };
  };
}
