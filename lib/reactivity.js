// a global variable to hold the callback to set up subscription in getter.
let context = null;

export function createSignal(initialValue) {
  let value = initialValue;

  const subscriptions = new Set();

  const getter = () => {
    // the top context is where the getter is called
    const callback = context;
    if (callback != null) {
      subscriptions.add(callback);
    }
    return value;
  };

  const setter = (newValue) => {
    // notify the value change
    if (value !== newValue) {
      value = newValue;
      for (const subscription of subscriptions) {
        subscription();
      }
    }
  };

  return [getter, setter];
}

/**
 * run the callback while put the callback in the global context
 * so when getter is called, it can set up the subscription to re-run it
 */
export function createEffect(callback) {
  let prevContext = context;
  context = callback;
  callback();
  context = prevContext;
}
