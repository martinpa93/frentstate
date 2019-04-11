import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class PropertyService {
    constructor(
        private http: HttpClient
    ) {}

    getProperties() :Observable<any>{
        return this.http.get(`${environment.apiUrl}/property`)
        .pipe(map(
            data => {
              return data;
            }));
    }

    getProperty(id):Observable<any>{
        return this.http.get(`${environment.apiUrl}/property/${id}`)
        .pipe(map(
            data => {
              return data;
            }
        ));
    }

    addProperty (property): Observable<any> {
        return this.http.post(`${environment.apiUrl}/property`, property)
        .pipe(tap(
            (property) => console.log(`added property w/ id=${property.cref}`)),
        
        );
    }


    updateProperty (id, property): Observable<any> {
        return this.http.put(`${environment.apiUrl}/property/${id}`, JSON.stringify(property))
        .pipe(
          tap(_ => console.log(`updated property id=${id}`))
        );
    }


    deleteProperty (id): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/property/${id}`)
        .pipe(
            tap(_ => console.log(`deleted property id=${id}`))
        );
    }

}