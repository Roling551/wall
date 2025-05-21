import { Coordinates } from "../models/message.model";

export function getCursorCoordinates(event: MouseEvent | TouchEvent, isTheEnd = false): Coordinates {
    if(event instanceof MouseEvent) {
        return { x: event.pageX, y: event.pageY }
    }
    return { x: event.changedTouches[0].pageX, y: event.changedTouches[0].pageY }
}