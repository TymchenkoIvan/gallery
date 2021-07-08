import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PhotoDialogComponent} from '../../../gallery/component/photo-dialog/photo-dialog.component';
import {Photo} from '../../../model/photo';
import {PhotoService} from '../../../gallery/service/photo-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  dialogRef: MatDialogRef<PhotoDialogComponent>;
  isPrivate = false;
  photos: Photo[];

  constructor(private photoService: PhotoService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      routeData => {
        this.isPrivate = routeData.isPrivate;
        if (this.isPrivate) {
          this.photoService.findPrivate().subscribe(data => {
            this.photos = data;
          });
        } else {
          this.photoService.findPublic().subscribe(data => {
            this.photos = data;
          });
        }
      }
    );
  }

  openModal(photo: Photo, index: number): void {
    this.dialogRef = this.dialog.open(PhotoDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        index,
        photos: this.photos
      }
    });
  }

  show(id: number): void {
    this.photoService.markPhotoAsVisible(id).subscribe(
      data => {
        this.snackBar.open('Photo is visible', 'Ok', {
          duration: 5000
        });
        this.ngOnInit();
      });
  }

  hide(id: number): void {
    this.photoService.markPhotoAsHidden(id).subscribe(
      data => {
        this.snackBar.open('Photo is hidden', 'Ok', {
          duration: 5000
        });
        this.ngOnInit();
      });
  }
}
