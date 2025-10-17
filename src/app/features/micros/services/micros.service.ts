// creates a service for chicos
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Micro } from '../models/micro.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MicrosService {
    baseUrl = `${environment.apiUrl}/micro`;

    constructor(private http: HttpClient) { }
    
    getAll(): Observable<Micro[]> {
        const incluirAsignados: boolean = true;
        const incluirCompletos: boolean = true;
        return this.http.get<Micro[]>(`${this.baseUrl}?incluirAsignados=${incluirAsignados}&incluirCompletos=${incluirCompletos}`);
    }

    getByPatente(patente: string): Observable<Micro> {
        return this.http.get<Micro>(`${this.baseUrl}/${patente}`);
    }

    create(micro: Micro): Observable<Micro> {
        return this.http.post<Micro>(this.baseUrl, micro);
    }

    update(patente: string, micro: any): Observable<Micro> {
        return this.http.patch<Micro>(`${this.baseUrl}/${patente}`, micro);
    }

    delete(patente: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${patente}`);
    }

    asignarChofer(patente: string, dni: string): Observable<void> {
        const url = `${this.baseUrl}/${patente}/chofer`
        return this.http.put<void>(url, { dni });
    }

    asignarChicos(patente: string, dnis: string[]): Observable<void> {
        const url = `${this.baseUrl}/${patente}/chicos`
        return this.http.put<void>(url, { dnis });
    }
}