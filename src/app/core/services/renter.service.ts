import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class RenterService {
    constructor(
        private http: HttpClient
    ) {}

    getRenters() :Observable<any>{
        return this.http.get(`${environment.apiUrl}/renter`)
        .pipe(map(
            data => {
              return data;
            }));
    }

    getRenter(id):Observable<any>{
        return this.http.get(`${environment.apiUrl}/renter/${id}`)
        .pipe(map(
            data => {
              return data;
            }
        ));
    }

    addRenter (renter): Observable<any> {
        return this.http.post(`${environment.apiUrl}/renter`, renter)
        .pipe(tap(
            (renter) => console.log(`added renter w/ id=${renter.dni}`)),
        
        );
    }


    updateRenter (id, renter): Observable<any> {
        return this.http.put(`${environment.apiUrl}/renter/${id}`, renter)
        .pipe(
          tap((renter) => console.log(`updated renter id=${id}`))
        );
    }


    deleteRenter (id): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/renter/${id}`)
        .pipe(
            tap(_ => console.log(`deleted renter id=${id}`))
        );
    }
}