import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService {

  constructor() {}

  getToken() {
    return !!localStorage.getItem('token');
  }
}