import { Injectable } from '@angular/core';
import { AbstractControl, Validator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl) {
    const { password, passwordConfirmation } = formGroup.value;
    if (password === passwordConfirmation) return null;
    //this object will be returned as part of the errors object (authForm.errors)
    return {
      passwordsDontMatch: true
    }
  }
}
