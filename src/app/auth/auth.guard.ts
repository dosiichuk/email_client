import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, tap } from 'rxjs/operators'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  //if the func returns an Observable, we need to mark it as complete for the Guard to let us through
  constructor(private authService: AuthService, private router: Router) {

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.signedin$.pipe(
      skipWhile(value => value === null || value === false),

      //take marks Observable as complete, without this the Guard will not work
      take(1),
      //if the guard denies access, it is redirecting to the root route
      tap(isSignedIn => {
        console.log('wfher', isSignedIn)
        if(!isSignedIn) {
          this.router.navigateByUrl('/')
        }
      }))

  }
}
