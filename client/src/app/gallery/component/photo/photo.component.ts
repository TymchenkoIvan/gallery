import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PhotoService} from '../../service/photo-service.service';
import {Photo} from '../../../model/photo';

@Component({
  selector: 'photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    this.photoService.findPhoto(+this.route.snapshot.paramMap.get('id'))
      .subscribe(photo => this.photo = photo);
  }

  closeModal(): void {

  }

  nextSlide(): void {

  }

  previousSlide(): void {

  }
}
