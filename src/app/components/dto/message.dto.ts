import { Message } from "../../models/message.model";

export interface DtoMessage {
  id?: number;
  text: string;
  x: number;
  y: number;
}

export function toMessage(apiMsg: DtoMessage): Message {
    return {
        id: apiMsg.id!,
        text: apiMsg.text,
        coordinates: { x: apiMsg.x, y: apiMsg.y },
    };
}

export function toDtoMessage(msg: Message): DtoMessage {
    return {
        text: msg.text,
        x: msg.coordinates.x,
        y: msg.coordinates.y,
    };
}