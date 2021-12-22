import {Injectable, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Photo} from '../../model/photo';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class PhotoService {

  private static PHOTOS_URL = '/api/photos';
  photos: Photo[];

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  public updateCurrentPhotosIfNeeded(): void {
    if (!this.photos) {
      this.findPublicVisible().subscribe(visible => {
        this.photos = visible;
      });
    }
  }

  public getNextPhotoId(id: number): number {
    let index = this.photos.findIndex(photo => photo.id === id);
    return index === this.photos.length - 1 ? this.photos[0].id : this.photos[++index].id;
  }

  public getPreviousPhotoId(id: number): number {
    let index = this.photos.findIndex(photo => photo.id === id);
    return index === 0 ? this.photos[this.photos.length - 1].id : this.photos[--index].id;
  }

  public findPublic(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL + '/public')
      .pipe(
        map(photos => {
          return photos.map((photo) => {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          });
        }));
  }

  public findPublicVisible(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL + '/public-visible')
      .pipe(
        map(photos => {
          return photos.map( (photo) => {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          });
        }));
  }

  public findPrivate(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL + '/private')
      .pipe(
        map(photos => {
          return photos.map( (photo) => {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          });
        }));
  }

  public findPrivateVisible(): Observable<Photo[]> {
    return this.http.get<Photo[]>(environment.apiUrl + PhotoService.PHOTOS_URL + '/private-visible')
      .pipe(
        map(photos => {
          return photos.map( (photo) => {
            photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
            photo.photoUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/content`;
            return photo;
          });
        }));
  }

  public findPhoto(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${environment.apiUrl + PhotoService.PHOTOS_URL}/${id}`)
      .pipe(
      map(photo => {
          photo.thumbnailUrl = `${environment.apiUrl + PhotoService.PHOTOS_URL}/${photo.id}/thumbnail`;
          return photo;
      }));
  }

  public getPhotoContent(id: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl + PhotoService.PHOTOS_URL}/${id}/content`, {responseType: 'blob'});
  }

  public uploadPhoto(uploadImageData: FormData): void {
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

  public updatePhoto(id: number, photo: Photo): Observable<any> {
    return this.http.put(`${environment.apiUrl + PhotoService.PHOTOS_URL}/${id}`, photo, { observe: 'response' })
      .pipe(map(response => {
        if (response.status === 200) {
          this.snackBar.open('Image was changed successfully', 'Ok', {
            duration: 5000
          });
        } else {
          this.snackBar.open('Image was not changed!', 'Ok', {
            duration: 5000
          });
        }
      }));
  }

  public markPhotoAsHidden(id: number): Observable<any> {
    return this.http.put(environment.apiUrl + PhotoService.PHOTOS_URL + '/' + id + '/hide', null);
  }

  public markPhotoAsVisible(id: number): Observable<any> {
    return this.http.put(environment.apiUrl + PhotoService.PHOTOS_URL + '/' + id + '/show', null);
  }
}

