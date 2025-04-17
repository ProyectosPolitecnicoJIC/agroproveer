import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../../models/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private readonly url : string = "https://api-colombia.com/api/v1/Department"

  constructor(private http: HttpClient) { 
  }

  getDepartamentos(): Observable<any> {
    console.log(this.http.get<any>(this.url));
    return this.http.get(this.url);
  }

}

