import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss']
})
export class SearchButtonComponent {
  @Output() clickButton: EventEmitter<void> = new EventEmitter<void>();
}
