import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public users: any = [];
  public currentPage: number = 1;
  public totalPages: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.userService.getUsers(page).subscribe((data) => {
      this.users = data.data;
      this.totalPages = data.total_pages;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      // Updated
      this.currentPage++;
      this.loadUsers(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers(this.currentPage);
    }
  }
}
