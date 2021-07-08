import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../../model/country';

export interface DialogData {
  country: string;
}

@Component({
  selector: 'app-create-country',
  templateUrl: './album-dialog.component.html',
  styleUrls: ['./album-dialog.component.scss']
})
export class AlbumDialogComponent {
  form: FormGroup;
  title: string;
  countries: Country[];
  albumDto: {
    id: number,
    name: string,
    description: string,
    countryName: string
  };

  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<AlbumDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.albumDto = data.albumDto;
    this.countries = data.countries;
  }

  ngOnInit() {
    console.log(this.albumDto);
    this.form = this.fb.group({
      name: [this.albumDto ? this.albumDto.name : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      description: [this.albumDto ? this.albumDto.description : '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ]],
      countryName: [this.albumDto ? this.albumDto.countryName : '', [
        Validators.required
      ]]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
