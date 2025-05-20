export interface Coordinates {
    readonly x: number;
    readonly y: number;
}

export function addCoordinates(c1: Coordinates, c2: Coordinates) {
    return {
        x: c1.x + c2.x,
        y: c1.y + c2.y
    }
}

export function substractCoordinates(c1: Coordinates, c2: Coordinates) {
    return {
        x: c1.x - c2.x,
        y: c1.y - c2.y
    }
}

export function getCoordinatesLength(c: Coordinates) {
    return Math.sqrt(c.x ** 2 + c.y ** 2)
}

export interface Message {
    id: number;
    text: string;
    coordinates: Coordinates;
}