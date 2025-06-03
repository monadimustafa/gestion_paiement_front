import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router){}

    ngOnInit() {
      
    }

    goToLogin(){
      this.router.navigate(['/login'])
    }

    logout(){
      this.authService.logout();
      this.goToLogin();
    }

    isAuthorized(){
      const authorizedRoles = ["ADMIN"];

      return this.authService.authenticatedUser.roles.some((role: string) => authorizedRoles.includes(role));
    }
}
