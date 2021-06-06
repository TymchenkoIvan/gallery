import { Component, OnInit } from '@angular/core';
import {Country} from '../../../model/country';
import {CountryService} from '../../service/country-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CountryDialogComponent} from './country-dialog.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  countries: Country[];
  columnsToDisplay = ['id', 'name', 'actions'];

  constructor(private countryService: CountryService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  openAddDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      countryDto: null,
      title: 'Add new contry'
    };

    const dialogRef = this.dialog.open(CountryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.countryService.create(data).subscribe(
            () => {
              this.snackBar.open('Country saved', 'Ok', {
                duration: 5000
              });
              this.ngOnInit();
            });
        }
      }
    );
  }

  openEditDialog(data: Country): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      countryDto: data,
      title: 'Edit country'
    };

    const dialogRef = this.dialog.open(CountryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      dto => {
        if (dto) {
          this.countryService.update(data.id, dto).subscribe(
            () => {
              this.snackBar.open('Country updated', 'Ok', {
                duration: 5000
              });
              this.ngOnInit();
            });
        }
      }
    );
  }

  ngOnInit() {
    this.countryService.findAll().subscribe(data => {
      this.countries = data;
    });
  }

  onDelete(id: number) {
    this.countryService.delete(id).subscribe(
      data => {
        this.snackBar.open('Deleted', 'Ok', {
          duration: 5000
        });
        this.ngOnInit();
      });
  }

}
