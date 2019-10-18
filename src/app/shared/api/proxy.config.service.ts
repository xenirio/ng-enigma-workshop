import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProxyConfigService {
  api: {
    url: string
  }

  constructor(private _http: Http) { }

  load() {
    return new Promise((resolve, reject) => {
      this._http.get('/assets/proxy.config.json')
        .pipe(map((response: any) => response.json()))
        .subscribe((config) => {
          this.api = {
            url: config.api.url
          }
          resolve(true);
        });
    });
  }
}
