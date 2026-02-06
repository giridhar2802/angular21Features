import { Component, computed, effect, inject, signal } from '@angular/core';
import { Apis } from '../../core/services/apis';
import { Signals } from '../../core/services/signals';
import { form, FormField  } from '@angular/forms/signals';
import { defaultUserData, UserForm } from '../../core/models/userform.model';

@Component({
  selector: 'app-user-info',
  imports: [FormField],
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
  userForm = form(this.userFormModel);

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
  }
updateFirstName(event: any) {
  console.log(event);
  // this.firstName.update(() => event)
}
  ngOnInit() {
   

  }
}

