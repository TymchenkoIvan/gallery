import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhotoService} from '../../service/photo-service.service';

@Component({
  selector: 'add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent  implements OnInit {

  constructor(private photoService: PhotoService,
              private fb: FormBuilder){}
  form: FormGroup;
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  ngOnInit(){
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required)
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      const uploadData = new FormData();
      uploadData.append('file', this.form.controls.file.value, this.form.controls.name.value);
      this.photoService.uploadPhoto(uploadData);
      this.form.reset();
    }
  }
}
