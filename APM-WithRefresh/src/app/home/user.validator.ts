import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {
  constructor(private http: HttpClient) {
  }

  searchUser(text) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          console.log('Calling external');
          return this.http.get<any>(`api/cars`);
        })
      );
  }

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            console.log('in map');
            // if username is already taken
            if (res.length) {
              // return error
              console.log('Username exists');
              return {'userNameExists': true};
            }
          })
        );
    };

  }

}
