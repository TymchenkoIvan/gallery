import { Component, OnInit } from '@angular/core';
import {Album} from '../../../model/album';
import {AlbumService} from '../../service/album-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CountryService} from '../../service/country-service.service';
import {AlbumDialogComponent} from './album-dialog.component';
import {Country} from '../../../model/country';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[];
  countries: Country[];
  columnsToDisplay = ['id', 'name', 'description', 'countryName', 'actions'];

  constructor(private albumService: AlbumService,
              private countryService: CountryService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.albumService.findAll().subscribe(data => this.albums = data);
    this.countryService.findAll().subscribe(countries => this.countries = countries);
  }

  openAddDialog(): void {
    this.countryService.findAll().subscribe(countries => this.countries = countries);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      albumDto: null,
      title: 'Create album',
      countries: this.countries
    };

    const dialogRef = this.dialog.open(AlbumDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      dto => {
        if (dto) {
          console.log(dto);
          this.albumService.create(dto).subscribe(
            () => {
              this.snackBar.open('Album created', 'Ok', {
                duration: 5000
              });
              this.ngOnInit();
            });
        }
      }
    );
  }

  openEditDialog(data: Album): void {
    this.countryService.findAll().subscribe(countries => this.countries = countries);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      albumDto: data,
      title: 'Edit album',
      countries: this.countries
    };

    const dialogRef = this.dialog.open(AlbumDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      dto => {
        if (dto) {
          console.log(dto);
          this.albumService.update(data.id, dto).subscribe(
            () => {
              this.snackBar.open('Album updated', 'Ok', {
                duration: 5000
              });
              this.ngOnInit();
            });
        }
      }
    );
  }

  onDelete(id: number): void {
    this.albumService.delete(id).subscribe(
      data => {
        this.snackBar.open('Deleted', 'Ok', {
          duration: 5000
        });
        this.ngOnInit();
      },
      error => {
        this.snackBar.open(error.error, 'Ok', {
          duration: 5000
        });
      });
  }
}
