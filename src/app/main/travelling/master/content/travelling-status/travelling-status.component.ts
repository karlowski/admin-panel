import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-travelling-status',
  templateUrl: './travelling-status.component.html',
  styleUrls: ['./travelling-status.component.scss']
})
export class TravellingStatusComponent {
  @Input() status: string;
}
