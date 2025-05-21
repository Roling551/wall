import { Component, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { addCoordinates, Coordinates, getCoordinatesLength, Message, substractCoordinates } from '../../models/message.model';
import { MessageInputComponent } from '../message-input/message-input.component';
import { getCursorCoordinates } from '../../util/mouse-touchpad.util';

@Component({
  selector: 'app-wall',
  imports: [MessageInputComponent],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.scss'
})
export class WallComponent implements OnInit {

  messages = signal<Message[]>([]);

  messageInputPosition: Coordinates | null = null

  currentPosition: Coordinates = {x:0, y:0}
  draggedPosition: Coordinates = {x:0, y:0}

  mouseInitPosition: Coordinates | null = null
  mouseDragging = false;
  mousePressed = false;

  constructor(private messagesService: MessagesService) {}


  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((messages:any)=>{
      this.messages.set(messages);
    })
  }

  onMouseDown(event: MouseEvent | TouchEvent) {
    this.mousePressed = true;
    this.mouseInitPosition = getCursorCoordinates(event)
  }
  
  onMouseUp(event: MouseEvent | TouchEvent) {
    this.mousePressed = false;
    this.currentPosition = this.draggedPosition
    if(!this.mouseDragging) {
      this.messageInputPosition = substractCoordinates(getCursorCoordinates(event), this.currentPosition)
    }
    this.mouseDragging = false
    this.mouseInitPosition = null
  }

  onMouseMove(event: MouseEvent | TouchEvent) {
    if(this.mousePressed) {
      const mouseMovement = substractCoordinates(getCursorCoordinates(event), this.mouseInitPosition!) 
      if(getCoordinatesLength(mouseMovement) > 10) {
        this.mouseDragging = true
        this.draggedPosition = addCoordinates(this.currentPosition, mouseMovement)
      } else {
        this.mouseDragging = false
      }
    }
    event.preventDefault();
  }

  public onAddMessage(message: string) {
    const newMessage = {
      id: this.messages().length+1,
      text: message,
      coordinates: this.messageInputPosition!
    }
    this.messages.update( messages => [
      ...messages,
      newMessage
    ])
    
    this.messagesService.addMessage(newMessage).subscribe()
    this.messageInputPosition = null
  }
}
