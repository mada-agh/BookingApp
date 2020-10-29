import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './common/services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authGuardService: AuthGuardService, private router: Router) {}  
  canActivate(): Observable<any> | boolean {  
    if (!this._authGuardService.getToken()) {  
      this.router.navigateByUrl("/start");  
    }  
    return this._authGuardService.getToken(); 
  }
}
