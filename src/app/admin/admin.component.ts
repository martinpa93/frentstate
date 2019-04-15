import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { MatSnackBar, MatSidenav } from '@angular/material';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  @ViewChild('drawer') sidenav: MatSidenav;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private service:UserService,
              private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar:MatSnackBar) {}

  linkClose(){
    if(this.sidenav.mode==='over'){
      this.sidenav.close();
    }
  }

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
