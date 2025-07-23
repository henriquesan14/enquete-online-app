import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.interface';
import { AuthResponse } from '../../core/models/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setAuthStorage(auth: AuthResponse){
    const userString = JSON.stringify(auth.user);
    localStorage.setItem('user', userString);
    localStorage.setItem('access_token', auth.accessToken);
  }

  getUserStorage(): User{
    const dataString = localStorage.getItem('user');
    return JSON.parse(dataString!);
  }

  getAccessTokenStorage(): string | null{
    return localStorage.getItem('access_token');
  }

  removeAuthStorage(){
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }
  
}