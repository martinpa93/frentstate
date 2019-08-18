import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  authForm: FormGroup;
  hide = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Login' : 'Registro';
      if (this.authType === 'register') {
        this.authForm.addControl('name', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]));
      }
    });
  }

  get f() { return this.authForm.controls; }

  goToggle() {
    (this.authType === 'login') ?  this.router.navigate(['/register']) : this.router.navigate(['/login']);
  }

  submitForm() {
    const credentials = this.authForm.value;
    if (this.authType === 'login') {
      this.userService
      .login(credentials)
      .subscribe(
        _ => {
          this.snackBar.open('Conectado', 'OK', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'snackBar'
          });
          this.router.navigateByUrl('/admin/home');
        }
      );
    }

    if (this.authType === 'register') {
      return this.userService
      .register(credentials)
      .subscribe(
        _ => {
          this.snackBar.open('¡Registro completado con éxito!', 'OK', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 4000,
            panelClass: 'snackBar'
          });
          this.router.navigateByUrl('/login');
        });
    }
  }
}
