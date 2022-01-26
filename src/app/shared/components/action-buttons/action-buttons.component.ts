import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Input() status: string;
  @Output() sendValidation: EventEmitter<void> = new EventEmitter<void>();
  @Output() markAsComplete: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshExtractedData: EventEmitter<void> = new EventEmitter<void>();
  @Output() restartWorkflow: EventEmitter<void> = new EventEmitter<void>();
  @Output() markAsValidated: EventEmitter<void> = new EventEmitter<void>();
}
