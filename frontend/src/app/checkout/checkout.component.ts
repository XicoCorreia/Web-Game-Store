import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { Observable, delay, lastValueFrom, mergeMap, of, tap } from 'rxjs';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {
  BasicDialogComponent,
  DialogData,
} from '../basic-dialog/basic-dialog.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LineItem } from 'src/line-item';
import { CartService } from '../cart.service';
import { User } from 'src/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } },
  ],
})
export class CheckoutComponent {
  cart!: LineItem[];
  currentUser!: User;

  private dialogSuccess: DialogData = {
    title: 'Purchase confirmed',
    message: 'Your purchase was successful. Have fun!',
    matIcon: 'library_add_check',
    buttonText: 'Go to library',
  };

  private dialogError: DialogData = {
    title: 'Error while purchasing',
    message:
      'An error ocurred during the transaction. Your purchase did not go through.',
    matIcon: 'error',
    buttonText: 'Go to cart',
  };

  paymentMethods: string[] = ['MBWay', 'Debit or Credit card'];

  firstFormGroup: FormGroup = this.formBuilder.group({
    firstCtrlAddress: [''],
    firstCtrlPostal: [''],
  });
  secondFormGroup: FormGroup = this.formBuilder.group({
    secondCtrl: ['', this.nifValidator],
  });
  thirdFormGroup: FormGroup = this.formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  completed!: boolean;
  state!: string;
  stepperOrientation$!: Observable<StepperOrientation>;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(
      (user) => (this.currentUser = user)
    );
    this.cartService.currentCart$.subscribe(
      (cart) => (this.cart = [...cart.values()])
    );
    this.cartService.loadCart();
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

  private openRedirectDialog(dialogData: DialogData, url: string) {
    this.dialog
      .open(BasicDialogComponent, { data: dialogData })
      .afterClosed()
      .subscribe(() => {
        this.router.navigateByUrl(url);
      });
  }

  private sendMockPayment() {
    const isSuccess = Boolean(~~(Math.random() + 0.5)); // 1/2 odds
    return of(isSuccess).pipe(delay(1000));
  }

  private updateUser(user: User): Promise<User> {
    const newItems = this.cart.map((li) => li.item.id);

    return lastValueFrom(
      this.userService.addItemsToLibrary(user.username, newItems).pipe(
        mergeMap((user) =>
          this.userService.removeItemsFromWishlist(user.username, newItems)
        ),
        tap(() => {
          this.cartService.clear();
        })
      )
    );
  }

  async confirmPurchase() {
    this.completed = true;
    this.state = 'done';

    this.sendMockPayment().subscribe(async (isSuccess) => {
      let dialogData = this.dialogSuccess;
      let url = `/${this.currentUser.username}/library`;
      if (isSuccess) {
        await this.updateUser(this.currentUser);
      } else {
        [dialogData, url] = [this.dialogError, '/cart'];
      }
      this.openRedirectDialog(dialogData, url);
    });
  }

  isEmptyFormGroup(fg: FormGroup<object>) {
    return Object.values(fg.value).find((field) => field !== '') === undefined;
  }
}
