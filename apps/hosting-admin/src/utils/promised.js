export const promisedSetState = (newState, _this) => new Promise((resolve) => 
// @ts-expect-error - setState acepta Partial<S> en runtime
_this.setState(newState, () => resolve()));
export const timeoutPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
