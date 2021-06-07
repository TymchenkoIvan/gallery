import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Photo} from '../../../model/photo';

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
        index: number,
        photos: Photo[]
      }) {
  }

  nextSlide() {
    this.data.index++;
  }

  previousSlide() {
    this.data.index--;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
