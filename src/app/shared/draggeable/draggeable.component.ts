import { Component, Input, output, TemplateRef } from '@angular/core';
import { addCoordinates, Coordinates, getCoordinatesLength, substractCoordinates } from '../../models/message.model';
import { getCursorCoordinates } from '../../util/mouse-touchpad.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draggeable',
  imports: [CommonModule],
  templateUrl: './draggeable.component.html',
  styleUrl: './draggeable.component.scss'
})
export class DraggeableComponent {

  @Input() template!: TemplateRef<any>;
  @Input() data: any = {};

  click = output<Coordinates>()

  currentPosition: Coordinates = {x:0, y:0}
  draggedPosition: Coordinates = {x:0, y:0}

  scale = 1

  mouseInitPosition: Coordinates | null = null
  mouseDragging = false;
  mousePressed = false;

  onMouseDown(event: MouseEvent | TouchEvent) {
    this.mousePressed = true;
    this.mouseInitPosition = getCursorCoordinates(event)
  }
  
  onMouseUp(event: MouseEvent | TouchEvent) {
    this.mousePressed = false;
    this.currentPosition = this.draggedPosition
    if(!this.mouseDragging) {
      this.click.emit(substractCoordinates(getCursorCoordinates(event), this.currentPosition));
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

  get context() {
    return {
      dragged: this.draggedPosition,
      data: this.data
    };
  }

  get transform(): string {
      return `translate(${this.draggedPosition.x}px, ${this.draggedPosition.y}px) scale(${this.scale})`;
  }
}
