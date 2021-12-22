import {Component, Directive, HostListener, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {PhotoService} from '../../service/photo-service.service';

@Directive({
  selector: '[photoKeyboardDirective]'
})
export class CardHoverDirective {
  @Output() kyboardEvent = new EventEmitter();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.kyboardEvent.emit(event);
  }
}

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  imageToShow: any;
  failOnLoad: boolean;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getPhoto(): void {
    this.failOnLoad = false;
    this.photoService.getPhotoContent(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      this.failOnLoad = true;
    });
  }


  keyboardCommand(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowLeft') {
      this.navigateToPrev();
    } else if (event.key === 'ArrowRight') {
      this.navigateToNext();
    }
  }

  ngOnInit(): void {
    this.photoService.updateCurrentPhotosIfNeeded();
    this.getPhoto();
  }

  close(): void {
    const navigationExtras: NavigationExtras = {
        relativeTo: this.route,
        state: {
          prevPhotoId: +this.route.snapshot.paramMap.get('id')
        }
    };
    this.router.navigate(['../../'], navigationExtras);
  }

  getPreviousPhotoId(): number {
    return this.photoService.getPreviousPhotoId(+this.route.snapshot.paramMap.get('id'));
  }

  getNextPhotoId(): number {
    return this.photoService.getNextPhotoId(+this.route.snapshot.paramMap.get('id'));
  }

  navigateToNext(): void {
    this.router.navigate(['../' + this.getNextPhotoId()], { relativeTo: this.route });
  }

  navigateToPrev(): void {
    this.router.navigate(['../' + this.getPreviousPhotoId()], { relativeTo: this.route });
  }
}
