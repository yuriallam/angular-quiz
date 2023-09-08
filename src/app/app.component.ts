import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.userService.isLoadingSubject;
  }
  title = 'angular-quiz';
  public searchedUser: any;

  constructor(private userService: UserService) {}

  searchById(searchId: string): void {
    if (searchId) {
      this.userService.getUserById(searchId).subscribe((data) => {
        this.searchedUser = data.data;
      });
    }
  }
}
