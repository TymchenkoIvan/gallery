import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CanActivate, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../model/user';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate{

  private static LOGIN_URL = '/api/user/login';
  private static LOGOUT_URL = '/api/user/logout';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      authorization : 'Basic ' + btoa(username + ':' + password)
    });
    return this.http.get<any>(environment.apiUrl + AuthenticationService.LOGIN_URL, {headers})
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    this.http.post(environment.apiUrl + AuthenticationService.LOGOUT_URL, {});
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/gallery']);
  }

  public isAuthenticated(): User {
    return this.userSubject.value;
  }

  canActivate(): boolean {
    const currentUser: User = this.userSubject.value;
    if (!currentUser) {
      this.router.navigateByUrl('/gallery');
      return false;
    }
    return true;
  }
}
