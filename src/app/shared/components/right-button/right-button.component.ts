import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-right-button',
  templateUrl: './right-button.component.html',
  styleUrls: ['./right-button.component.scss']
})
export class RightButtonComponent {
  @Output() clickButton: EventEmitter<void> = new EventEmitter<void>();
}
