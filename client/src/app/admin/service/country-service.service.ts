import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Country} from '../../model/country';
import {environment} from '../../../environments/environment';

@Injectable()
export class CountryService {

  private static PHOTOS_URL = '/api/countries';

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.apiUrl + CountryService.PHOTOS_URL);
  }

  public create(country: Country): Observable<Country> {
    return this.http.post<Country>(environment.apiUrl + CountryService.PHOTOS_URL, country);
  }

  public update(id: number, country: Country): Observable<Country> {
    return this.http.put<Country>(environment.apiUrl + CountryService.PHOTOS_URL + '/' + id, country);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + CountryService.PHOTOS_URL + '/' + id);
  }
}

