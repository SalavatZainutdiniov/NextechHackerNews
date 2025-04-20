import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private apiUrl = 'https://localhost:7128/api/'

  private http = inject(HttpClient);

  public get<T>(path: string):Observable<T> {
    return this.http.get<T>(this.apiUrl + path);
  }
}