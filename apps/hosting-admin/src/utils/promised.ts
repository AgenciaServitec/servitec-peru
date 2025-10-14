import type { Component } from 'react';

export const promisedSetState = <S extends Record<string, any>>(
  newState: Partial<S> | ((prevState: S) => Partial<S>),
  _this: Component<any, S>
): Promise<void> =>
  new Promise((resolve) =>
    // @ts-expect-error - setState acepta Partial<S> en runtime
    _this.setState(newState, () => resolve())
  );

export const timeoutPromise = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
