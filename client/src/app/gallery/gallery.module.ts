import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GalleryRoutingModule} from './gallery-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {GalleryComponent} from './component/gallery/gallery.component';
import {PhotoComponent} from './component/photo/photo.component';
import {PhotoDialogComponent} from './component/photo-dialog/photo-dialog.component';
import {HeaderComponent} from './component/header/header.component';
import {LoginComponent} from './component/login/login.component';
import {AddPhotoComponent} from './component/add-photo/add-photo.component';
import {MatCardModule} from '@angular/material/card';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {MatMenuModule} from '@angular/material/menu';
import {MainComponent} from './component/main/main.component';
import {PhotoService} from './service/photo-service.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BasicAuthInterceptor} from './service/basic-auth-interceptor.service';


@NgModule({
  declarations: [
    MainComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    HeaderComponent,
    LoginComponent,
    AddPhotoComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    GalleryRoutingModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxMatFileInputModule,
    MatMenuModule
  ],
  providers: [
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor, multi: true
    }
  ],
})
export class GalleryModule {
}
