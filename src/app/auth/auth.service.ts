import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

export interface SigninResponse {
  username: string;
}

export interface SignupResponse {
  username: string;
}

export interface CheckAuthResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com'
  //null means we dont know the signin status, true / false handle the rest
  signedin$ = new BehaviorSubject(false)
  username: string = '';
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(this.rootUrl + '/auth/username', {
      username: username
    })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup',
      //withCredentials makes sure that httpClient does not discard the cookies
      credentials).pipe(tap((response) => {
        this.signedin$.next(true)
        this.username = response.username
      }))
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
    .pipe(tap((response) => {
      this.signedin$.next(true)
      this.username = response.username
    }))
  }

  signout() {
    return this.http.post<any>(this.rootUrl + '/auth/signout', {})
      .pipe(tap(() => {
        this.signedin$.next(false)
      }))
  }

  checkAuth() {
    //adding withCredentials makes sure that outgoing requests contain cookies
    return this.http.get<CheckAuthResponse>(this.rootUrl + '/auth/signedin')
      .pipe(tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated)
        this.username = username
      }))
  }
}
