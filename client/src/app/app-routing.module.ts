import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GalleryComponent} from './component/gallery/gallery.component';
import {PhotoComponent} from './component/photo/photo.component';
import {LoginComponent} from './component/login/login.component';
import {AddPhotoComponent} from './component/add-photo/add-photo.component';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/photos/:id', component: PhotoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery/add-photo', component: AddPhotoComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
