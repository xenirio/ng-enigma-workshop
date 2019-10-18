import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ProxyConfigService } from './proxy.config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _http: Http, private _proxy: ProxyConfigService) { }

  private url(url: string): string {
    return `${this._proxy.api.url}/api${url}`;
  }

  private executeResponse(method: Method, url: string, values: any, subject = new Subject<any>()): Observable<any> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    let response: Observable<Response>;
    
    switch(method) {
      case Method.Get:
        response = this._http.get(this.url(url) + values, options);
        break;
      case Method.Post:
        options.headers.append('Content-Type', 'application/json');
        response = this._http.post(this.url(url), JSON.stringify(values), options);
        break;
      case Method.Path:
        response = this._http.get(this.url(url) + values, options);
        break;
      case Method.Put:
        options.headers.append('Content-Type', 'application/json');
        response = this._http.put(this.url(url), JSON.stringify(values), options);
        break;
      case Method.Delete:
        response = this._http.delete(this.url(url) + values, options)
        break;
    }

    response.pipe(
      map(result => {
        if (result) {
          if (result.status == 200) {
            return result.json();
          }
        }
      }),
      catchError(error => {
        if (error.status == 401) {
          return of([]);
        }
        else {
          console.log(error);
          return (null);
        }
      })
    ).subscribe(result => subject.next(result));
    return subject;
  }

  getRequest(url: string, values?: { [id: string]: string }): Observable<any> {
    let params = '';
    if (values)
      params = '?' + this.encodeParams(values);
    return this.executeResponse(Method.Get, url, params);
  }

  postRequest(url: string, values: { [id: string]: any }): Observable<any> {
    return this.executeResponse(Method.Post, url, values);
  }

  pathRequest(url: string, value: string, params: { [id: string]: string } = undefined): Observable<any> {
    let query = '';
    if (value)
      query = '/' + value;
    if (params)
      query += '?' + this.encodeParams(params);
    return this.executeResponse(Method.Path, url, query);
  }

  putRequest(url: string, values: { [id: string]: any }): Observable<any> {
    return this.executeResponse(Method.Put, url, values);
  }

  deleteRequest(url: string, value: string) {
    let param = '';
    if (value)
      param = '/' + value;
    return this.executeResponse(Method.Delete, url, param);
  }

  encodeParams(values: { [id: string]: string }): string {
    return (Object.keys(values).map((k) => {
      return `${k}=${values[k].replace(new RegExp('&', 'g'), "%26")}`;
    }).join('&'));
  }
}

const enum Method {
  Get = 1,
  Post = 2,
  Path = 3,
  Put = 4,
  Delete = 5
}