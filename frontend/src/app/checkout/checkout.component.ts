import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, map } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
})
export class CheckoutComponent {
  paymentMethods: string[] = ['MBWay', 'Debit or Credit card'];

  firstFormGroup: FormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup: FormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.compose([this.nifValidator])],
  });
  thirdFormGroup: FormGroup = this.formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  fourthFormGroup: FormGroup = this.formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });

  completed!: boolean;
  state!: string;
  stepperOrientation$!: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation$ = breakpointObserver
      .observe('(min-width: 600px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  private nifValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === '') {
      return null;
    }

    const nif = control.value;
    const error = { forbiddenNif: { value: control.value } };
    const firstDigits = new Set(['1', '2', '3', '5', '6', '8']);
    const firstDigitPairs = new Set([
      '45',
      '70',
      '71',
      '72',
      '74',
      '75',
      '77',
      '79',
      '90',
      '91',
      '98',
      '99',
    ]);

    if (nif.length !== 9) {
      return error;
    }

    if (!firstDigits.has(nif[0]) && !firstDigitPairs.has(nif.slice(0, 2))) {
      return error;
    }

    const modulo =
      Array.from(nif.slice(0, -1))
        .map((digit, i) => [Number(digit), 9 - i])
        .reduce((acc, [digit, i]) => acc + digit * i, 0) % 11;

    const checkDigit = Number(nif[8]);
    const calculatedDigit = modulo < 2 ? 0 : 11 - modulo;
    return calculatedDigit === checkDigit
      ? null
      : { forbiddenNif: { value: control.value } };
  }

  confirmPurchase() {
    this.completed = true;
    this.state = 'done';
  }
}
