// creates a service for chicos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chofer } from '../models/chofer.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChoferesService {
    baseUrl = `${environment.apiUrl}/chofer`;

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Chofer[]> {
        return this.http.get<Chofer[]>(this.baseUrl);
    }
    getByDNI(dni: string): Observable<Chofer> {
        return this.http.get<Chofer>(`${this.baseUrl}/${dni}`);
    }
    create(chofer: Chofer): Observable<Chofer> {
        return this.http.post<Chofer>(this.baseUrl, chofer);
    }
    update(dni: string, chofer: Chofer): Observable<Chofer> {
        return this.http.patch<Chofer>(`${this.baseUrl}/${dni}`, chofer);
    }
    delete(dni: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${dni}`);
    }
}