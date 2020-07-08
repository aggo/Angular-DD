import { ChangeDetectorRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

export abstract class AbstractForm implements OnDestroy, OnInit {

  @Input() error: Observable<ValidationErrors | null>;
  validationError?: string;

  destroyed$ = new Subject();

  protected constructor(protected changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  abstract getForm(): FormGroup | null;

  ngOnInit(): void {
    const formGroup = this.getForm();
    if (!this.error || !formGroup) {
      return;
    }

    this.error
      .pipe(takeUntil(this.destroyed$))
      .subscribe((error: ValidationErrors) => {
        this.validationError = error.i18nKey;
        Object.keys(formGroup.controls).forEach(key => {
          if (!error.i18nFieldErrors || !error.i18nFieldErrors[key]) {
            return;
          }
          formGroup.controls[key].setErrors({i18nError: error.i18nFieldErrors[key].i18nKey});
          formGroup.controls[key].markAsTouched();
          this.changeDetectorRef.markForCheck();
        });

      });
  }

}
