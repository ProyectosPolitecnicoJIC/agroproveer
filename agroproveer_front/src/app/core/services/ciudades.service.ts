import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Ciudad } from '../../models/ciudad.interface';


@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  readonly URL: string = 'https://api-colombia.com/api/v1/Department/{DEPID}/cities?sortBy=name&sortDirection=asc'
  readonly URL_CIUDADES: string = 'https://api-colombia.com/api/v1/city?sortBy=name&sortDirection=asc'
  constructor(
    private http: HttpClient
  ) { }

  getCiudadesByDepartamento(deptId: string): Observable<Ciudad[]>{
    
    return this.http.get<any[]>(this.URL.replace("{DEPID}",deptId)).pipe(
      map(
        response => response.map(
          city => ({
            id: city.id,
            name: city.name,
            departmentId: deptId
          })
        )
      )
    )
  }

  getCiudades(): Observable<Ciudad[]> {
    return this.http.get<any[]>(this.URL_CIUDADES).pipe(
      map(
        response => response.map(
          city => ({
            id: city.id,
            name: city.name,
            departmentId: city.departmentId
          })
        )
      )
    )
  }
  
}
