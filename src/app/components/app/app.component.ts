import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WallComponent } from '../wall/wall.component';

@Component({
  selector: 'app-root',
  imports: [WallComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wall';
}
