import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {PhotoService} from '../../../gallery/service/photo-service.service';
import {AlbumService} from '../../service/album-service.service';
import {Album} from '../../../model/album';
import {ActivatedRoute} from '@angular/router';
import {combineLatest} from 'rxjs';

function validateFileSize(control: FormControl): { [key: string]: boolean } | null {
  const maxFileSizeInMB = 15;
  console.log(control);
  return control.value.size / (1024 * 1024) < maxFileSizeInMB
    ? null : {fileIsToBig: true};
}

@Component({
  selector: 'add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  private isPrivate = false;
  @Input() title: string;
  albums: Album[];
  filePath: string;
  form: FormGroup;
  isImageUploaded: boolean;
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  constructor(private photoService: PhotoService,
              private albumService: AlbumService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    combineLatest(this.route.data, this.albumService.findAll()).subscribe(
      ([routeData, albumsData]) => {
        this.albums = albumsData;
        this.isPrivate = routeData.isPrivate;
        if (this.isPrivate) {
          this.title = 'Add private photo';
        } else {
          this.title = 'Add public photo';
        }
        this.form = this.fb.group({
          name: new FormControl('', [Validators.min(3), Validators.max(50)]),
          description: new FormControl('', [Validators.min(3), Validators.max(500)]),
          album: new FormControl(''),
          isVisible: new FormControl(true, Validators.required),
          isPrivate: new FormControl(this.isPrivate, Validators.required),
          file: new FormControl('', [Validators.required, validateFileSize])
        });
      }
    );
  }

  submit(): void {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      const dto = this.form.value;
      dto.isPrivate = this.isPrivate;
      delete dto.file;
      const uploadData = new FormData();
      console.log(dto);
      uploadData.append('file', this.form.controls.file.value, this.form.controls.file.value.name);
      uploadData.append('dto', JSON.stringify(dto));
      this.photoService.uploadPhoto(uploadData);
      this.filePath = null;
      this.ngOnInit();
    }
  }

  imageChanged(e): void {
    const file = (e.target as HTMLInputElement).files[0];

    this.form.patchValue({
      file
    });

    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.filePath = reader.result as string;
    };

    reader.readAsDataURL(file);
    this.updateFileName(file.name);

    this.isImageUploaded = true;
  }

  updateFileName(fileName: string): void {
    this.form.patchValue({name: fileName});
  }
}
