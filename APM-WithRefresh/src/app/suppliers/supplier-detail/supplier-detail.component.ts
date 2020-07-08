import { Component, OnInit } from '@angular/core';
import { CarService } from '../../cars/car.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from './name.validator';
import { MyHttpService } from '../../car-categories/my-http.service';

@Component({
  selector: 'pm-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {
  selectedSupplierId$ = this.carService.selectedSupplierChanges$;
  selectedSupplier$ = this.carService.selectedSupplier$;
  email = new FormControl('', [
      Validators.required,
      Validators.email,
      ValidationService.nameValidator(this.httpService)]
    // this.validateNameViaServer.bind(this)]
  );

  constructor(private readonly carService: CarService,
              private httpService: MyHttpService) {
  }

  ngOnInit() {
  }



  //
  // validateNameViaServer({value}: AbstractControl): Observable<ValidationErrors | null> {
  //   const validations: Observable<boolean>[] = [];
  //   const nameExists$: Observable<boolean> = this.carService.isNameExists(value);
  //   validations.push(nameExists$);
  //   // const nameLegal$: Observable<boolean> = this.service.isNameLegal(value);
  //   // validations.push(nameLegal$);
  //   return combineLatest(validations)
  //     .pipe(map(([nameExists, nameLegal]) => {
  //       if (!nameLegal) {
  //         return {
  //           isIllegal: true
  //         };
  //       }
  //       if (nameExists) {
  //         return {
  //           isExists: true
  //         };
  //       }
  //       return null;
  //     }));
  // }


}
