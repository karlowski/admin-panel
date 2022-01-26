import { Component, Input } from '@angular/core';
import { IStat } from '../../models/stat.interface';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss']
})
export class StatBlockComponent {
  @Input() stats: IStat[];
  @Input() statBlockName: string;
  @Input() isLast: boolean;
}
