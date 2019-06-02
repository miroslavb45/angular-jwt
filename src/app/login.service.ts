import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './models';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';








@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private cookieName = "sessionID";

  constructor(private http: HttpClient, private cookieService: CookieService,  private router: Router) {
    if (this.cookieService.get(this.cookieName) === "") {
      this.currentUserSubject = new BehaviorSubject<User>(null);

    } else {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get(this.cookieName)));
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): any {
    return this.http.post<any>(environment.restApi.login, { username, password }).toPromise().then(user => {
      if (user && user.token) {
        this._setCookie(user);                  // store user details and jwt token in cookie to keep user logged in between page refreshes
        this.currentUserSubject.next(user);
        
        if(user.roles.includes("ADMIN")){
          this.router.navigateByUrl("/admin");
        }else{
          this.router.navigateByUrl('/home');
        }
        return user.username;
      }
    }).catch(err => {
return err;
    });
  }
  _setCookie(user: any) {
    if (environment.production) {
      this.cookieService.set(this.cookieName, JSON.stringify(user), undefined, undefined, undefined, true, 'Strict');

    } else {
      this.cookieService.set(this.cookieName, JSON.stringify(user));

    }
  }
  _clearCookie(){
    this.cookieService.delete(this.cookieName);
  }

  getUserRoles() {
    return this.http.get<any>(environment.restApi.userRoles, { withCredentials: true }).toPromise();
  }

  logout() {
    // remove user from cookie to log user out
    this.cookieService.delete(this.cookieName);
    this.currentUserSubject.next(null);

  }

  register(username: string, password: string, email?: string, first_name?: string, last_name?: string) {
    this.http.post<any>(environment.restApi.register, { username, password, email, first_name, last_name }).toPromise().then( () => {
      this._clearCookie();
      this.login(username, password);
 
    }).catch(err => {
      console.error("User already exists!")
    });
  };

  isAlive(){
    return this.http.get<any>(environment.restApi.isAlive).toPromise();
  }

}
