import { ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { Apis } from '../../core/services/apis';
import { Router } from '@angular/router';
import { Signals } from '../../core/services/signals';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

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
  userDetails: any[] = [];
  userListSignal = signal<any[]>([]);
  searchQuery = signal('');
  totalRecords = signal(0);
  page = signal(1);
  pageSize = signal(10);
  // Paginated users based on current page and page size
  paginatedUsers = computed(() => {
    console.log(this.page(), this.pageSize());
  const start = (this.page() - 1) * this.pageSize();
  const end = start + this.pageSize();
  console.log(this.userListSignal());
   const s = this.userListSignal().slice(start, end);
   console.log(s);
   
  return WebTransportDatagramDuplexStream;
});
  constructor(private cd: ChangeDetectorRef) {
    this.searchUser();
    effect(() => {
  console.log('Computed fired:', this.paginatedUsers());
});

  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.apiService.getUserDetails().subscribe({
      next: (data) => {
        console.log('User details:', data);
        this.userDetails = data.users;
        this.totalRecords.set(data.total); 
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
  searchUser() {
    let userList = toSignal(
      toObservable(this.searchQuery).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query.trim()) return of([]);
          return this.apiService.searchUser(query).pipe(
            map(response => {
              this.userDetails = response.users;
              this.totalRecords.set(response.total);
              this.userListSignal.set(this.userDetails);
            }),
            catchError(error => {
              this.apiService.handleError(error);
              return of([]);
            })
          );
        })
      ),
      { initialValue: [] }
    );

  }

paginate(type: 'prev' | 'next') {
  console.log(type);
  
  const current = this.page();
  const maxPage = Math.ceil(this.totalRecords() / this.pageSize());
  console.log(current);
  
  if (type === 'prev' && current > 1) {
    console.log('if block');
    this.page.set(current - 1);
  }

  if (type === 'next' && current < maxPage) {
    console.log('else block');
    this.page.set(current + 1);
  }
}


}
