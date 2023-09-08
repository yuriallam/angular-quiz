import { Component, EventEmitter, Output } from '@angular/core';

import { Subject, of } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  public searchId: string = '';
  public searchedUser: any = null;
  public searchCompleted = false;
  public searchTextChanged = new Subject<string>();

  constructor(private userService: UserService) {
    this.searchTextChanged
      .pipe(
        debounceTime(300),
        switchMap((id) =>
          this.userService.getUserById(id).pipe(
            catchError(() => {
              this.searchedUser = null;
              this.searchCompleted = true;
              return of(null);
            })
          )
        )
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.searchedUser = data.data;
          }
          this.searchCompleted = true;
        },
        error: (error) => {
          this.searchedUser = null;
          this.searchCompleted = true;
        },
      });
  }

  instantSearch(): void {
    this.searchCompleted = false;
    this.searchTextChanged.next(this.searchId);
  }

  @Output() searchEvent = new EventEmitter<string>();

  searchById(): void {
    this.searchEvent.emit(this.searchId);
  }
}
