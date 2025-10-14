import { MouseSensor as LibMouseSensor } from '@dnd-kit/core';

export class MouseSensor extends LibMouseSensor {
  constructor(...args: any[]) {
    // @ts-expect-error - Pasando argumentos al constructor padre
    super(...args);

    (this.constructor as any).activators = [
      {
        eventName: 'onMouseDown',
        handler: ({ nativeEvent: event }: { nativeEvent: Event }) => {
          return shouldHandleEvent(event.target as HTMLElement);
        },
      },
    ];
  }
}

const shouldHandleEvent = (element: HTMLElement | null): boolean => {
  let cur = element;

  while (cur) {
    if (cur.dataset?.disabledDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

export type DisableDragProps = {
  readonly id: string;
  readonly 'data-disabled-dnd': string;
};

export const disableDragProps: DisableDragProps = {
  id: 'disabled-dnd',
  'data-disabled-dnd': 'true',
} as const;
