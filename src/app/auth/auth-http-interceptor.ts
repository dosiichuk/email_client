import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';

//The only purpose of this interceptor is to add {withCredentials: true} to outgoing requests
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //pass the req to the next interceptor or handler
    // in recipe book, the interceptor was used to add user token to outgoin requests
    const modifiedReq = req.clone({
      withCredentials: true,
      //we can overwrite any prop of req including url etc.
    })
    //the return returns an observable through which we can have access
    // to req status and error
    return next.handle(modifiedReq).pipe(
      //the rest will occur inly if the type of event is Sent
      // filter(val => val.type === HttpEventType.Sent),
      tap(val =>{
      //we can see the request objects => val
      //we can tap into the http events
      console.log(val)
      if(val.type === HttpEventType.Sent) {
        console.log('request was sent')
      }
      if(val.type === HttpEventType.Response) {
        console.log('got a response')
      }
    }))
  }

}
