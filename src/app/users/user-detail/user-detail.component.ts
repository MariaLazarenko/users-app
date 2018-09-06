import { Observable } from 'rxjs/internal/Rx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: Observable<User>;
  userId: string;

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      this.userId = params['id'];
      this.user = this.usersService.getUser(this.userId);
    });
  }

  onDelete() {
    this.usersService.deleteUser(this.userId);
    console.log(this.userId);
    this.router.navigate(['']);
  }
}
