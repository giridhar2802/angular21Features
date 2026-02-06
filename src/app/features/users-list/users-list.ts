import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Apis } from '../../core/services/apis';
import { Router } from '@angular/router';
import { Signals } from '../../core/services/signals';

@Component({
  selector: 'app-users-list',
  imports: [],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList {

  apiService = inject(Apis);
  router = inject(Router);
  signalService = inject(Signals);
  userDetails:any[] = [];
  userListSignal = signal<any[]>([]);
  
  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getUserDetails().subscribe({
      next: (data) => {
        console.log('User details:', data);
        this.userDetails = data.users;
        this.userListSignal.set(this.userDetails);
      },
      error: (error) => {
        this.apiService.handleError(error).subscribe((fallbackData) => {
          console.log('Fallback data:', fallbackData);
        });
      }
    });
  }
  getUserDetails(user: any) {
    console.log('Selected user details:', user);
    this.signalService.setUserDetails(user);
    this.router.navigate(['/user-info']);
  }
}
