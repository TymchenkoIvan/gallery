import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Photo} from '../model/photo';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class PhotoService {

  private static PHOTOS_URL: string = '/photos';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL)
      .pipe(
        map(photo => {
          return photo.map(function (photo) {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          })
        }));
  }

  public findPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${PhotoService.PHOTOS_URL}/${id}`);
  }

  public uploadPhoto(uploadImageData: FormData) {
    this.http.post(`${environment.apiUrl + PhotoService.PHOTOS_URL}`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            console.log('Image uploaded successfully');
          } else {
            console.log('Image not uploaded successfully');
          }
        }
      );
  }
}

