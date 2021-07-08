import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Photo} from '../../../model/photo';
import {PhotoDialogComponent} from '../photo-dialog/photo-dialog.component';
import {MatDialog, MatDialogRef, MatDialogState} from '@angular/material/dialog';
import {PhotoService} from '../../service/photo-service.service';
import {ActivatedRoute} from '@angular/router';

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
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data.isPrivate) {
        this.photoService.findPrivateVisible().subscribe(privateVisible => {
          this.photos = privateVisible;
        });
      } else {
        this.photoService.findPublicVisible().subscribe(visible => {
          this.photos = visible;
        });
      }
    });
  }

  openModal(photo: Photo, index: number): void {
    this.dialogRef = this.dialog.open(PhotoDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        index: index,
        photos: this.photos
      },
      backdropClass: 'photoDialogBackground'
    });
  }

  dialogIsOpen(): boolean {
    if (this.dialogRef != null) {
      return this.dialogRef.getState() === MatDialogState.OPEN;
    }
    return false;
  }
}
