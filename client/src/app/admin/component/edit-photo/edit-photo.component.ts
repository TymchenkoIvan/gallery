import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhotoService} from '../../../gallery/service/photo-service.service';
import {AlbumService} from '../../service/album-service.service';
import {Album} from '../../../model/album';
import {ActivatedRoute} from '@angular/router';
import {Photo} from '../../../model/photo';

@Component({
  selector: 'edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit {
  photo: Photo;
  albums: Album[];
  form: FormGroup;
  @Input() error: string | null;

  constructor(private photoService: PhotoService,
              private albumService: AlbumService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const photoId: string = this.route.snapshot.paramMap.get('id');
    this.albumService.findAll().subscribe(
      data => this.albums = data
    );
    this.form = this.fb.group({
      name: new FormControl(''),
      description: new FormControl(''),
      album: new FormControl(''),
      isVisible: new FormControl('true', Validators.required),
      isPrivate: new FormControl('true', Validators.required),
      originalDate: new FormControl('')
    });
    this.photoService.findPhoto(parseInt(photoId)).subscribe(
      data => {
        this.photo = data;
        this.form.patchValue({name: this.photo.name});
        this.form.patchValue({description: this.photo.description});
        this.form.patchValue({album: this.photo.albumName});
        this.form.patchValue({isVisible: this.photo.isVisible});
        this.form.patchValue({isPrivate: this.photo.isPrivate});
        this.form.patchValue({originalDate: new Date(data.originalDate)});
      }
    );
  }

  submit(): void {
    if (this.form.valid) {
      this.photoService.updatePhoto(this.photo.id, this.form.value).subscribe(
        () => this.ngOnInit()
      );
    }
  }
}
