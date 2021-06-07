import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {CountryComponent} from './component/country/country.component';
import {AlbumComponent} from './component/album/album.component';
import {AdminComponent} from './component/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { PhotosComponent } from './component/photos/photos.component';
import {CountryService} from './service/country-service.service';
import { MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {CountryDialogComponent} from './component/country/country-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AlbumService} from './service/album-service.service';


@NgModule({
  declarations: [
    CountryComponent,
    AlbumComponent,
    AdminComponent,
    PhotosComponent,
    CountryDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    AdminRoutingModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    CountryService,
    AlbumService
  ]
})
export class AdminModule {
}
