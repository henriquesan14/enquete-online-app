import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../core/models/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private API: string = `${environment.apiUrl}/auth`;
    constructor(private http: HttpClient) { }

    refreshToken(): Observable<AuthResponse>{
      return this.http.post<AuthResponse>(`${this.API}/refresh-token`, {});
    }

    logout(){
      return this.http.post(`${this.API}/logout`, {});
    }
}