import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContractService {
    constructor(
        private http: HttpClient
    ) {}

    getContracts() :Observable<any>{
        return this.http.get(`${environment.apiUrl}/contract`)
        .pipe(map(
            data => {
              return data;
            }));
    }

    getContract(id):Observable<any>{
        return this.http.get(`${environment.apiUrl}/contract/${id}`)
        .pipe(map(
            data => {
              return data;
            }
        ));
    }

    addContract (contract): Observable<any> {
        return this.http.post(`${environment.apiUrl}/contract`, contract)
        .pipe(tap(
            (contract) => console.log(`added contract w/ id=${contract.id}`)),
        
        );
    }


    updateContract (id, contract): Observable<any> {
        return this.http.put(`${environment.apiUrl}/contract/${id}`, contract)
        .pipe(
          tap(_ => console.log(`updated contract id=${id}`))
        );
    }


    deleteContract (id): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/contract/${id}`)
        .pipe(
            tap((Contract) => console.log(`deleted contract id=${id}`))
        );
    }
}