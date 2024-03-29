import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

/**
 * Class handling communication with the RESTful API exposed by the backend.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API = environment.apiPath;

    constructor(private http: HttpClient) {
        console.log(`Initializing ApiService with API path [${this.API}]`);
    }

    delete(endpoint: string, options?: any): Observable<any> {
        if (options) {
            return this.http.delete(`${this.API}/${endpoint}`, options);
        } else {
            return this.http.delete(`${this.API}/${endpoint}`);
        }
    }

    get<T>(endpoint: string, options?: any): Observable<any> {
        if (options) {
            return this.http.get<T>(`${this.API}/${endpoint}`, options);
        } else {
            return this.http.get<T>(`${this.API}/${endpoint}`);
        }
    }

    patch<T>(endpoint: string, body: any | null, options?: any): Observable<any> {
        if (options) {
            return this.http.patch(`${this.API}/${endpoint}`, body, options);
        } else {
            return this.http.patch(`${this.API}/${endpoint}`, body);
        }
    }

    post<T>(endpoint: string, body: any | null, options?: any): Observable<any> {
        if (options) {
            return this.http.post(`${this.API}/${endpoint}`, body, options);
        } else {
            return this.http.post(`${this.API}/${endpoint}`, body);
        }
    }

    put<T>(endpoint: string, body: any | null, options?: any): Observable<any> {
        if (options) {
            return this.http.put(`${this.API}/${endpoint}`, body, options);
        } else {
            return this.http.put(`${this.API}/${endpoint}`, body);
        }
    }
}
