import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth:AuthService, private router:Router){
  }
  onLoginHandler(){
    this.router.navigateByUrl('login');
  }
  onLogoutHandler(){
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
