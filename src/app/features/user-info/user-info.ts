import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { Signals } from '../../core/services/signals';
import { form, FormField, maxLength, minLength, PathKind, required, SchemaPath, emailError, email } from '@angular/forms/signals';
import { defaultUserData, UserForm } from '../../core/models/userform.model';
import { CommonModule } from '@angular/common';
import { Apis } from '../../core/services/apis';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-info',
  imports: [FormField, CommonModule],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  userDetails = signal<any>([]);
  // firstName = signal('');
  // lastName = signal('')
  // maindenName = signal('');
  // emailId = signal('')
  // phoneNumber = signal('');
  // computedSignal =  computed(() =>  {return `${this.firstName()} ${this.lastName()}`});

  userFormModel = signal<UserForm>(defaultUserData);
  userForm = form(this.userFormModel, (schema) => {
    required(schema.firstName, { message: 'First name is required' });
    required(schema.lastName, { message: 'Last name is required' });
    minLength(schema.lastName, 3, { message: 'Last name must be at least 3 characters long' });
    maxLength(schema.lastName, 6, { message: 'Last name should not exceed 6 characters long' });
    required(schema.maidenName);
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email pattern' });
    required(schema.phone);
  });

  apiService = inject(Apis);

  filteredUsers = signal<any[]>([]);
  constructor(private signalService: Signals) {

    effect(() => {
      const dd = this.signalService.getUserDetails()
      console.log(dd);

      this.userDetails.set(dd);
      // console.log(this.userDetails().firstName);
      // this.firstName.set(this.userDetails().firstName);
      // this.lastName.set(this.userDetails().lastName);
      // this.maindenName.set(this.userDetails().maidenName);
      // this.emailId.set(this.userDetails().email);
      // this.phoneNumber.set(this.userDetails().phone);

      this.userFormModel.set({
        firstName: this.userDetails().firstName,
        lastName: this.userDetails().lastName,
        maidenName: this.userDetails().maidenName,
        email: this.userDetails().email,
        phone: this.userDetails().phone
      });
    })
    this.searchUser()
  }
  searchQuery = signal('');
  ngOnInit() {

  }

  updateFirstName(event: any) {
    console.log(event);
    // this.firstName.update(() => event)
    this.searchQuery.set(event);
  }
  searchUser() {
    let filteredUsers = toSignal(
      toObservable(this.searchQuery).pipe(
        debounceTime(100),
        distinctUntilChanged(),
        switchMap(q => {
          if (!q.trim()) {
            return of([]);
          }
          return this.apiService.searchUser(q)
        })
      ),
      { initialValue: [] }
    );
    console.log(filteredUsers);
  }
  submitForm() {
    console.log(this.userFormModel());
    if (this.userForm().valid()) {
      console.log('Form Submitted Successfully!');
    } else {
      console.log('errpr case', this.userForm());
      this.userForm().errors().forEach(error => {
        console.log('Error case ', error);
      });
    }
  }
}

