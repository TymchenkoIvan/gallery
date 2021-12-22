import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {PhotoComponent} from './component/photo/photo.component';
import {LoginComponent} from './component/login/login.component';
import {GalleryComponent} from './component/gallery/gallery.component';
import {AuthenticationService} from './service/authentication.service';

const galleryRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'public', component : GalleryComponent, data : {isPrivate : false}},
          { path: 'private', component : GalleryComponent, data : {isPrivate : true}, canActivate: [AuthenticationService]},
          { path: 'public/photos/:id', component: PhotoComponent, data : {isPrivate : false} },
          { path: 'private/photos/:id', component: PhotoComponent, data : {isPrivate : true}, canActivate: [AuthenticationService]},
          { path: 'login', component: LoginComponent },
          { path: '',   redirectTo: 'public', pathMatch: 'full' }        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
