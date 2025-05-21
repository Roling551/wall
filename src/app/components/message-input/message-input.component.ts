import { AfterViewInit, Component, ElementRef, Input, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Coordinates } from '../../models/message.model';

@Component({
  selector: 'app-message-input',
  imports: [FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent implements AfterViewInit {
  @ViewChild('messageInput') inputElement!: ElementRef<HTMLInputElement>;
  addMessage = output<string>()
  coordinates? : Coordinates

  public stopPropagation(event:MouseEvent) {
    event.stopPropagation();
  }

  public onSubmit(message: string) {
    this.addMessage.emit(message)
  }

  @Input()
  set setCoordinates(coordinates: Coordinates) {
    this.coordinates = coordinates
    if(this.inputElement) {
      this.selectMessageInput();
    }
  }
  
  ngAfterViewInit(): void {
    this.selectMessageInput();
  }

  private selectMessageInput() {
    this.inputElement.nativeElement.select()
  }
}
