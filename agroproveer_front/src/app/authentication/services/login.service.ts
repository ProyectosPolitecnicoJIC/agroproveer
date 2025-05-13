import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Login } from "../../models/login.interface";
import { LoginResponse } from "../../models/loginresponse.interface";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = `http://localhost:8096/auth/login`;

    constructor(private http: HttpClient) { }

    login(user: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, user).pipe(
            map(response => {
                let loginResponse: LoginResponse = {
                    token: response.token
                };
                return loginResponse;
            })
        );
    }

    logout(): void {
        console.log("cerrando sesión");
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    }
}