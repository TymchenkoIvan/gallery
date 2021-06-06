import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './component/admin/admin.component';
import {AlbumComponent} from './component/album/album.component';
import {CountryComponent} from './component/country/country.component';
import {PhotosComponent} from './component/photos/photos.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {path : '', component : CountryComponent},
          {path : 'albums', component : AlbumComponent},
          {path : 'countries', component : CountryComponent},
          {path : 'photos', component : PhotosComponent}
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
