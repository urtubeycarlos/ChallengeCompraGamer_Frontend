// creates a service for chicos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chico } from '../models/chico.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChicosService {
    baseUrl = `${environment.apiUrl}/chico`;

    constructor(private http: HttpClient) { }
    
    getChicos(): Observable<Chico[]> {
        return this.http.get<Chico[]>(this.baseUrl);
    }
    getChicoByDNI(dni: string): Observable<Chico> {
        return this.http.get<Chico>(`${this.baseUrl}/${dni}`);
    }
    createChico(chico: Chico): Observable<Chico> {
        return this.http.post<Chico>(this.baseUrl, chico);
    }
    updateChico(dni: string, chico: Chico): Observable<Chico> {
        return this.http.patch<Chico>(`${this.baseUrl}/${dni}`, chico);
    }
    deleteChico(dni: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${dni}`);
    }
}