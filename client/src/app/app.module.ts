import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import {PhotoService} from './service/photo-service.service';
import { PhotoComponent } from './component/photo/photo.component';
import {MatCardModule} from '@angular/material/card';
import { PhotoDialogComponent } from './component/photo-dialog/photo-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './component/login/login.component';
import { AddPhotoComponent } from './component/add-photo/add-photo.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {BasicAuthInterceptor} from './service/basic-auth-interceptor.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    PhotoComponent,
    PhotoDialogComponent,
    HeaderComponent,
    LoginComponent,
    AddPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    NgxMatFileInputModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
