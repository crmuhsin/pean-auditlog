import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { urls } from '../shared/constant';

const header = new HttpHeaders({
  "Content-Type": "application/json",
});

interface Creds {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string;

  loginEvent: EventEmitter<boolean> = new EventEmitter();

  commonOptions: any = {
    headers: header,
    withCredentials: false,
    observe: "response",
  };

  constructor(private http: HttpClient) { }
  
  login(payload: Creds): Observable<boolean> {
    return this.http.post(urls.user_login, payload, this.commonOptions).pipe(
      map((response: any) => {
        if (response.status == 200) {
          this.isLoggedIn = true
          this.loginEvent.emit(true)
          this.saveInLocalStorage(response.body.token)
          return true
        } else {
          return false
        }
      })
    );
  }

  register(payload: any): Observable<boolean> {
    return this.http.post(urls.user_registration, payload, this.commonOptions).pipe(
      map((response: any) => {
        if (response.status == 200) {
          this.isLoggedIn = true
          this.loginEvent.emit(true)
          this.saveInLocalStorage(response.body.token)
          return true
        } else {
          return false
        }
      })
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loginEvent.emit(false)
    this.deleteFromLocalStorage()
  }

  getToken(): any {
    if (!localStorage.getItem('token')) {
      this.logout()
    }
    return localStorage.getItem('token')
  }

  saveInLocalStorage(token: string) {
    localStorage.setItem('token', token)
  }

  deleteFromLocalStorage() {
    localStorage.clear()
  }
}
