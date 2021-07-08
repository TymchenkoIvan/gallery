import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Album} from '../../model/album';
import {environment} from '../../../environments/environment';

@Injectable()
export class AlbumService {

  private static PHOTOS_URL = '/api/albums';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Album[]> {
    return this.http.get<Album[]>(environment.apiUrl + AlbumService.PHOTOS_URL);
  }

  public create(album: Album): Observable<Album> {
    return this.http.post<Album>(environment.apiUrl + AlbumService.PHOTOS_URL, album);
  }

  public update(id: number, album: Album): Observable<Album> {
    return this.http.put<Album>(environment.apiUrl + AlbumService.PHOTOS_URL + '/' + id, album);
  }

  public delete(id: number): Observable<any> {
     return this.http.delete(environment.apiUrl + AlbumService.PHOTOS_URL + '/' + id);
   }
}

