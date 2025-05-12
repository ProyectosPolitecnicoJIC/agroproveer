import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, catchError, of } from "rxjs";
import { Login } from "../../models/login.interface";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = `http://localhost:8096/auth/login`;

    constructor(private http: HttpClient) { }

    login(user: Login): Observable<boolean> {
        return this.http.post<Login>(this.apiUrl, user).pipe(
            map(response => response ? true : false),
            catchError(error => {
                console.error('Login error', error);
                return of(false);
            })
        );
    }
}