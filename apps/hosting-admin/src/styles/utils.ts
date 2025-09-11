// type Args = Record<string, unknown>[];

export const classNames = (...args: [string, boolean]) =>
  args
    .map((arg) =>
      typeof arg === 'object'
        ? Object.entries(arg)
            .filter(([, condition]) => condition)
            .map(([className]) => className)
            .join(' ')
        : arg,
    )
    .join(' ');
