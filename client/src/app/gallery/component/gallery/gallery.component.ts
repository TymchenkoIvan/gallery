import {Component, ElementRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {Photo} from '../../../model/photo';
import {PhotoDialogComponent} from '../photo-dialog/photo-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PhotoService} from '../../service/photo-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  dialogRef: MatDialogRef<PhotoDialogComponent>;
  photos: Photo[];
  private prevPhotoId: string = null;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    console.log(event);
  }

  constructor(private photoService: PhotoService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private el: ElementRef,
              private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = this.router.getCurrentNavigation().extras.state as {
        prevPhotoId: string
      };
      if (state && state.prevPhotoId) {
        this.prevPhotoId = state.prevPhotoId;
      } else {
        this.prevPhotoId = null;
      }
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data.isPrivate) {
        this.photoService.findPrivateVisible().subscribe(privateVisible => {
          this.photos = privateVisible;
          this.photoService.photos = privateVisible;
        });
      } else {
        this.photoService.findPublicVisible().subscribe(visible => {
          this.photos = visible;
          this.photoService.photos = visible;
        });
      }
      if (this.prevPhotoId) {
        this.waitAndScroll();
      }
    });
  }

  delay(milliseconds: number): Promise<any> {
    return new Promise(function(resolve) {
      setTimeout(resolve, milliseconds);
    });
  }

  async waitAndScroll(): Promise<any> {
    await this.delay(500);
    const photoSelector = '.photo' + this.prevPhotoId;
    this.el.nativeElement.querySelector(photoSelector).scrollIntoView();
  }
 /* openModal(photo: Photo, index: number): void {
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
  }*/
}
