import { User } from '../user.model';
import { UsersService } from '../users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { map, switchMap, first } from 'rxjs/operators';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  @ViewChild('userImg')
  userImg: ElementRef;
  userForm: FormGroup;
  userId: string;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.userId = params.get('id');
        return this.usersService.getUser(this.userId);
      }),
      first()
    )
    .subscribe((user: User) => {
      this.initForm(user);
    });
  }

  private initForm(user?: User) {
    let userName = '',
        userAge = '',
        userInfo = '',
        userPhotoUrl = '';

    if (this.userId) {
      userName = user.name;
      userAge = user.age + '';
      userInfo = user.info;
      userPhotoUrl = user.photoUrl;
      this.userImg.nativeElement.src = user.photoUrl;
    }
    this.userForm = new FormGroup({
      'userName': new FormControl(userName, Validators.required),
      'userAge': new FormControl(userAge, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'userInfo': new FormControl(userInfo, Validators.required),
      'userPhotoUrl': new FormControl(userPhotoUrl)
    });
  }

  onSubmit() {
    const user: User = {
      name: this.userForm.get('userName').value,
      age: this.userForm.get('userAge').value,
      info: this.userForm.get('userInfo').value,
      photoUrl: this.userForm.get('userPhotoUrl').value || 'https://certificant.org/wp-content/uploads/2017/08/inkognito.png'
    };
    if (this.userId) {
      this.usersService.updateUser(this.userId, user);
      this.router.navigate(['user', this.userId]);
    } else {
      this.usersService.addUser(user);
      this.router.navigate(['']);
    }
  }

}
