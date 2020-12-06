import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router){}

  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      console.log('Authguard: Usuario autenticado!');
      return true;
    } else {
      console.log('Authguard: Usuario no autenticado!');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
