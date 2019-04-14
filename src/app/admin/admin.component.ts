import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private service:UserService,
              private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar:MatSnackBar) {}

 


  logout(){
    this.service.logout().subscribe(()=> { 
      this.snackBar.open('Desconectado', 'OK', {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 4000,
        panelClass: "snackBar"
      })
      this.router.navigateByUrl('/login');
    });
  }
}
