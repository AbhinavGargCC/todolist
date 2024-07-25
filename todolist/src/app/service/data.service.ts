import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDO } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  // {
  //     headers?: HttpHeaders | {
  //         [header: string]: string | string[];
  //     };
  //     context?: HttpContext;
  //     observe?: 'body';
  //     params?: HttpParams | {
  //         [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  //     };
  //     reportProgress?: boolean;
  //     responseType?: 'json';
  //     withCredentials?: boolean;
  //     transferCache?: {
  //         includeHeaders?: string[];
  //     } | boolean;
  // }

  // get<T>(url: string): Observable<T> {
  //   return this.httpClient.get<T>(url);
  // }

  get<T>(url: string, params?: { [key: string]: any }): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.httpClient.get<T>(url, { params: httpParams });
  }

  post<T>(
    url: string,
    body: { title: string; description: string }
  ): Observable<ToDO> {
    return this.httpClient.post<ToDO>(url, body);
  }

  put<T>(
    url: string,
    id: number,
    body?: { [key: string]: any }
  ): Observable<T> {
    return this.httpClient.put<T>(`${url}/${id}`, body);
  }
}
