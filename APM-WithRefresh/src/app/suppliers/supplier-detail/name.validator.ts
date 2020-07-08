import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MyHttpService } from '../../car-categories/my-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ValidationService {
  static nameValidator(myHttpService: MyHttpService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {

      return myHttpService.getCars().pipe(
        map((cars) => {
            let isValid = control.value === '' || control.value === name;
            if (cars.find(c => c.carName === name)) {
              isValid = true;
            } else {
              isValid = false;
            }
            if (control.value) {
              return {nameMatch: true};
            }
            // if (isValid) {
            //   return null;
            // } else {
            //   return {
            //     nameMatch: true
            //   };
            // }
          }
        )
      );
    };
  }
}
