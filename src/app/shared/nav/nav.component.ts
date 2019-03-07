import { Component, EventEmitter, Output, OnInit } from '@angular/core';
/* import { Router } from '@angular/router'; */
import { FormControl } from '@angular/forms'
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
 

  constructor(
    private userService: UserService
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }
}
