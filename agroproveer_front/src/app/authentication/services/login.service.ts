import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, catchError, of } from "rxjs";
import { Login } from "../../models/login.interface";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = `https://29cbed90-c872-430d-bf89-f1bdf67eca6c.mock.pstmn.io/login`;

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<boolean> {
        const body: Login = { username, password };
        return this.http.post<boolean>(this.apiUrl, body).pipe(
            map(response => response ? true : false), 
            catchError(error => {
                console.error('Login error', error);
                return of(false);
            })
        );
    }
}