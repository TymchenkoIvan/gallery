import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Photo} from '../../model/photo';
import {PhotoService} from '../../service/photo-service.service';
import {PhotoDialogComponent} from '../photo-dialog/photo-dialog.component';
import {MatDialog, MatDialogRef, MatDialogState} from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  dialogRef: MatDialogRef<PhotoDialogComponent>;

  photos: Photo[];

  constructor(private photoService: PhotoService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.photoService.findAll().subscribe(data => {
      this.photos = data;
    });
  }

  openModal(photo: Photo, index: Number) {
    this.dialogRef = this.dialog.open(PhotoDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        index: index,
        photos: this.photos
      }
    });
  }

  dialogIsOpen() {
    if (this.dialogRef != null) {
      return this.dialogRef.getState() === MatDialogState.OPEN;
    }
    return false;
  }
}
