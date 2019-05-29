import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from './models';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';






@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private cookieName = "sessionID";

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if(this.cookieService.get(this.cookieName) === ""){
      this.currentUserSubject = new BehaviorSubject<User>(null);

    }else{
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get(this.cookieName)));
    }
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>(environment.restApi.login, { username, password })
          .pipe(map(user => {
            console.log(JSON.stringify(user.token))
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  this._setCookie(user);                  // store user details and jwt token in cookie to keep user logged in between page refreshes
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }
  _setCookie(user: any){
    if(environment.production){
      this.cookieService.set(this.cookieName, JSON.stringify(user), undefined, undefined, undefined, true, 'Strict');

    }else{
      this.cookieService.set(this.cookieName, JSON.stringify(user));

    }
  }

  getUserRoles(){
    return this.http.get<any>(environment.restApi.userRoles, { withCredentials: true }).toPromise();
  }

  logout() {
      // remove user from cookie to log user out
      this.cookieService.delete(this.cookieName);
      this.currentUserSubject.next(null);
  }

  register(username: string, password: string){
    return this.http.post<any>(environment.restApi.register, { username, password })
          .pipe(map(user => {
         
              return user;
          }));
  }
}
