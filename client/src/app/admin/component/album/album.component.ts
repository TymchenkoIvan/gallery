import { Component, OnInit } from '@angular/core';
import {Album} from '../../../model/album';
import {AlbumService} from '../../service/album-service.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albums: Album[];
  columnsToDisplay = ['id', 'name', 'description', 'countryName', 'actions'];

  constructor(private albumService: AlbumService) {
  }

  ngOnInit() {
    this.albumService.findAll().subscribe(data => {
      this.albums = data;
    });
  }

  openAddDialog() {
  }

  openEditDialog(album: Album) {
  }

  onDelete(id: number) {
  }
}
