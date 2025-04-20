import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Departamento } from '../../models/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private readonly url: string = "https://api-colombia.com/api/v1/Department?sortBy=name&sortDirection=asc"

  constructor(private http: HttpClient) {
  }

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => {
        return response.map(department => ({
          id: department.id,
          name: department.name,   
        }));
      })
    );
  }
}

