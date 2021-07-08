import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {AlbumComponent} from './component/album/album.component';
import {CountryComponent} from './component/country/country.component';
import {PhotosComponent} from './component/photos/photos.component';
import {AddPhotoComponent} from './component/add-photo/add-photo.component';
import {EditPhotoComponent} from './component/edit-photo/edit-photo.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {path : '', redirectTo: 'public-photos', pathMatch: 'full'},
          {path : 'albums', component : AlbumComponent},
          {path : 'countries', component : CountryComponent},
          {path : 'public-photos', component : PhotosComponent, data : {isPrivate : false}},
          {path : 'public-photos/new', component : AddPhotoComponent, data : {isPrivate : false}},
          {path : 'public-photos/:id/edit', component : EditPhotoComponent},
          {path : 'private-photos', component : PhotosComponent, data : {isPrivate : true}},
          {path : 'private-photos/new', component : AddPhotoComponent, data : {isPrivate : true},},
          {path : 'private-photos/:id/edit', component : EditPhotoComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
