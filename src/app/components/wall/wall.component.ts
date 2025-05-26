import { Component, HostListener, OnInit, signal, ViewChild } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { addCoordinates, Coordinates, getCoordinatesLength, Message, substractCoordinates } from '../../models/message.model';
import { MessageInputComponent } from '../message-input/message-input.component';
import { getCursorCoordinates } from '../../util/mouse-touchpad.util';
import { DraggeableComponent } from '../../shared/draggeable/draggeable.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wall',
  imports: [MessageInputComponent, DraggeableComponent, CommonModule],
  templateUrl: './wall.component.html',
  styleUrl: './wall.component.scss'
})
export class WallComponent implements OnInit {

  messages = signal<Message[]>([]);

  messageInputPosition = signal<Coordinates | null>(null);

  constructor(private messagesService: MessagesService) {}


  ngOnInit(): void {
    this.messagesService.getMessages().subscribe((messages:any)=>{
      this.messages.set(messages);
    })
  }

  public onClick(position: Coordinates) {
    console.log("test")
    this.messageInputPosition.set(position);
  }

  public onAddMessage(message: string) {
    const newMessage = {
      id: this.messages().length+1,
      text: message,
      coordinates: this.messageInputPosition()!
    }
    this.messages.update( messages => [
      ...messages,
      newMessage
    ])
    
    this.messagesService.addMessage(newMessage).subscribe()
    this.messageInputPosition.set(null)
  }
}