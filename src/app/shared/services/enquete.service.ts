import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Enquete } from '../../core/models/enquete.interface';
import { PaginatedResult } from '../../core/models/paginated-result.interface';
import { NewEnquete } from '../../core/models/new-enquete.interface';

@Injectable({
  providedIn: 'root'
})
export class EnqueteService {
    private API: string = `${environment.apiUrl}/enquetes`;
    constructor(private http: HttpClient) { }

    getEnquetes(parametros: any): Observable<PaginatedResult<Enquete>>{
      let params = new HttpParams();
      for (const key in parametros) {
        if (parametros.hasOwnProperty(key) && parametros[key] !== null && parametros[key] !== undefined && parametros[key] !== '') {
          params = params.append(key, parametros[key]);
        }
      }
      return this.http.get<PaginatedResult<Enquete>>(`${this.API}`, {params});
    }

    getEnquete(id: string): Observable<Enquete>{
      return this.http.get<Enquete>(`${this.API}/${id}`);
    }

    addEnquete(newEnquete: NewEnquete){
      return this.http.post(`${this.API}`, newEnquete);
    }

    deleteEnquete(id: string){
      return this.http.delete(`${this.API}/${id}`);
    }

    updateEnquete(enquete: NewEnquete){
      return this.http.put(`${this.API}`, enquete);
    }
}