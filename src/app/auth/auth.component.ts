import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../core/services/user.service';
import { Errors } from '../core/models/errors.model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  hide:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
    //Enrutador se suscribe para ver los cambios y aplicar efecto
    this.route.url.subscribe(data => {
      // ultima secuencia del path
      this.authType = data[data.length - 1].path;
      //cambia el titulo segun el path
      this.title = (this.authType === 'login') ? 'Login' : 'Registro';
      // añade un control al formulario y su validación de ser el registro
      if (this.authType === 'register') {
        this.authForm.addControl('name', new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]));
      }
    });
  }

  get f() { return this.authForm.controls; }

  goToggle() {
    (this.authType === 'login') ?  this.router.navigate(['/register']): this.router.navigate(['/login']);
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
   
    if (this.authType == 'login'){
      this.userService
      .login(credentials)
      .subscribe(
        data => { 
          this.router.navigateByUrl('/admin');
        },
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
      
    }
    if (this.authType == 'register'){
      return this.userService
      .register(credentials)
      .subscribe(
        data => this.router.navigateByUrl('/login'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  }
}