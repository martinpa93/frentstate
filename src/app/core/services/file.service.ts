import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'
})
export class FileService {
    constructor(
        private http: HttpClient
    ) {}

    uploadFile(formData){
        return this.http.post(`${environment.apiUrl}/upload`, formData, {
          reportProgress: true,
          observe: 'events'
        });
      }
}