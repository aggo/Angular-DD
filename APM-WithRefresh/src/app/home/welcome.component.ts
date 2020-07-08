import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from './user.validator';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
  public pageTitle = 'Welcome';
  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email],
    [this.service.userValidator()
      // ValidationService.nameValidator(this.httpService)
    ]
    // this.validateNameViaServer.bind(this)]
  );


  constructor(
    private fb: FormBuilder,
    private service: UserValidators
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
        'first': [
          null,
          Validators.required,
        ],
        'name': [
          // initial value
          null,
          // sync built-in validators
          Validators.compose(
            [Validators.required, Validators.minLength(3)],
          ),
          // custom async validator
          this.service.userValidator()
        ],
      },
      // {updateOn: 'blur', asyncValidators: this.service.userValidator()}
    );
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    } else if (this.email.hasError('userNameExists')) {
      return 'Name exists!';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  save() {
    console.log('save to db');
  }
}
