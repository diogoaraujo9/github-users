import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsyncHttpClient {
  constructor(private http: HttpClient) {}

  async get<T>(url: string, options: HttpOptions): Promise<HttpResponse<T>> {
    return lastValueFrom(this.http.get<T>(url, this.buildOptions(options)));
  }

  private buildOptions(options: HttpOptions): ResponseHttpOptions {
    return {
      headers: options.headers,
      observe: 'response',
      params: options.params,
      reportProgress: options.reportProgress,
      responseType: options.responseType,
      withCredentials: options.withCredentials
    };
  }
}

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

interface ResponseHttpOptions {
  body?: any;
  headers?: HttpHeaders;
  observe: 'response';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}
