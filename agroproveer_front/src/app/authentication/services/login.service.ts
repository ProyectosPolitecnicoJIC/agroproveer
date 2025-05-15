import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Login } from "../../models/login.interface";
import { LoginResponse } from "../../models/loginresponse.interface";
import { BehaviorSubject } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiUrl = `http://localhost:8096/auth/login`;

    private loggedIn = new BehaviorSubject<boolean>(this.getToken() !== "" && !this.isTokenExpired(this.getToken()));

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    constructor(private http: HttpClient) { }

    login(user: Login): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, user).pipe(
            map(response => {
                let loginResponse: LoginResponse = {
                    token: response.token
                };
                this.loggedIn.next(true);
                return loginResponse;
            })
        );
    }

    logout(): void {
        console.log("cerrando sesión");
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.loggedIn.next(false);
    }

    private getToken(): string {
        return localStorage.getItem('token') || ""  ;
    }

    getUserData(): any {
        return JSON.parse(localStorage.getItem('userData') || '{}');
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (token) {
            const userData = this.getUserData();
            if (userData && (userData.exp > Date.now() / 1000)) {
                return true;
            }
        }
        return false;
    }

    private isTokenExpired(token: string): boolean {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; // Convertir a milisegundos
        return Date.now() > expirationTime;
    }


}