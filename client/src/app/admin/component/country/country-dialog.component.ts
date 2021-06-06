import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface DialogData {
  country: string;
}

@Component({
  selector: 'app-create-country',
  templateUrl: './country-dialog.component.html'
})
export class CountryDialogComponent {
  form: FormGroup;
  title: string;
  countryDto: {
    id: number,
    name: string
  };

  constructor( private fb: FormBuilder,
               private dialogRef: MatDialogRef<CountryDialogComponent>,
               @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.countryDto = data.countryDto;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.countryDto ? this.countryDto.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
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
