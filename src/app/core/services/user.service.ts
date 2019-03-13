import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, throwError } from 'rxjs';

import { JwtService } from './jwt.service';
import { User } from '../models/user';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public API_URL:string = 'http://localhost/api';

  constructor (
    private http: HttpClient ,
    private jwtService: JwtService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  /* populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.http.get('/user')
      .subscribe(
        data => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  } */

  
  setAuth(user) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  
  delAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }
  
  register(credentials):Observable<any> {
    let converter = {"name":credentials.name,"email":credentials.email,"password":credentials.password,"password_confirmation":credentials.password};
    return this.http.post('http://localhost/api/register',converter)
    .pipe(map(
      data => {
        return data;
      }));
  }

  login(credentials):Observable<any>{
    return this.http.post('http://localhost/api/login', credentials)
      .pipe(map(
      data => {
        this.setAuth(data);
        return data;
      }
    ));
      
  }

  /* logout():Observable<any>{
    return this.
  } */
    

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
/*   update(user): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  } */

  
}
