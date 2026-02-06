import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Signals {
  
  userDetails = signal<any>({});

  setUserDetails(details: any) {
    this.userDetails.set(details);
  }

  getUserDetails() {
    return this.userDetails();
  }
}
