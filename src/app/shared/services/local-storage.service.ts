import { Injectable } from '@angular/core';
import { User } from '../../core/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setUserStorage(data: User){
    const dataString = JSON.stringify(data);
    localStorage.setItem('user', dataString);
  }

  getUserStorage(): User{
    const dataString = localStorage.getItem('user');
    return JSON.parse(dataString!);
  }

  removeUsertorage(){
    localStorage.removeItem('user');
  }
}