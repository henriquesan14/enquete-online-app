import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NewVoto } from '../../core/models/new-voto.interface';

@Injectable({
  providedIn: 'root'
})
export class VotoService {
    private API: string = `${environment.apiUrl}/votos`;
    constructor(private http: HttpClient) { }


    addVoto(newVoto: NewVoto){
      return this.http.post(`${this.API}`, newVoto);
    }
}