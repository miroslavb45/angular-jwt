import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from './models';
import { CookieService } from 'ngx-cookie-service';






@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if(this.cookieService.get('sessionID') === ""){
      this.currentUserSubject = new BehaviorSubject<User>(null);

    }else{
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('sessionID')));
    }
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>("https://devdevdev.tk:3001/users/login", { username, password })
          .pipe(map(user => {
            console.log(JSON.stringify(user.token))
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                this.cookieService.set('sessionID', JSON.stringify(user), undefined, undefined, undefined, true, 'Strict');
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  // localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  getUserRoles(){
    return this.http.get<any>("https://devdevdev.tk:3001/user-roles/", { withCredentials: true }).toPromise();
  }

  logout() {
      // remove user from local storage to log user out
      this.cookieService.delete('sessionID');
      this.currentUserSubject.next(null);
  }
}
