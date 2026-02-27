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

  searchUser(query: string): Observable<any> {
    return this.http.get('https://dummyjson.com/users/search?limit=5&q=' + query)
  }
  handleError(error: any) {
    console.error('An error occurred:', error);
    return of([]);
  }

}
