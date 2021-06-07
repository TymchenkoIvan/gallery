import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {PhotoComponent} from './component/photo/photo.component';
import {AddPhotoComponent} from './component/add-photo/add-photo.component';
import {LoginComponent} from './component/login/login.component';
import {GalleryComponent} from './component/gallery/gallery.component';

const galleryRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          {path : '', component : GalleryComponent},
          { path: 'photos/:id', component: PhotoComponent },
          { path: 'login', component: LoginComponent },
          { path: 'add-photo', component: AddPhotoComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
