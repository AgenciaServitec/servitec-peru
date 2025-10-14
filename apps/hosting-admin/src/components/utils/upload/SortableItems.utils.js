import { MouseSensor as LibMouseSensor } from '@dnd-kit/core';
export class MouseSensor extends LibMouseSensor {
    constructor(...args) {
        // @ts-expect-error - Pasando argumentos al constructor padre
        super(...args);
        this.constructor.activators = [
            {
                eventName: 'onMouseDown',
                handler: ({ nativeEvent: event }) => {
                    return shouldHandleEvent(event.target);
                },
            },
        ];
    }
}
const shouldHandleEvent = (element) => {
    let cur = element;
    while (cur) {
        if (cur.dataset?.disabledDnd) {
            return false;
        }
        cur = cur.parentElement;
    }
    return true;
};
export const disableDragProps = {
    id: 'disabled-dnd',
    'data-disabled-dnd': 'true',
};
