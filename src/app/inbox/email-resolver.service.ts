import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

import { Email, EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService: EmailService,
    private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, ) {
    const {id} = route.params;
    return this.emailService.getEmail(id).pipe(
      catchError(error => {
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY
      })
    );
  }
}
