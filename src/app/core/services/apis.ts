import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apis {
    
  private http = inject(HttpClient);

  getUserDetails(): Observable<any> {
    return this.http.get('https://dummyjson.com/users')
  }

  handleError(error: any) {
    console.error('An error occurred:', error);
    return of([]);
  }

}
