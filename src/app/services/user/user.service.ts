import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cache: any = {};
  public isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    this.isLoadingSubject.next(true);
    if (this.cache[`page${page}`]) {
      this.isLoadingSubject.next(false); // Set loading to false since data is cached
      return of(this.cache[`page${page}`]);
    }
    return this.http.get(`https://reqres.in/api/users?page=${page}`).pipe(
      map((data) => {
        this.cache[`page${page}`] = data;
        return data;
      }),
      finalize(() => this.isLoadingSubject.next(false)) // Set loading to false after request completes
    );
  }

  getUserById(id: string): Observable<any> {
    this.isLoadingSubject.next(true);
    if (this.cache[id]) {
      this.isLoadingSubject.next(false); // Set loading to false since data is cached
      return of(this.cache[id]);
    }
    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
      map((data) => {
        this.cache[id] = data;
        return data;
      }),
      finalize(() => this.isLoadingSubject.next(false)) // Set loading to false after request completes
    );
  }
}
