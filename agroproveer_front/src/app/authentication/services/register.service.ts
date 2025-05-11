import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, catchError, of } from "rxjs";
import { Usuario } from "../../models/usuario.interface";

@Injectable({
  providedIn: 'root'
})
export class RegisterService { 

  private apiUrl = `http://localhost:8096/api/usuarios/save`;

  constructor(private http: HttpClient) { }

  register(usuario: Usuario): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, usuario).pipe(
      map(response => {
        if (response) {
          console.log('User registered successfully');
          return true;
        }
        console.error('User registration failed');
        return false;
      }), 
      catchError(error => {
        console.error('Register error', error);
        return of(false);
      })
    );
  }


}