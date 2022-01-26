import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-left-button',
  templateUrl: './left-button.component.html',
  styleUrls: ['./left-button.component.scss']
})
export class LeftButtonComponent {
  @Output() clickButton: EventEmitter<void> = new EventEmitter<void>();
}
