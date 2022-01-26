import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent {

  @Input() public form: FormGroup;
  @Output() fileChange: EventEmitter<File> = new EventEmitter<File>();

  onFileDropped($event): void {
    this.prepareFile($event);
  }

  fileBrowseHandler(file: File): void {
    this.prepareFile(file);
  }

  deleteFile(): void {
    this.form.controls.file.patchValue(null);
  }

  prepareFile(file: File): void {
    this.fileChange.emit(file[0]);
    this.form.controls.file.patchValue(file);
  }

  formatBytes(): string {
    const bytes = this.form.controls.file.value[0]?.size;
    if (!bytes) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
