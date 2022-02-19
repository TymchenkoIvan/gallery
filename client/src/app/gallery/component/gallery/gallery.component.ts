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

  isScrollButtonShown: boolean;
  topPosToStartShowing = 100;
  dialogRef: MatDialogRef<PhotoDialogComponent>;
  photos: Photo[];
  private readonly prevPhotoId: string = null;

  @HostListener('window:scroll')
  private checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrollButtonShown = scrollPosition >= this.topPosToStartShowing;
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

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
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
}
