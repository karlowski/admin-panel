import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStat } from '../../models/stat.interface';

@Component({
  selector: 'app-filter-chip',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss']
})
export class FilterChipComponent {
  @Input() stats: IStat[];
  @Input() statBlockName: string; 
  @Input() isLast: boolean;

  @Output() onStatCheck: EventEmitter<IStat> = new EventEmitter<IStat>();
}
