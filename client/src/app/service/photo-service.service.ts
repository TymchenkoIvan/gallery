import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Photo} from '../model/photo';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class PhotoService {

  private static PHOTOS_URL = '/api/photos';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  public findAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL)
      .pipe(
        map(photo => {
          return photo.map(function(photo) {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          });
        }));
  }

  public findPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${PhotoService.PHOTOS_URL}/${id}`);
  }

  public uploadPhoto(uploadImageData: FormData) {
    this.http.post(`${environment.apiUrl + PhotoService.PHOTOS_URL}`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.snackBar.open('Image uploaded successfully', 'Ok', {
              duration: 5000
            });
          } else {
            this.snackBar.open('Image was not uploaded!', 'Ok', {
              duration: 5000
            });
          }
        }
      );
  }
}

