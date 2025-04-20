import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private apiUrl = 'https://localhost:7128/api/'

  private http = inject(HttpClient);

  public createUrl(path: string): string{
    return this.apiUrl + path;
  }

  public get<T>(path: string):Observable<T> {
    return this.http.get<T>(this.createUrl(path));
  }
}