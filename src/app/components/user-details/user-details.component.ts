import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user: any;
  paramSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the route params
    this.paramSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== null) {
        this.userService.getUserById(id).subscribe((data) => {
          this.user = data.data;
        });
      }
    });
  }

  // Implement the ngOnDestroy lifecycle hook to unsubscribe
  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
